function createMaskRoute({ maskUrl, readJson, sendJson }) {
  return async function maskRoute(req, res, requestUrl) {
    if (req.method !== "POST" || requestUrl.pathname !== "/api/mask") {
      return false;
    }

    try {
      const body = await readJson(req);
      sendJson(res, 200, maskUrl(body.url));
    } catch (err) {
      sendJson(res, 400, { error: err.message });
    }

    return true;
  };
}

module.exports = { createMaskRoute };
