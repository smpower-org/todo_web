const getData = url => {
  return fetch(url).then(response => {
    if (response.status === 200) return response.jons()
  }).then(response => response).catch(error => error)
}

export default getData
