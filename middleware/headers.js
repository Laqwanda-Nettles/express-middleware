const headersRoute = (req, res, next) => {
  const host = req.headers.host || "Unknown";
  const language = req.headers["accept-language"] || "unknown";
  const platform = req.headers["user-agent"] || "Unknown";
  console.log(`Headers Host: ${host}`);
  console.log(`Headers Language: ${language}`);
  console.log(`Headers Platform: ${platform}`);
  next();
};

export { headersRoute };
