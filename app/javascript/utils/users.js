import { request } from './'

const getUser = id => {
  return request({
    method: 'GET',
    path: `${apiUrl}/api/users/${id}`
  })
}

const getFriends = id => {
  return request({
    method: 'GET',
    path: `${apiUrl}/api/users/${id}/friends`
  })
}

const updateUser = user => {
  return request({
    method: 'PUT',
    path: `${apiUrl}/api/users/${user.id}`,
    body: { user }
  })
}

const getLeaderboard = () => {
  return request({
    method: 'GET',
    path: `${apiUrl}/api/leaderboard`
  })
}

export {
  getUser,
  updateUser,
  getLeaderboard
}
