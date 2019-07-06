export const getUsers = (url) => {
  return fetch(url).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    }

    const error = new Error(response.statusText)
    error.response = response
    return error
  }).then(response => response).catch(error => error)
}

export const postUsers = (url, data) => {
  data = data || {}
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    'Content-Type': 'application/json;charset=UTF-8',
  }).then(response => {
    if (response.status === 200 && response.status < 300) {
      return response.json()
    }

    const error = new Error(response.statusText)
    error.response = response
    return error
  }).then(response => response).catch(error => error)
}
