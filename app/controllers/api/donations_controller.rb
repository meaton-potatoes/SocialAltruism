class Api::DonationsController < ApplicationController
  include Secured

  skip_before_action :verify_authenticity_token, only: [:create]

  def stats
    return render json: Donation.high_level_stats, status: :ok
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
    render json: {
      donations: donations.order(created_at: :desc).limit(10),
      stats: current_user.stats
    }, status: :ok
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
