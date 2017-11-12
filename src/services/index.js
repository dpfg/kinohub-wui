/**
 * Make HTTP GET request and parse as JSON
 * @param {*string} url to GET
 */
export function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(resp => resp.json().then(resolve).catch(reject))
      .catch(reject)
  })
}
