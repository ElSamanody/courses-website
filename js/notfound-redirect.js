// notfound-redirect.js
// Global helper that intercepts fetch calls and internal link clicks.
// If a response returns 404 it redirects the browser to a custom notfound page.
// Place <script src="/js/notfound-redirect.js"></script> near the end of pages (before other app scripts)

(function () {
  "use strict";

  // Path to the custom not-found page. Use absolute path for consistency.
  const NOTFOUND_PAGE = "/notfound.html";

  // Helper: detect if current page is the notfound page to avoid redirect loops
  function isOnNotFoundPage() {
    try {
      const p = location.pathname || location.href;
      return p.includes("notfound") || p.includes("404");
    } catch (e) {
      return false;
    }
  }

  // Redirect helper - uses several fallback path styles to increase chance of matching
  function redirectToNotFound() {
    try {
      // Avoid redirect loop
      if (isOnNotFoundPage()) return;
      // Prefer absolute path at origin
      const absolute = new URL(NOTFOUND_PAGE, location.origin).href;
      // perform navigation
      window.location.href = absolute;
    } catch (e) {
      // last-resort: relative redirect
      window.location.href = "notfound.html";
    }
  }

  // --- 1) Wrap window.fetch so API calls that return 404 trigger redirect ---
  const originalFetch = window.fetch && window.fetch.bind(window);
  if (originalFetch) {
    window.fetch = async function (input, init) {
      try {
        const response = await originalFetch(input, init);
        // If the response status is 404, redirect to the notfound page
        if (response && response.status === 404) {
          // Gracefully redirect
          redirectToNotFound();
          // Still return the response (page will likely navigate away)
        }
        return response;
      } catch (err) {
        // Network or CORS error - don't redirect on these; rethrow so callers can handle
        throw err;
      }
    };
  }

  // --- 2) Intercept internal anchor clicks and check target existence with HEAD ---
  document.addEventListener(
    "click",
    function (ev) {
      try {
        // Only interested in left-clicks
        if (ev.defaultPrevented || ev.button !== 0) return;
        // Respect modifier keys (open in new tab/window)
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

        const anchor = ev.target.closest && ev.target.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        // Ignore anchors to fragments, mailto, tel, javascript, and external links
        if (
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("javascript:")
        )
          return;

        const url = new URL(href, location.href);
        // Only handle same-origin links
        if (url.origin !== location.origin) return;

        // If the link explicitly targets a new window/tab, skip interception
        if (anchor.target && anchor.target !== "" && anchor.target !== "_self")
          return;

        // Avoid checking the notfound page itself
        if (url.pathname.includes("notfound") || url.pathname.includes("404"))
          return;

        // Prevent default navigation while we check
        ev.preventDefault();

        // Try a HEAD request first - servers may not support HEAD, so fallback to GET on error
        fetch(url.href, { method: "HEAD", cache: "no-store" })
          .then((res) => {
            if (res.status === 404) {
              redirectToNotFound();
            } else {
              // proceed with navigation
              location.href = url.href;
            }
          })
          .catch(() => {
            // Fallback: try GET (less ideal) - if it fails, still navigate so user sees server's response
            fetch(url.href, { method: "GET", cache: "no-store" })
              .then((r) => {
                if (r.status === 404) redirectToNotFound();
                else location.href = url.href;
              })
              .catch(() => {
                // If both checks fail, just navigate normally (server may allow direct access)
                location.href = url.href;
              });
          });
      } catch (e) {
        // On any error, don't block user navigation
        return;
      }
    },
    true
  );

  // --- 3) Optional helper: programmatic check + redirect for code that wants to pre-check a URL ---
  window.checkUrlAndRedirectIfMissing = async function (href) {
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return false; // skip external
      if (isOnNotFoundPage()) return false;
      const res = await fetch(url.href, { method: "HEAD", cache: "no-store" });
      if (res.status === 404) {
        redirectToNotFound();
        return true;
      }
      return false;
    } catch (e) {
      // on error, do not redirect automatically
      return false;
    }
  };

  // Export flag so other scripts can detect the feature
  window.__NOTFOUND_REDIRECT_INSTALLED = true;
})();
