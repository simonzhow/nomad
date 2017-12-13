const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/nomad',
  port: process.env.PORT || 8000,
  fb: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
}

export default config
