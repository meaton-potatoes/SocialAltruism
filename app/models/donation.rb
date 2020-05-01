class Donation < ApplicationRecord
  attr_accessor :stripe_token, :card

  belongs_to :user
  before_create :set_resource_id
  validate :set_stripe_token!, :submit_to_pledgeling!

  def initialize(params)
    super
    @card = params&.slice(:card).to_h
  end

  def set_stripe_token!
    begin
      @stripe_token = Stripe::Token.create(@card)
    rescue Stripe::CardError => e
      self.errors[:stripe] << e.message
    end
  end

  def submit_to_pledgeling!
    response = Pledgeling::Donation.create(
      charge_source: charge_source,
      amount: self.amount.to_f,
      organization_id: self.pledgeling_organization_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    )

    return self.errors[:pledgeling] << response['message'] unless response['id']

    self.currency = response['currency']
    self.status = response['status']
    self.pledgeling_id = response['id']
    self.pledgeling_organization_id = response['organization_id']
    self.pledgeling_organization_name = response['organization_name']
  end

  def charge_source
    @stripe_token&.livemode ? @stripe_token.id : 'tok_visa'
  end

  def self.stats_for_organization(id)
    donations = Donation.where(pledgeling_organization_id: id)
    {
      donation_number: donations.count,
      sum_donations: donations.sum(:amount)
    }
  end

  def self.total_stats
    donations = Donation.all
    {
      donation_number: donations.count,
      sum_donations: donations.sum(:amount)
    }
  end

  private
  def set_resource_id
    self.resource_id ||= SecureRandom.hex(18)
  end
end
