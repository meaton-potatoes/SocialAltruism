class DonationsController < ApplicationController
  include Secured

  def new
    @organization = Pledgeling::Organization.find(params[:organization_id])

    unless @organization['id']
      flash[:alert] = 'Organization not found'
      redirect_to organizations_path and return
    end
    @donation = Donation.new
  end

  def show
    @donation = Donation.find_by(resource_id: params[:id])
  end

  def create
    @donation = current_user.donations.new(donation_params)

    if @donation.errors.any?
      flash[:alert] = @donation.errors.full_messages.join(', ')
      render :new and return
    elsif @donation.save!
      flash[:success] = "Your donation of was processed!"
      redirect_to donation_path(@donation.resource_id)
    end
  end

  def index
    
  end

  private
  def donation_params
    params.require(:donation).permit(
      :organization_id,
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
