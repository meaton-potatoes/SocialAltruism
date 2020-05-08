json.organizations do
  json.array! @organizations do |organization|
    json.id organization.id
    json.name organization.name
    json.website_url organization.website_url
    json.mission organization.mission
    json.logo_url organization.logo_url
  end
end
