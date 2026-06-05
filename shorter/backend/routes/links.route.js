function createLinksRoute({ links, makeCode, normalizeUrl, getOrigin, readJson, sendJson }) {
  return async function linksRoute(req, res, requestUrl) {
    if (req.method !== "POST" || requestUrl.pathname !== "/api/shorten") {
      return false;
    }

    try {
      const body = await readJson(req);
      const longUrl = normalizeUrl(body.url);
      const code = makeCode();

      links.set(code, longUrl);

      sendJson(res, 201, {
        code,
        longUrl,
        shortUrl: `${getOrigin(req)}/${code}`,
      });
    } catch (err) {
      sendJson(res, 400, { error: err.message });
    }

    return true;
  };
}

module.exports = { createLinksRoute };
