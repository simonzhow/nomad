import { Router } from 'express'
import * as TravelEntryController from '../controllers/travel_entry.controller'
const router = new Router()

// Get all travel entries of a user
router.route('/:user_id').get(TravelEntryController.getTravelEntries)

// Create a new travel entry
router.route('/').post(TravelEntryController.createTravelEntry)

// Delete a travel entry by ID
router.route('/:travel_id').delete(TravelEntryController.deleteTravelEntry)

export default router
