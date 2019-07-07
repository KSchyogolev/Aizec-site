require('whatwg-fetch')
// let window

let fetchWithSessionCheck = (url, options) => {
  const fetchOptions = {...options, credentials: 'include', redirect: 'manual'}
  const loginLocation = '/login'
  const browserFetch = fetch
  return new Promise((resolve, reject) => {
    browserFetch(url, fetchOptions)
      .then((response) => {
        if (response.status === 403) {

          reject(new Error('Timeout error when attempting to log out at ' + url))
        } else resolve(response)
      })
      .catch(reject)
  })
}

export { fetchWithSessionCheck as fetch }