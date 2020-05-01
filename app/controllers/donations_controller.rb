class DonationsController < ApplicationController
  include Secured

  def new
    if current_user.first_name.blank? || current_user.last_name.blank?
      flash[:alert] = 'You must set your first and last name before you can make a donation'
      redirect_to edit_user_path(current_user.resource_id) and return
    end

    organization = Pledgeling::Organization.find(params[:organization_id])

    unless organization['id']
      flash[:alert] = 'Organization not found'
      redirect_to organizations_path and return
    end
    @donation = Donation.new(
      pledgeling_organization_id: organization['id'],
      pledgeling_organization_name: organization['name']
    )
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

    if @donation.save
      flash[:success] = "Your donation of was processed!"
      redirect_to user_path(current_user.resource_id)
    else
      flash[:alert] = @donation.errors.full_messages.join(', ')
      redirect_to new_donation_path(organization_id: @donation.pledgeling_organization_id)
    end
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
