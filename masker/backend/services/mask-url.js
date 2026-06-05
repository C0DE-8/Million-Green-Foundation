function createMaskUrl(maskBaseUrl) {
  const normalizedBaseUrl = maskBaseUrl.replace(/\/+$/, "");

  return function maskUrl(value) {
    if (!value || typeof value !== "string") {
      throw new Error("URL is required");
    }

    const originalUrl = new URL(value);
    const baseUrl = new URL(normalizedBaseUrl);

    if (!["http:", "https:"].includes(originalUrl.protocol)) {
      throw new Error("Only http and https URLs are allowed");
    }

    baseUrl.pathname = originalUrl.pathname;
    baseUrl.search = originalUrl.search;
    baseUrl.hash = originalUrl.hash;

    return {
      originalUrl: originalUrl.toString(),
      maskedUrl: baseUrl.toString(),
    };
  };
}

module.exports = { createMaskUrl };
