class Api::OrganizationsController < ApplicationController
  def index
    organizations = Organization.where(organization_params)
    if organizations
      return render json: {
        organizations: organizations['results'].select {|r| r.id}.as_json,
        page: organizations['page'],
        total_count: organizations['total_count'],
        total_pages: (organizations['total_count'] / organizations['per'].to_f).ceil
      }, status: :ok
    end

    render json: { errors: ['Unable to load organizations'] }, status: :bad_request
  end

  def show
    organization = Organization.find(params[:id])
    render json: organization.as_json, status: :ok
  end

  private
  def organization_params
    params.permit(:query, :page)
  end
end
