class OrganizationsController < ApplicationController
  include Secured

  def index
    if organization_params.to_h.any?
      @organizations = Pledgeling::Organization.where(organization_params.to_h)
    else
      @organizations = Pledgeling::Organization.all
    end
  end

  def show
    @organization = Pledgeling::Organization.find(params[:id])
  end

  private
  def organization_params
    params.permit(:query)
  end
end
