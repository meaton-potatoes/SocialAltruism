class OrganizationsController < ApplicationController
  def index
    @params = organization_params.to_h
    @organizations = Pledgeling::Organization.where(organization_params.to_h)
    @page = @organizations&.dig('page') || 1
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
