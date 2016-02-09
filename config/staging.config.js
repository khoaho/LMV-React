var host = require('network-address')();

module.exports = {
    port: process.env.PORT || process.env.NODE_PORT || 8080,
    host: host,
    hotReloadPort: process.env.HOT_RELOAD_PORT || 3000,
    hotReloadUrl: 'http://$(host):$(hotReloadPort)/'
};
