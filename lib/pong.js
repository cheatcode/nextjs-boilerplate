class Pong {
  constructor(options = {}) {
    if (typeof window === "undefined") {
      return null;
    }

    setTimeout(() => {
      this._dom = {
        pongAlerts: document.querySelector(".pong-alerts"),
      };

      this.position = options.position || "topRight";
      this.removeDelay = options.removeDelay || 5 * 1000; // NOTE: 7 seconds

      this.injectContainer();
    }, 300);
  }

  injectContainer() {
    const pongAlerts = document.createElement("div");
    pongAlerts.classList.add("pong-alerts");

    if (!document.querySelector(".pong-alerts")) {
      document.body.append(pongAlerts);
    }

    this._dom.pongAlerts = pongAlerts;
    this._dom.pongAlerts.classList.add(`pong-alerts-${this.position}`);
    this._dom.pongAlerts.innerHTML = `
      <div class="pong-alerts-container">
        <ul></ul>
      </div>
    `;

    this._dom.pongAlertsContainerList = document.querySelector(
      ".pong-alerts-container ul"
    );
  }

  generateAlertId(length = 6) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  buildAlert(message, style) {
    const messageIsObject = message && typeof message === "object";
    const messageToRender = messageIsObject ? message.message : message;

    return `
        <div class="pong-alert-content">
          ${messageIsObject && message.title ? `<h5>${message.title}</h5>` : ""}
          <p>${messageToRender}</p>
        </div>
        <div class="pong-alert-close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>
        </div>
    `;
  }

  getAlertFromDom(alertId) {
    return document.querySelector(`[data-pong-alert-id="${alertId}"]`);
  }

  animateAlert(alertId) {
    const alert = this.getAlertFromDom(alertId);

    setTimeout(() => {
      alert.classList.add("visible");
    }, 100);
  }

  addEventListeners(alertId) {
    const alert = this.getAlertFromDom(alertId);

    if (alert) {
      alert.addEventListener("click", () => {
        this.removeAlert(alert);
      });
    }
  }

  removeAlert(alert) {
    alert.classList.remove("visible");
    setTimeout(() => {
      alert.remove();
    }, 500);
  }

  queueForRemoval(alertId) {
    const alert = this.getAlertFromDom(alertId);

    setTimeout(() => {
      this.removeAlert(alert);
    }, this.removeDelay);
  }

  info(message) {
    const messageIsObject = message && typeof message === "object";
    const messageToRender = messageIsObject
      ? { ...message, style: "info" }
      : message;
    this.alert(messageToRender, "info");
  }

  warning(message) {
    const messageIsObject = message && typeof message === "object";
    const messageToRender = messageIsObject
      ? { ...message, style: "warning" }
      : message;
    this.alert(messageToRender, "warning");
  }

  danger(message) {
    const messageIsObject = message && typeof message === "object";
    const messageToRender = messageIsObject
      ? { ...message, style: "danger" }
      : message;
    this.alert(messageToRender, "danger");
  }

  success(message) {
    const messageIsObject = message && typeof message === "object";
    const messageToRender = messageIsObject
      ? { ...message, style: "success" }
      : message;
    this.alert(messageToRender, "success");
  }

  alert(message, style) {
    if (this?._dom?.pongAlertsContainerList) {
      const alert = document.createElement("li");
      const alertId = this.generateAlertId();
      const messageIsObject = message && typeof message === "object";
      const styleFromMessage = messageIsObject && message.style;

      alert.setAttribute("data-pong-alert-id", alertId);
      alert.classList.add("pong-alert");

      if (styleFromMessage || style) {
        alert.classList.add(`pong-alert-${styleFromMessage || style}`);
      }

      alert.innerHTML = this.buildAlert(message);

      if (this.position.includes("bottom")) {
        this._dom.pongAlertsContainerList.append(alert);
      } else {
        this._dom.pongAlertsContainerList.prepend(alert);
      }

      this.addEventListeners(alertId);
      this.queueForRemoval(alertId);
      this.animateAlert(alertId);
    }
  }
}

export default new Pong({ position: "topRight" });
