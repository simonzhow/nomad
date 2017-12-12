import test from 'ava'
import request from 'supertest'
import app from '../../server'
import TravelEntry from '../travelentry'
import User from '../user'
import Guid from 'guid'
import { connectDB, dropDB } from '../../util/test-helpers'

const user = new User({ user_id: Guid.create(), first_name: 'Uma', last_name: 'Lakshminarayan', email_address: 'umaslakshmi@ucla.edu', username: 'umasl', points: 0, password: 'some_hash' })

/**
  @class
  @classdesc Tests for travel entry class
*/
test.beforeEach('connect and add two post entries', t => {
  connectDB(t, () => {
    User.create(user, err => {
      if (err) t.fail('Unable to create posts')
    })
  })
})

test.afterEach.always(t => {
  dropDB(t)
})

test.serial('Creates a travel entry associated with the user', async t => {
  t.plan(2)

  const res = await request(app)
    .post('/api/travelentries')
    .send({ travelEntry: { title: 'My first trip', user_id: user.user_id } })
    .set('Accept', 'application/json')

  t.is(res.status, 200)
  t.is(res.body.saved.user_id, user.user_id)
  t.is(res.body.saved.title, 'My first trip')
})

test.serial('Properly deletes a travel entry', async t => {
  t.plan(2)

  const travelEntry = new TravelEntry({ travel_id: Guid.create(), user_id: user.user_id, title: 'My first trip' })
  travelEntry.save()

  await request(app)
    .delete(`/api/travelentries/${travelEntry.travel_id}`)
    .set('Accept', 'application/json')

  const testEntry = await TravelEntry.findOne({ travel_id: travelEntry.travel_id }).exec()
  t.is(testEntry, null)
})

test.serial('Should get all travel entries for a user', async t => {
  t.plan(2)

  const travelEntry1 = new TravelEntry({ travel_id: Guid.create(), user_id: user.user_id, title: 'My first trip' })
  travelEntry1.save()
  const travelEntry2 = new TravelEntry({ travel_id: Guid.create(), user_id: user.user_id, title: 'My second trip' })
  travelEntry2.save()

  const res = await request(app)
    .get(`/api/travelentries/${user.user_id}`)
    .set('Accept', 'application/json')

  t.is(res.status, 200)
  t.is(res.travelentries[0].user_id, user.user_id)
  t.is(res.travelentries[1].user_id, user.user_id)
})

test.serial('Should not save travel entry if field is missing', async t => {
  t.plan(2)

  const travelEntry1 = new TravelEntry({ user_id: user.user_id })

  const res = await request(app)
    .post('/api/travelentries')
    .send({ travelEntry: travelEntry1 })
    .set('Accept', 'application/json')

  t.is(res.status, 403)
})
