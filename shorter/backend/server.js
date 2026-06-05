const http = require("http");
const { readFileSync, existsSync } = require("fs");
const { randomBytes } = require("crypto");
const { createLinksRoute } = require("./routes/links.route");
const { createRedirectRoute } = require("./routes/redirect.route");

const env = loadEnv();
const PORT = Number(env.PORT || process.env.PORT || 5173);
const HOST = env.HOST || process.env.HOST || "0.0.0.0";
const BASE_URL = (env.BASE_URL || process.env.BASE_URL || "").replace(/\/+$/, "");
const FRONTEND_ORIGIN = env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGIN || "*";
const links = new Map();

const shared = {
  links,
  makeCode,
  normalizeUrl,
  getOrigin,
  readJson,
  sendJson,
};

const linksRoute = createLinksRoute(shared);
const redirectRoute = createRedirectRoute(shared);

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

function makeCode() {
  let code;
  do {
    code = randomBytes(4).toString("base64url");
  } while (links.has(code));
  return code;
}

function normalizeUrl(value) {
  if (!value || typeof value !== "string") {
    throw new Error("URL is required");
  }

  const parsed = new URL(value);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are allowed");
  }

  return parsed.toString();
}

function getOrigin(req) {
  if (BASE_URL) return BASE_URL;

  const host = req.headers.host || `localhost:${PORT}`;
  return `http://${host}`;
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (requestUrl.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (await linksRoute(req, res, requestUrl)) return;
  if (redirectRoute(req, res, requestUrl)) return;

  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, HOST, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
  console.log(`Short links use ${BASE_URL || `http://localhost:${PORT}`}`);
});
