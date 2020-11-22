class Donation < ApplicationRecord
  attr_accessor :stripe_token, :card

  belongs_to :user
  before_create :set_resource_id
  validate :set_stripe_token!, :submit_to_pledgeling!

  scope :live, -> { where(live: true) }
  scope :test, -> { where(live: false) }

  TEST_STRIPE_TOKEN = 'tok_visa'

  def initialize(params)
    super
    @card = params&.slice(:card).to_h
  end

  def attributes
    {
      pledgeling_organization_id: pledgeling_organization_id,
      pledgeling_organization_name: pledgeling_organization_name,
      amount: amount.to_f,
      created_at: created_at,
      live: live
    }
  end

  def set_stripe_token!
    begin
      @stripe_token = Stripe::Token.create(@card)
      self.live = @stripe_token.livemode
    rescue Stripe::CardError => e
      self.errors[:stripe] << e.message
    end
  end

  def submit_to_pledgeling!
    response = Pledgeling.post('/v1/donations', {
      charge_source: (self.live ? @stripe_token.id : TEST_STRIPE_TOKEN),
      amount: self.amount.to_f,
      organization_id: self.pledgeling_organization_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    })
    
    return self.errors[:pledgeling] << response['message'] unless response

    self.currency                     = response['currency']
    self.status                       = response['status']
    self.pledgeling_id                = response['id']
    self.pledgeling_organization_id   = response['organization_id']
    self.pledgeling_organization_name = response['organization_name']
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
    self.resource_id ||= SecureRandom.hex(12)
  end
end
