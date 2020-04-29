module MoneyHelper
  def self.format_amount(amount)
    ActiveSupport::NumberHelper.number_to_currency(amount, unit: '$')
  end
end
