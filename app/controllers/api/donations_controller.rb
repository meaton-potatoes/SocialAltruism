class Api::DonationsController < ApplicationController
  include Secured

  skip_before_action :verify_authenticity_token, only: [:create]

  # def show
  #   @donation = Donation.find_by(resource_id: params[:id])
  #   unless @donation && @donation.user == current_user
  #     flash[:alert] = 'You cannot view that donation'
  #     redirect_to root_path and return
  #   end
  # end

  def stats
    return render json: {
      stats: {
        'Total Donations' => ActiveSupport::NumberHelper.number_to_delimited(Donation.live.count),
        'Total Amount Donated' => MoneyHelper.format_amount(Donation.live.sum(:amount))
      }
    }, status: :ok
  end

  def create
    donation = current_user.donations.new(donation_params)

    if donation.save
      return render json: donation.to_json, status: :ok
    end

    render json: { errors: donation.errors.full_messages }, status: :unprocessable_entity
  end

  def index
    donations = current_user.donations
    donations = donations.where(pledgeling_organization_id: params[:organization_id]) if params[:organization_id]
    render json: donations.to_json, status: :ok
  end

  private
  def donation_params
    params.require(:donation).permit(
      :pledgeling_organization_name,
      :pledgeling_organization_id,
      :amount,
      card: [
        :number,
        :exp_month,
        :exp_year,
        :cvc
      ]
    )
  end
end
