json.organization do
  json.id @organization.id
  json.name @organization.name
  json.website_url @organization.website_url
  json.mission @organization.mission
  json.logo_url @organization.logo_url
  json.address @organization.address
  json.coordinates @organization.coordinates
  json.stats @organization.stats
end
