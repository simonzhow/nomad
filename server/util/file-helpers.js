import cloudinary from 'cloudinary'
import multer from 'multer'
/**
  * Express middleware that attaches a Cloudinary url to req.body if req.file
  * is present
  * @function
  * @param {Object} req - Express Request object
  * @param {Object} res - Express Response object
  */
export const attachPhotoUrl = (req, res, next) => {
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, (result) => {
      req.body.photoUrl = result.url
      next()
    })
  } else {
    next()
  }
}

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`)
  },
})

export const fileUpload = multer({ storage })
