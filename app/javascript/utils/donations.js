const createDonation = donation => {
  return fetch(
    `${apiUrl}/api/organizations/${donation.pledgeling_organization_id}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ donation })
    })
  .then(response => response.json())
}

const getDonationStats = () => {
  return fetch(
    `${apiUrl}/api/donations/stats`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => response.json())
}

export {
  createDonation,
  getDonationStats
}
