const users = {
  members: [
    {
      name: { first: 'Simon', last: 'Zhou' },
      score: 2.1,
      facebook: 'https://www.facebook.com/siimon.zhou',
    },
    {
      name: { first: 'Mihir', last: 'Mathur' },
      score: 3.1,
      facebook: 'https://www.facebook.com/mihirmathur',
    },
    {
      name: { first: 'Bibek', last: 'Ghimire' },
      score: 4.1,
      facebook: 'https://www.facebook.com/bibekgg',
    },
    {
      name: { first: 'Uma', last: 'L' },
      score: 5.1,
      facebook: 'https://www.facebook.com/uma.lakshminarayan',
    },
    {
      name: { first: 'Anshul', last: 'Aggarwal' },
      score: 0.2,
      facebook: 'https://www.facebook.com/anshul.aggarwal.14',
    },
    {
      name: { first: 'Monil', last: 'Patel' },
      score: 0.1,
    },
    {
      name: { first: 'Tom', last: 'Ralph' },
      score: 10.1,
    },
    {
      name: { first: 'Bob', last: 'Dickenson' },
      score: 5.1,
    },
    {
      name: { first: 'Steve', last: 'Jobs' },
      score: 1.1,
    },
    {
      name: { first: 'Tim', last: 'Cook' },
      score: 2.1,
    },
    {
      name: { first: 'Jeff', last: 'Bezos' },
      score: 3.5,
    },
    {
      name: { first: 'Kobe', last: 'Bryant' },
      score: 4.1,
    },
    {
      name: { first: 'Vanessa', last: 'Patel' },
      score: 6.1,
    },

  ],
}

users.members.forEach((user) => {
  const score = user.score

  user.rank = {}

  if (score > 6) {
    user.rank.image = require('static/leaderboard-icons/worldtraveler.png')
    user.rank.title = 'World Traveler'
  } else if (score > 4) {
    user.rank.image = require('static/leaderboard-icons/airportguru.png')
    user.rank.title = 'Airport Guru'
  } else if (score > 2) {
    user.rank.image = require('static/leaderboard-icons/onthefly.png')
    user.rank.title = 'On The Fly'
  } else {
    user.rank.image = require('static/leaderboard-icons/roadster.png')
    user.rank.title = 'Roadster'
  }
})

export default users
