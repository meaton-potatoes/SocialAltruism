module LeaderboardHelper
  def self.get_leaderboard(date)
    Donation.live.where(created_at: date.beginning_of_month..date.end_of_month).group(:user).sum(:amount).sort { |x, y| y.last <=> x.last }
  end

  def self.find_user_position(user)
    leaderboard = get_leaderboard(Time.now.utc)
    leaderboard.each_with_index do |(leaderboard_user, amount), i|
      if leaderboard_user == user
        return "##{i + 1} Donor this Month"
      end
    end

    nil
  end
end
