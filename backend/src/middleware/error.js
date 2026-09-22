export function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  if (status === 500 && process.env.NODE_ENV === "production") {
    return res.status(500).json({ error: "Internal server error" });
  }
  res.status(status).json({ error: message, ...(err.issues ? { issues: err.issues } : {}) });
}
