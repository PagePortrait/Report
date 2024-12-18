// Copy of https://komito.net/demo/iframe.js

(() => {
  const IFRAME_DOMAIN = "komito.net";
  const IFRAME_ORIGIN = `https://${IFRAME_DOMAIN}`;
  const IFRAME_SOURCE = `${IFRAME_ORIGIN}/demo/iframe.html`;
  const RANDOM_NUMBER = (+new Date()).toString(36).slice(-5);
  const IFRAME_ID = `iframe-${RANDOM_NUMBER}`;

  const updateCSP = () => {
    let meta =
      document.querySelector('meta[http-equiv="Content-Security-Policy"]') ||
      document.querySelector('meta[http-equiv="content-security-policy"]');

    if (!meta) {
      meta = document.head.appendChild(document.createElement("meta"));
      meta.setAttribute("http-equiv", "content-security-policy");
    }

    let content = meta.getAttribute("content") || "";
    // TODO: update the "frame-src" policy directive if exisits:
    content = `frame-src 'self' ${IFRAME_DOMAIN}; ${content}`;
    meta.setAttribute("content", content);
  };

  const getCookieIframe = () => {
    let iframe = document.getElementById(IFRAME_ID);
    if (!iframe) {
      updateCSP();
      iframe = document.documentElement.appendChild(
        document.createElement("iframe")
      );
      iframe.style.position = "abosolute";
      iframe.style.width = "9px";
      iframe.style.height = "9px";
      iframe.style.top = "-9px";
      iframe.style.left = "-9px";
      iframe.style.border = 0;
      iframe.sandbox = "allow-scripts allow-same-origin";
      iframe.id = IFRAME_ID;
      iframe.src = `${IFRAME_SOURCE}?origin=${location.origin}&nc=${IFRAME_ID}`;
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp
      // iframe.csp = `frame-src 'self' ${IFRAME_DOMAIN}`;
    }
    return iframe;
  };

  window.addEventListener("load", (event) => {
    console.log("[PARENT] load:event:", event);
    const iframe = getCookieIframe();
    iframe.contentWindow.postMessage({ action: "handshake" }, IFRAME_ORIGIN);
  });

  window.addEventListener("message", (event) => {
    console.log("[PARENT] message:event:", event);

    const actions = event.data && event.data.actions;
    const origin = event.origin;
    if (actions && origin === IFRAME_ORIGIN) {
      const iframe = getCookieIframe();
      const action = event.data && event.data.action;
      if (action === actions.HANDSHAKE_ACTION) {
        console.log("[PARENT] HANDSHAKE_ACTION");
        iframe.contentWindow.postMessage(
          { action: actions.INCREMENT_VIEWS_ACTION },
          IFRAME_ORIGIN
        );
      } else if (action === actions.INCREMENT_VIEWS_ACTION) {
        console.log("[PARENT] INCREMENT_VIEWS_ACTION");
      } else {
        console.error("[PARENT] Unknowon action:", action);
      }
    }
  });
})();
