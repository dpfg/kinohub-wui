
export class OmxClient {
  baseURL = ""

  constructor(baseURL) {
    this.baseURL = baseURL
  }

  /**
   * Send the command to the OMX player
   * @param {*string} cmd
   */
  async  omxCmd(cmd) {
    return fetch(this.baseURL + "/commands/" + cmd, { method: "POST" })
  }

  /**
   * Stops OMX player
   */
  async  omxStop() {
    return fetch(this.baseURL + "/commands/stop", { method: "POST" })
  }

  /**
   * Start playing new media entry
   * @param {*string} url of the media to play
   * @param {*object} mediaInfo that describes the media entry
   */
  async  omxPlay(url, mediaInfo) {
    await omxStop()

    return fetch(this.baseURL + "/play", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        media_info: mediaInfo,
      })
    })
  }

  /**
   * Get OMX player status.
   * If there is playing media its mediaInfo will be returned.
   */
  async  omxStatus() {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + "/status").then(resp => resp.json().then(resolve)).catch(reject)
    })
  }

  async  omxPlayListNew(entries) {
    return fetch(this.baseURL + "/plist", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entries: entries
      })
    })
  }

  async  omxPlayListSelect(position) {
    return fetch(this.baseURL + "/plist/commands/select", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        position: position
      })
    })
  }

}
