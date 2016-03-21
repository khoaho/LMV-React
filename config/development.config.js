
module.exports = {

    clientConfig: {
        host: 'localhost',
        port: 3000,
        redux:{
          devtools: false
        }
    },

    serverConfig: {
        port: 3000,
        LMV_CONSUMERKEY: process.env.LMV_CONSUMERKEY,
        LMV_CONSUMERSECRET: process.env.LMV_CONSUMERSECRET
    },

    dbConfig:{
        user: '',
        pwd: '',
        port: 27017,
        host: 'localhost',
        database: 'gallery',
        collections: {
            users: 'gallery.users',
            models: 'gallery.models',
            extensions: 'gallery.extensions'
        }
    }
}
