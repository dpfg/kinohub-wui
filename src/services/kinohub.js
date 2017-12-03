import { get } from './index'

export class KinohubClient {
  baseURL = ""

  constructor(baseURL) {
    this.baseURL = "http://" + baseURL
  }

  /**
   * Search media items
   * @param {*string} q search query
   */
  async  search(q) {
    return get(this.baseURL + '/search2?q=' + q)
  }

  /**
   * Load detailed infromation about media item by its id.
   * @param {*number} id media item id
   */
  async  getSerial(id) {
    return get(this.baseURL + '/series/' + id)
  }

  async getSeason(serialUID, seasonNum) {
    return get(`${this.baseURL}/series/${serialUID}/seasons/${seasonNum}`)
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

