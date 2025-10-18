// link-checker.js
// Intercepts internal anchor clicks and checks the target URL with a HEAD request.
// If the target returns 404, redirects to a custom notfound page to improve UX.
// Usage: include <script src="/js/link-checker.js"></script> near the end of the body.

(function () {
  "use strict";

  const NOTFOUND_URL = "/notfound.html"; // change to '/404.html' if you prefer

  function isSameOrigin(url) {
    try {
      const u = new URL(url, location.href);
      return u.origin === location.origin;
    } catch (e) {
      return false;
    }
  }

  function isSkippableHref(href) {
    if (!href) return true;
    return (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    );
  }

  // Avoid redirect loops when already on notfound page
  function isOnNotFoundPage() {
    try {
      return (
        location.pathname.includes("notfound") ||
        location.pathname.includes("404")
      );
    } catch (e) {
      return false;
    }
  }

  async function checkAndNavigate(url, event) {
    try {
      // HEAD is lightweight; some servers may not support it — fallback handled below
      const res = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (res.status === 404) {
        // redirect to notfound page
        window.location.href = NOTFOUND_URL;
      } else {
        // proceed with navigation
        window.location.href = url;
      }
    } catch (err) {
      // If HEAD fails, try a GET as a fallback; if that fails, just navigate normally
      try {
        const res2 = await fetch(url, { method: "GET", cache: "no-store" });
        if (res2.status === 404) window.location.href = NOTFOUND_URL;
        else window.location.href = url;
      } catch (e) {
        // As a last resort, allow the browser to navigate so the server can respond
        window.location.href = url;
      }
    }
  }

  // Listen for link clicks at the document level to catch dynamically added links as well.
  document.addEventListener(
    "click",
    function (ev) {
      try {
        if (ev.defaultPrevented) return;
        // Only handle left-clicks without modifier keys
        if (ev.button !== 0) return;
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

        const anchor = ev.target.closest && ev.target.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href || isSkippableHref(href)) return;

        // Only handle same-origin links
        if (!isSameOrigin(href)) return;

        // Skip links that open in new tabs/windows explicitly
        if (anchor.target && anchor.target !== "" && anchor.target !== "_self")
          return;

        // Avoid checking notfound itself
        if (href.includes("notfound") || href.includes("404")) return;

        // Intercept navigation while we check the target
        ev.preventDefault();
        // Compose absolute URL
        const absolute = new URL(href, location.href).href;
        checkAndNavigate(absolute, ev);
      } catch (e) {
        // On any error, don't block normal navigation
        return;
      }
    },
    true
  );

  // Expose a helper for programmatic use
  window.checkLinkAndRedirect = checkAndNavigate;
})();
