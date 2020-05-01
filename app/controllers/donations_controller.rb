class DonationsController < ApplicationController
  include Secured

  def new
    unless current_user.first_name && current_user.last_name
      flash[:alert] = 'You must set your first and last name before you can make a donation'
      redirect_to edit_user_path(current_user.resource_id) and return
    end

    @organization = Pledgeling::Organization.find(params[:organization_id])

    unless @organization['id']
      flash[:alert] = 'Organization not found'
      redirect_to organizations_path and return
    end
    @donation = Donation.new
  end

  def show
    @donation = Donation.find_by(resource_id: params[:id])
    unless @donation && @donation.user == current_user
      flash[:alert] = 'You cannot view that donation'
      redirect_to root_path and return
    end
  end

  def create
    @donation = current_user.donations.new(donation_params)

    if @donation.errors.any?
      flash[:alert] = @donation.errors.full_messages.join(', ')
      render :new and return
    elsif @donation.save!
      flash[:success] = "Your donation of was processed!"
      redirect_to user_path(current_user.resource_id)
    end
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
