import test from 'ava'
import User from '../user'
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

test.serial('Creates a user with valid attributes', async t => {
  t.plan(7)

  const user = new User({
    user_id: '1',
    first_name: 'Uma',
    last_name: 'Lakshminarayan',
    home: { lat: 1.1234, lng: 1.1234 },
    points: 0,
    profile_pic: 'photo.jpg',
  })
  user.save((error, saved) => {
    t.is(saved.user_id, '1')
    t.is(saved.first_name, 'Uma')
    t.is(saved.last_name, 'Lakshminarayan')
    t.is(saved.home.lat, 1.1234)
    t.is(saved.home.lng, 1.1234)
    t.is(saved.points, 0)
    t.is(saved.profile_pic, 'photo.jpg')
  })
})

test.serial('Should not save user if fields are missing', async t => {
  t.plan(2)

  const user = new User()

  user.save((error, saved) => {
    t.true(error)
    t.false(saved)
  })
})
