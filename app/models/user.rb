class User < ApplicationRecord
  before_create :set_resource_id

  has_many :donations

  enum privacy_level: [:everyone, :users, :friends, :only_me]

  def total_donated_amount
    donations.sum(:amount)
  end

  def monthly_goal_met?
    date = Time.now.utc
    donations.where(created_at: date.beginning_of_month..date.end_of_month).sum(:amount) >= monthly_goal
  end

  def formatted_nickname
    self.nickname || '???'
  end

  private
  def set_resource_id
    self.resource_id ||= SecureRandom.hex(18)
  end
end
