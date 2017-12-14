import { Router } from 'express'
import passport from 'passport'
import {
  getTravelEntries,
  createTravelEntry,
  deleteTravelEntry,
} from '../controllers/travel_entry.controller'
import { fileUpload, attachPhotoUrl } from '../util/file-helpers'
const travelEntryRouter = new Router()

const fbAuth = passport.authenticate('facebook-token', { session: false })

// Get all travel entries of a user
travelEntryRouter.get('/', fbAuth, getTravelEntries)

// Create a new travel entry
travelEntryRouter.post('/', fbAuth, fileUpload.single('photo'), attachPhotoUrl, createTravelEntry)

// Delete a travel entry by ID
travelEntryRouter.delete('/:travel_id', fbAuth, deleteTravelEntry)

export default travelEntryRouter
