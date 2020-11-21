require 'nickname_generator'

class User < ApplicationRecord
  before_create :set_resource_id

  has_many :donations

  enum privacy_level: [:everyone, :users, :friends, :only_me]

  before_save :set_nickname

  def to_json
    {
      id: resource_id,
      nickname: nickname,
      monthly_goal: monthly_goal,
      stats: stats
    }
  end

  def total_donated_amount
    donations.sum(:amount)
  end

  def monthly_goal_met?
    date = Time.now.utc
    donations.where(created_at: date.beginning_of_month..date.end_of_month).sum(:amount) >= monthly_goal
  end

  def to_hash
    {
      id: resource_id,
      email: email
    }
  end

  def stats
    {
      total_donations: donations.count,
      total_amount_donated: donations.sum(:amount).to_f,
      leaderboard_position: LeaderboardHelper.find_user_position(self),
      progress_bar: MoneyHelper.progress_bar(self)
    }
  end

  private
  def set_resource_id
    self.resource_id ||= SecureRandom.hex(12)
  end

  def set_nickname
    if !self.nickname || self.nickname.blank?
      self.nickname = "Anonymous #{NicknameGenerator.get}".titlecase
    end
  end
end
