const getOrganizations = () => {
  return fetch(`${apiUrl}/api/organizations`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

const getOrganization = id => {
  return fetch(`${apiUrl}/api/organizations/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

export {
  getOrganizations,
  getOrganization
}
