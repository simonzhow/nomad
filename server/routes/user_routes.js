import { Router } from 'express'
import passport from 'passport'
import * as UserController from '../controllers/user_controller'
const userRouter = new Router()

const fbAuth = passport.authenticate('facebook-token', { scope: 'user_friends', session: false })

// Get a user
userRouter.get('/', fbAuth, UserController.getUser)

// Onboard a user (set their home location)
userRouter.post('/onboard', fbAuth, UserController.onboard)

export default userRouter
