export class OmxClient {
  baseURL = "";

  constructor(baseURL) {
    this.baseURL = "http://" + baseURL;
  }

  /**
   * Send the command to the OMX player
   * @param {*string} cmd
   */
  async omxCmd(cmd) {
    return fetch(this.baseURL + "/commands/" + cmd, { method: "POST" });
  }

  /**
   * Stops OMX player
   */
  async stop() {
    return fetch(this.baseURL + "/commands/stop", { method: "POST" });
  }

  /**
   * Start playing new media entry
   * @param {*string} url of the media to play
   * @param {*object} mediaInfo that describes the media entry
   */
  async play(url, mediaInfo) {
    await this.stop();

    return fetch(this.baseURL + "/play", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url,
        media_info: mediaInfo
      })
    });
  }

  /**
   * Get OMX player status.
   * If there is playing media its mediaInfo will be returned.
   */
  async status() {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + "/status")
        .then(resp => resp.json().then(resolve))
        .catch(reject);
    });
  }

  async playListNew(entries) {
    return fetch(this.baseURL + "/plist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        entries: entries
      })
    });
  }

  async playListSelect(position) {
    return fetch(this.baseURL + "/plist/commands/select", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        position: position
      })
    });
  }

  /**
   *
   * @param {*string} url
   * @param {*object} mediaInfo
   */
  async playListAddEntry(url, mediaInfo) {
    return fetch(this.baseURL + "/plist/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url,
        media_info: mediaInfo
      })
    });
  }

  async subscribe(onStatusChange, onError) {
    const source = new EventSource(this.baseURL + "/status/stream");

    source.onmessage = e => {
      onStatusChange(e.data);
    };

    source.onerror = e => {
      if (e.readyState == EventSource.CLOSED) {
        // Connection was closed.
        return;
      }
      onError(e);
    };
  }
}
