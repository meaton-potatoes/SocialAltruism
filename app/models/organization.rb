require 'pledgeling'

class Organization
  PER_PAGE = 15
  PLEDGELING_DEFAULT_LOGO = 'https://res.cloudinary.com/pledgeling/w_266%2Ch_266%2Cc_fit/stg-media/images%2Fnpos%2Flogos%2Fdefault%2Flogo.jpg'
  STRUCT_FIELDS = [:id, :name, :website_url, :mission, :logo_url, :street1, :street2, :city, :region, :postal_code, :country, :lat, :lon]

  def self.where(params = {})
    parsed_response = Pledgeling.get('/v1/organizations', {
      q: params&.dig(:query),
      per_page: PER_PAGE,
      page: params&.dig(:page)
    })

    return parsed_response if !parsed_response

    parsed_response['results'] = parsed_response['results'].map { |result| Struct.convert(result) }
    parsed_response
  end

  def self.all
    where
  end

  def self.find(id)
    parsed_response = Pledgeling.get("/v1/organizations/#{id}")
    Struct.convert(parsed_response)
  end

  Struct = Struct.new(*STRUCT_FIELDS, keyword_init: true) do
    def address
      [
        street1,
        street2,
        city,
        region,
        postal_code,
        country
      ].select { |v| v.present? }
    end

    def as_json
      {
        id: id,
        name: name,
        website_url: website_url,
        mission: mission,
        logo_url: logo_url,
        address: address,
        coordinates: coordinates,
        stats: stats
      }
    end

    def coordinates
      [lat, lon] if lat && lon
    end

    def logo_uri
      logo_url || PLEDGELING_DEFAULT_LOGO
    end

    def stats
      {
        donation_number: donations.count,
        sum_donations: donations.sum(:amount)
      }
    end

    def self.convert(params)
      self.new(STRUCT_FIELDS.map { |field| [field, params[field.to_s]] }.to_h)
    end

    def donations
      Donation.where(pledgeling_organization_id: id)
    end
  end
end
