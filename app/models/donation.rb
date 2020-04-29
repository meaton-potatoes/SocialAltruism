class Donation < ApplicationRecord
  attr_accessor :email, :first_name, :last_name

  belongs_to :user

  before_create :set_resource_id

  def self.generate(params)
    if Rails.env.development?
      params[:card][:number] = '4242424242424242'
    end

    Donation.new.tap do |donation|
      stripe_response = Stripe::Token.create(params.slice(:card).to_h)
      donation.errors[:stripe] << stripe_response.dig('error', 'message') if stripe_response['error']

      pledgeling_response = Pledgeling::Donation.create(
        charge_source: Rails.env.development? ? 'tok_visa' : stripe_response['id'],
        email: donation.user.email,
        first_name: donation.user.first_name,
        last_name: donation.user.last_name,
        amount: params[:amount],
        organization_id: params[:organization_id]
      )
      donation.errors[:pledgeling] <<  pledgeling_response['message'] unless pledgeling_response['id']

      donation.currency = pledgeling_response['currency']
      donation.amount = pledgeling_response['amount'].to_f
      donation.status = pledgeling_response['status']
      donation.pledgeling_id = pledgeling_response['id']
      donation.pledgeling_organization_id = pledgeling_response['organization_id']
      donation.pledgeling_organization_name = pledgeling_response['organization_name']
    end
  end

  def self.total_donations_for(id)
    donations = Donation.where(pledgeling_organization_id: id)
    donations.sum(:amount)
  end

  private
  def set_resource_id
    self.resource_id ||= SecureRandom.hex(18)
  end
end
