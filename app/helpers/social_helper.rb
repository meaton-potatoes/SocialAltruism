module SocialHelper
  def self.tweet_button_url(donation)
    text = "I just donated #{MoneyHelper.format_amount(donation.amount)} to #{donation.pledgeling_organization_name}! Join me at altruism.social"
    "https://twitter.com/intent/tweet?text=#{text}"
  end
end
