import { Router } from 'express'
import * as UserController from '../controllers/user_controller'
const router = new Router()

// Get a user
router.route('/').get(UserController.getUser)

// Create a user
router.route('/').post(UserController.createUser)

// Delete a user by user_id
router.route('/:user_id').delete(UserController.deleteUser)

export default router
