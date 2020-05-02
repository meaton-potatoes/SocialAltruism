module OrganizationHelper
  DEFAULT_LOGO = 'https://res.cloudinary.com/pledgeling/w_266%2Ch_266%2Cc_fit/stg-media/images%2Fnpos%2Flogos%2Fdefault%2Flogo.jpg'

  def self.logo(organization)
    return "<img src='#{organization['logo_url']}'>" unless organization['logo_url'] == DEFAULT_LOGO

    '<i class="fas fa-hand-holding-heart fa-4x"></i>'

  end
end
