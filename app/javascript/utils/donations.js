import { request } from './'

const createDonation = donation => {
  return request({
    method: 'POST',
    path: `${apiUrl}/api/organizations/${donation.pledgeling_organization_id}/donations`,
    body: { donation }
  })
}

const getDonations = ({ organization_id }) => {
  const urlParams = organization_id ? { organization_id } : {}
  return request({
    method: 'GET',
    path: `${apiUrl}/api/donations`,
    urlParams: urlParams
  })
}

const getDonationStats = () => {
  return request({
    method: 'GET',
    path: `${apiUrl}/api/donations/stats`
  })
}

export {
  createDonation,
  getDonations,
  getDonationStats
}
