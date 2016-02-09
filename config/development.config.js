//var host = require('network-address')();

module.exports = {

    port: process.env.PORT || process.env.NODE_PORT || 3000,
    host: '',
    hotReloadPort: process.env.HOT_RELOAD_PORT || 3001,
    hotReloadUrl: 'http://$(host):$(hotReloadPort)/',

    dbConfig:{
        user: '',
        pwd: '',
        port: 27017,
        host: 'localhost',
        database: 'gallery'
    }
}
