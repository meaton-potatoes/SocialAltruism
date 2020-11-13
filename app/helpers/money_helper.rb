module MoneyHelper
  def self.format_amount(amount)
    ActiveSupport::NumberHelper.number_to_currency(amount, unit: '$')
  end

  def self.progress_bar(user)
    date = Time.now.utc
    donations = user.donations.where(created_at: date.beginning_of_month..date.end_of_month)
    return unless donations.any?

    donations.sum(:amount) / user.monthly_goal * 100
  end
end
