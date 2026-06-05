function createHealthRoute({ sendJson }) {
  return function healthRoute(req, res, requestUrl) {
    if (req.method !== "GET" || requestUrl.pathname !== "/api/health") {
      return false;
    }

    sendJson(res, 200, { ok: true });
    return true;
  };
}

module.exports = { createHealthRoute };
