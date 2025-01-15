const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'YOUR_BACKEND_URL',
      changeOrigin: true,
      secure: false
    })
  );
};