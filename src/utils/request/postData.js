const postData = (url, options) => {
  const headers = options.headers || {
    'Content-Type': 'application/json;charset=utf-8',
  }
  const data = options.data || {}

  return fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status === 200) return response.json()
  }).then(response => response).catch(error => error)
}

export default postData
