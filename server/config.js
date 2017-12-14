const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/nomad',
  port: process.env.PORT || 8000,
  fb: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
  cloudinary: {
    cloud_name: 'nomad-app',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
}

export default config
