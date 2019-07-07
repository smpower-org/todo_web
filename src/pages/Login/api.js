export const postLogin = (url, data) => {
  data = data || {}
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status === 200 && response.status < 300) {
      return response.json()
    }

    const error = new Error(response.statusText)
    error.response = response
    return error
  }).then(response => response).catch(error => error)
}
