const getUser = id => {
  return fetch(
    `${apiUrl}/api/users/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .then(response => response.json())
}

const updateUser = user => {
  return fetch(
    `${apiUrl}/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    }
  )
  .then(response => response.json())
}

const getLeaderboard = () => {
  return fetch(
    `${apiUrl}/api/leaderboard`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .then(response => response.json())
}

export {
  getUser,
  updateUser,
  getLeaderboard
}
