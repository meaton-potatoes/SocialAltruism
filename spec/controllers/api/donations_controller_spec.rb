require "spec_helper"

RSpec.describe Api::DonationsController, :type => :controller do
  describe "GET index" do
    it "has a 200 status code" do
      get :index
      binding.pry
      expect(response.status).to eq(200)
    end
  end
end
