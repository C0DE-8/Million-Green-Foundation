const { randomBytes, randomInt } = require("crypto");

const allowedPages = new Set(["home", "terms", "privacy", "disclaimer"]);

function randomToken(bytes = 8) {
  return randomBytes(bytes).toString("base64url").toLowerCase();
}

function randomDigits(length) {
  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += randomInt(0, 10);
  }
  return value;
}

function normalizePage(page) {
  return allowedPages.has(page) ? page : "home";
}

function createHashPath(page = "home") {
  const safePage = normalizePage(page);
  const parts = [
    randomToken(3),
    "server",
    randomDigits(6),
    `${randomToken(4)}-fund-${randomDigits(5)}`,
    "water",
    "page",
    safePage,
    randomToken(14),
    randomToken(10),
    randomDigits(8),
    randomToken(12),
  ];

  return `/${parts.join("/")}`;
}

module.exports = { createHashPath, normalizePage };
