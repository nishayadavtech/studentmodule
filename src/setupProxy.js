const { createProxyMiddleware } = require("http-proxy-middleware");

const target =
  process.env.REACT_APP_API_PROXY_TARGET ||
  process.env.REACT_APP_LOCAL_API_URL ||
  "http://localhost:5500";

const fallbackTarget =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5500";

module.exports = function setupProxy(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      router: () => target || fallbackTarget,
      pathRewrite: {
        "^/api": "",
      },
      logLevel: "silent",
    })
  );
};
