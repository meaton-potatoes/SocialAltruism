json.user do
  json.id @user.resource_id
  json.nickname @user.nickname
  json.monthly_goal @user.monthly_goal.to_f
  json.donations do
    json.array! @user.donations do |donation|
      json.pledgeling_organization_id donation.pledgeling_organization_id
      json.pledgeling_organization_name donation.pledgeling_organization_name
      json.amount donation.amount.to_f
      json.created_at donation.created_at
      json.live donation.live
    end
  end
  json.stats do
    json.total_donations @user.donations.count
    json.total_amount_donated @user.donations.sum(:amount).to_f
    json.leaderboard_position LeaderboardHelper.find_user_position(@user)
    json.progress_bar MoneyHelper.progress_bar(@user)
  end
end
