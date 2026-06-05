const http = require("http");
const { existsSync, readFileSync } = require("fs");
const { createMaskRoute } = require("./routes/mask.route");
const { createMaskUrl } = require("./services/mask-url");

const env = loadEnv();
const PORT = Number(env.PORT || process.env.PORT || 5173);
const HOST = env.HOST || process.env.HOST || "0.0.0.0";
const MASK_BASE_URL = (env.MASK_BASE_URL || process.env.MASK_BASE_URL || "http://giver.localhost:5174").replace(/\/+$/, "");
const FRONTEND_ORIGIN = env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGIN || "*";
const maskUrl = createMaskUrl(MASK_BASE_URL);
const maskRoute = createMaskRoute({ maskUrl, readJson, sendJson });

function loadEnv() {
  const path = ".env";
  if (!existsSync(path)) return {};

  return readFileSync(path, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .reduce((values, line) => {
      const index = line.indexOf("=");
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      values[key] = value;
      return values;
    }, {});
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body is too large"));
      }
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (await maskRoute(req, res, requestUrl)) return;

  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, HOST, () => {
  console.log(`Masker backend running at http://localhost:${PORT}`);
  console.log(`Mask base URL is ${MASK_BASE_URL}`);
});
