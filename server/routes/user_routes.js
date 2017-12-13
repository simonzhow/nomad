const router = require('express').router()
import * as UserController from '../controllers/user_controller'
const fbAuth = passport.authenticate('facebook-token', { session: false })

// Get a user
router.get('/', fbAuth, UserController.getUser)

export default router
