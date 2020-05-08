class Api::OrganizationsController < ApplicationController
  def index
    @organizations = Organization.where(organization_params)
  end

  def show
    @organization = Organization.find(params[:id])
  end

  private
  def organization_params
    params.permit(:query, :page)
  end
end
