const http = require("http");
const { createHashRoute } = require("./routes/hash.route");
const { createHealthRoute } = require("./routes/health.route");
const { createHashPath, normalizePage } = require("./services/hash-path");
const { loadEnv } = require("./utils/env");
const { sendJson, setCorsHeaders } = require("./utils/http");

const env = loadEnv();
const PORT = Number(env.PORT || process.env.PORT || 5173);
const HOST = env.HOST || process.env.HOST || "0.0.0.0";
const FRONTEND_ORIGIN = env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGIN || "*";

const routes = [
  createHealthRoute({ sendJson }),
  createHashRoute({ createHashPath, normalizePage, sendJson }),
];

const server = http.createServer((req, res) => {
  setCorsHeaders(res, FRONTEND_ORIGIN);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const handled = routes.some((route) => route(req, res, requestUrl));

  if (!handled) {
    sendJson(res, 404, { error: "Not found" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Hash backend running at http://localhost:${PORT}`);
});
