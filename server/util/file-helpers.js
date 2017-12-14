import cloudinary from 'cloudinary'
import multer from 'multer'
/**
<<<<<<< HEAD
  * Handles uploading to Cloudinary
  * @param req {JSON} Request send to function
  * @param res {JSON} Response sent from function
=======
   Handles uploading to Cloudinary
  * @param req {JSON}
  * @param res {JSON}
>>>>>>> master
  */
export const attachPhotoUrl = (req, res, next) => {
  // If a file (photo) is provided with the request, attach a Cloudinary url
  // to the request before passing it forward
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
