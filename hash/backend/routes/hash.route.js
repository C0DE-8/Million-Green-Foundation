function createHashRoute({ createHashPath, normalizePage, sendJson }) {
  return function hashRoute(req, res, requestUrl) {
    if (req.method !== "GET" || requestUrl.pathname !== "/api/hash") {
      return false;
    }

    const page = normalizePage(requestUrl.searchParams.get("page") || "home");
    sendJson(res, 200, { page, path: createHashPath(page) });
    return true;
  };
}

module.exports = { createHashRoute };
