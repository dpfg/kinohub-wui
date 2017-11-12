import { get } from './index'

class KinohubClient {
  baseURL = ""

  constructor(baseURL) {
    this.baseURL = baseURL
  }

  /**
   * Search media items
   * @param {*string} q search query
   */
  async  search(q) {
    return get(this.baseURL + '/search?q=' + q)
  }

  /**
   * Load detailed infromation about media item by its id.
   * @param {*number} id media item id
   */
  async  getItem(id) {
    return get(this.baseURL + '/items/' + id)
  }

  /**
   * Get last aired TV show's episodes
   * @param {*number} daysBack number of days to look back
   */
  async  getLastAiredEpisodes(daysBack = 14) {
    const daysBackMS = 1000 * 60 * 60 * 24 * daysBack

    const to = new Date()
    const from = new Date(to.getTime() - daysBackMS)

    return get(this.baseURL + `/tv/releases?from=${dateToISO(from)}&to=${dateToISO(to)}`)
  }
}

/**
 * Convert date to ISO8601 format.
 * @param {*Date} date to convert
 */
function dateToISO(date) {
  return date.toISOString().split("T")[0]
}
