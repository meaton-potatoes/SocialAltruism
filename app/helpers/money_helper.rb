module MoneyHelper
  def self.format_amount(amount)
    ActiveSupport::NumberHelper.number_to_currency(amount, unit: '$')
  end

  def self.thermometer(user)
    date = Time.now.utc
    percentage = user.donations.where(created_at: date.beginning_of_month..date.end_of_month).sum(:amount) / user.monthly_goal * 100
    "linear-gradient(0deg, red 0%, red #{percentage}%, white #{percentage}%, white 100%)"
  end
end
