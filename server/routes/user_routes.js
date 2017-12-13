import { Router } from 'express'
import passport from 'passport'
import * as UserController from '../controllers/user_controller'
const userRouter = new Router()

const fbAuth = passport.authenticate('facebook-token', { session: false })

// Get a user
userRouter.get('/', fbAuth, UserController.getUser)

export default userRouter
