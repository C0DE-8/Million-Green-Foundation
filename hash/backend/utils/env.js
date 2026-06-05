const { existsSync, readFileSync } = require("fs");

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

module.exports = { loadEnv };
