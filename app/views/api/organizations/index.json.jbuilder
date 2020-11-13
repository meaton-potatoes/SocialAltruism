json.organizations do
  json.array! @organizations['results'] do |organization|
    next if organization['id'].nil?

    json.id organization.id
    json.name organization.name
    json.website_url organization.website_url
    json.mission organization.mission
    json.logo_url organization.logo_url
  end.compact
end
json.page @organizations['page']
json.total_count @organizations['total_count']
json.total_pages @organizations['total_count'] / @organizations['per']
