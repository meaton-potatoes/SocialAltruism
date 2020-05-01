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
      request = HTTParty.get(
        "#{BASE_URL}/v1/organizations",
        query: {
          per_page: 50
        },
        headers: Pledgeling.headers
      )

      request.ok? ? request.parsed_response : nil
    end

    def self.where(params)
      request = HTTParty.get(
        "#{BASE_URL}/v1/organizations",
        query: {
          q: params[:query],
          per_page: 50,
          page: params[:page]
        },
        headers: Pledgeling.headers
      )

      request.ok? ? request.parsed_response : nil
    end

    def self.find(id)
      request = HTTParty.get(
        "#{BASE_URL}/v1/organizations/#{id}",
        headers: Pledgeling.headers
      )

      request.ok? ? request.parsed_response : nil
    end
  end
end
