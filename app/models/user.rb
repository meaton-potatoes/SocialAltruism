class User < ApplicationRecord
  before_create :set_resource_id

  has_many :donations

  def total_donated_amount
    donations.sum(:amount)
  end

  private
  def set_resource_id
    self.resource_id ||= SecureRandom.hex(18)
  end
end
