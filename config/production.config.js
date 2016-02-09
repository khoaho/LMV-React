module.exports = {

    port: process.env.PORT || process.env.NODE_PORT || 8080,
    host: '',
    hotReloadPort: process.env.HOT_RELOAD_PORT || 3000,
    hotReloadUrl: 'http://$(host):$(hotReloadPort)/',

    dbConfig:{
        user: process.env.DB_USER,
        pwd: process.env.DB_PWD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME
    }
}
