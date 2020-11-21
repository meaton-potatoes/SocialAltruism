import { request } from './'

const getOrganizations = params => {
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
