const router = require('express').router()
import * as TravelEntryController from '../controllers/travel_entry.controller'
const fbAuth = passport.authenticate('facebook-token', { session: false })

// Get all travel entries of a user
router.get('/:user_id', fbAuth, TravelEntryController.getTravelEntries)

// Create a new travel entry
router.post('/', fbAuth, TravelEntryController.createTravelEntry)

// Delete a travel entry by ID
router.delete('/:travel_id', fbAuth, TravelEntryController.deleteTravelEntry)

export default router
