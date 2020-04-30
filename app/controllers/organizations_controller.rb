class OrganizationsController < ApplicationController
  def index
    @params = organization_params.to_h
    @page = organization_params[:page]
    if organization_params.to_h.any?
      @organizations = Pledgeling::Organization.where(organization_params.to_h)
    else
      @organizations = Pledgeling::Organization.all
    end
    @page = @organizations['page'] || 1
  end

  def show
    @organization = Pledgeling::Organization.find(params[:id])
    @stats = Donation.stats_for_organization(params[:id])
  end

  private
  def organization_params
    params.permit(:query, :page)
  end
end
