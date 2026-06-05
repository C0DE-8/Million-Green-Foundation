function createRedirectRoute({ links }) {
  return function redirectRoute(req, res, requestUrl) {
    if (req.method !== "GET" || requestUrl.pathname.startsWith("/api/")) {
      return false;
    }

    const code = requestUrl.pathname.slice(1);
    const longUrl = links.get(code);

    if (!code || !longUrl) {
      return false;
    }

    res.writeHead(302, { Location: longUrl });
    res.end();
    return true;
  };
}

module.exports = { createRedirectRoute };
