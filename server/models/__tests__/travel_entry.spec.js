import test from 'ava'
import TravelEntry from '../travelentry'
import Guid from 'guid'
import { connectDB, dropDB } from '../../util/test-helpers'


/**
  @class
  @classdesc Tests for travel entry class
*/
test.before('', t => {
  connectDB(t, () => {
  })
})

test.afterEach.always(t => {
  dropDB(t)
})

test.serial('Creates a travel entry with valid attributes', async t => {
  t.plan(8)

  const id = Guid.create()
  const travelEntry = new TravelEntry({
    travel_id: id,
    user_id: '1',
    title: 'My first trip',
    description: 'I went on a hike.',
    location: { lat: 1.1234, lng: 1.1234 },
    photo_url: 'photo.jpg',
    points: 10,
  })
  travelEntry.save((error, saved) => {
    t.is(saved.travel_id, id)
    t.is(saved.user_id, '1')
    t.is(saved.title, 'My first trip')
    t.is(saved.description, 'I went on a hike')
    t.is(saved.location.lat, 1.1234)
    t.is(saved.location.lng, 1.1234)
    t.is(saved.photo_url, 'photo.jpg')
    t.is(saved.points, 10)
  })
})

test.serial('Should not save travel entry if fields are missing', async t => {
  t.plan(2)

  const travelEntry = new TravelEntry()

  travelEntry.save((error, saved) => {
    t.true(error)
    t.false(saved)
  })
})
