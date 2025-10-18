notfound-redirect.js

This project includes a helper `js/notfound-redirect.js` that:

- Wraps `fetch()` so API or resource calls that return 404 trigger a redirect to `/notfound.html`.
- Intercepts internal anchor clicks and issues a `HEAD` request to confirm the target exists; if the target returns 404 the user is redirected to the notfound page instead of seeing a browser error.
- Exposes `window.checkUrlAndRedirectIfMissing(href)` for explicit programmatic checks.

How to include

Add the script near the end of `body`, before other app scripts, e.g.:

<script src="/js/notfound-redirect.js"></script>
<script src="/js/script.js"></script>

Notes

- The script avoids redirect loops by detecting `notfound` or `404` in the current pathname.
- It prefers `HEAD` checks, falling back to `GET` if `HEAD` fails.
- For cross-origin links the script does not attempt checks to avoid CORS errors.
- Server-side 404 handling remains recommended for frank reliability; this helper improves client-side UX.
