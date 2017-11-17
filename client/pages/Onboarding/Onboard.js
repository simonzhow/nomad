import React from 'react'
import styles from 'styled-components'
// import bg from '../../static/img/onboard_bg.jpg'

const OnboardDiv = styles.div`
  margin-left: 300px;
  padding: 30px;
  background: url({bg})
`

export default function OnboardPage() {
  return (
    <OnboardDiv />
  )
}
