module Pledgeling
  BASE_URL = ENV['PLEDGELING_URL']
  API_KEY = ENV['PLEDGELING_API_KEY']

  def self.headers
    { 'Authorization' => "Bearer #{API_KEY}" }
  end

  class Donation
    def self.create(donation)
      HTTParty.post(
        "#{BASE_URL}/v1/donations",
        query: donation,
        headers: Pledgeling.headers
      )
    end
  end

  class Organization
    def self.all
      HTTParty.get(
        "#{BASE_URL}/v1/organizations",
        headers: Pledgeling.headers
      ).parsed_response
    end

    def self.where(params)
      HTTParty.get(
        "#{BASE_URL}/v1/organizations",
        query: {
          q: params[:query],
          page: params[:page]
        },
        headers: Pledgeling.headers
      )
    end

    def self.find(id)
      HTTParty.get(
        "#{BASE_URL}/v1/organizations/#{id}",
        headers: Pledgeling.headers
      ).parsed_response
    end
  end
end
