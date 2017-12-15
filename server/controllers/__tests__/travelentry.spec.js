import test from 'ava'
import request from 'supertest'
import app from '../../server'
import TravelEntry from '../travelentry'
import Guid from 'guid'
import { connectDB, dropDB } from '../../util/test-helpers'

const t_id = Guid.create()
const travelEntry = new TravelEntry({
  travel_id: t_id,
  user_id: '1',
  title: 'My first trip',
  description: 'I went hiking',
  location: { lat: 1.1234, lng: 1.1234 },
  photo_url: 'photo.jpg',
  points: 10,
})

/**
  @class
  @classdesc Tests for travel entry class
*/
test.before('connect and add a travel entry', t => {
  connectDB(t, () => {
    TravelEntry.create(travelEntry, err => {
      if (err) t.fail('Unable to create travel entry')
    })
  })
})

test.afterEach.always(t => {
  dropDB(t)
})

test.serial('Creates a travel entry with valid attributes', async t => {
  t.plan(3)

  const res = await request(app)
    .post('/api/travelentries')
    .send({
      travelEntry: {
        title: 'Hiking trip',
        location: { lat: 20.1234, lng: 20.1234 },
        description: 'Went hiking with friends',
      },
    })
    .set('Accept', 'application/json')

  t.is(res.status, 200)
  t.is(res.body.saved.user_id, '1')
  t.is(res.body.saved.title, 'Hiking trip')
})

test.serial('Properly deletes a travel entry', async t => {
  t.plan(1)

  const travelEntry1 = new TravelEntry({
    travel_id: Guid.create(),
    user_id: '1',
    title: 'My second trip',
    description: 'Second hiking trip',
    location: { lat: 21.1234, lng: 21.1234 },
    photo_url: 'some_photo.jpg', points: 20,
  })
  travelEntry1.save()

  await request(app)
    .delete(`/api/travelentries/${travelEntry1.travel_id}`)
    .set('Accept', 'application/json')

  const testEntry = await TravelEntry.findOne({ travel_id: travelEntry1.travel_id }).exec()
  t.is(testEntry, null)
})

test.serial('Should get all travel entries for current user', async t => {
  t.plan(2)

  const res = await request(app)
    .get(`/api/travelentries/${'1'}`)
    .set('Accept', 'application/json')

  t.is(res.status, 200)
  t.is(res.travelentries[0].user_id, '1')
})

test.serial('Should not save travel entry if field is missing', async t => {
  t.plan(1)

  const travelEntry1 = new TravelEntry()

  const res = await request(app)
    .post('/api/travelentries')
    .send({ travelEntry: travelEntry1 })
    .set('Accept', 'application/json')

  t.is(res.status, 403)
})
