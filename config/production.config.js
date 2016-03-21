
module.exports = {

  clientConfig: {
    host: '',
    port: 443
  },

  serverConfig: {
    port: process.env.PORT || process.env.NODE_PORT || 3000,
    LMV_CONSUMERKEY: process.env.LMV_CONSUMERKEY,
    LMV_CONSUMERSECRET: process.env.LMV_CONSUMERSECRET
  },

  dbConfig:{
    user: process.env.DB_USER,
    pwd: process.env.DB_PWD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    collections: {
      users: 'gallery.users',
      models: 'gallery.models',
      extensions: 'gallery.extensions'
    }
  }
}
