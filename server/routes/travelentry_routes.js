import { Router } from 'express'
import passport from 'passport'
import * as TravelEntryController from '../controllers/travel_entry.controller'
const travelEntryRouter = new Router()

const fbAuth = passport.authenticate('facebook-token', { session: false })

// Get all travel entries of a user
travelEntryRouter.get('/:user_id', fbAuth, TravelEntryController.getTravelEntries)

// Create a new travel entry
travelEntryRouter.post('/', fbAuth, TravelEntryController.createTravelEntry)

// Delete a travel entry by ID
travelEntryRouter.delete('/:travel_id', fbAuth, TravelEntryController.deleteTravelEntry)

export default travelEntryRouter
