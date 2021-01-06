const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/wiki",
    createProxyMiddleware({
      changeOrigin: true,
      followRedirects: true,
      target: "https://cs.wikipedia.org"
    })
  );
};