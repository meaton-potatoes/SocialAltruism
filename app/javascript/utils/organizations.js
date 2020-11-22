import { request } from './'

const getOrganizations = params => {
  Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : {});
  return request({
    method: 'GET',
    path: `${apiUrl}/api/organizations`,
    urlParams: params
  })
}

const getOrganization = id => {
  return request({
    method: 'GET',
    path: `${apiUrl}/api/organizations/${id}`
  })
}

export {
  getOrganizations,
  getOrganization
}
