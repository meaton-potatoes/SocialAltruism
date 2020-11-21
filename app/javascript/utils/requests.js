const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const request = ({ method, path, urlParams = {} , headers = {}, body, }) => {
  let args = { method, headers: Object.assign(headers, DEFAULT_HEADERS) }
  if (body) {
    args.body = JSON.stringify(body)
  }

  const url = [path, new URLSearchParams(urlParams).toString()].join('?')
  return fetch(url, args)
    .then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(json => Promise.reject(json))
    })
}

export {
  request
}
