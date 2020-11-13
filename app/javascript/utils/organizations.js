const getOrganizations = (paramString) => {
  return fetch(`${apiUrl}/api/organizations?${paramString}`, {
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
