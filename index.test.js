

const double = `

[5/14/2022, 8:11:11 PM] [Pico] Cama Grande Pico - Up double press
[5/15/2022, 1:53:42 AM] [Pico] Oficina Bonus New - Up double press

`
const single = `
[5/14/2022, 10:14:14 PM] [Pico] Pico Dining Room - On single press
[5/14/2022, 10:15:36 PM] [Pico] Pico Dining Room - Off single press
[5/15/2022, 1:54:00 AM] [Pico] Oficina Bonus New - Off single press
`

import { override } from './switches.js'
import { readFileSync, writeFileSync, appendFileSync } from 'fs'

const randomRemote = () => {
  const rooms = [
    'Dining room',
    'Living room',
    'Sun room',
    'Cama Grande',
    'Niño\'s bedroom'
  ]

  const actions = [
    'On single press',
    'Off single press',
    'On double press',
    'Off double press'
  ]

  const randomRoom = rooms[Math.floor(Math.random()*rooms.length)]
  const randomAction = actions[Math.floor(Math.random()*actions.length)]

  return `[Pico] ${randomRoom} - ${randomAction}`

}

const timestamp = () => {
  const now = new Date()

  const date = now.getDate()
  const year = now.getFullYear()
  const month = now.getMonth()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()
  const suffix = hour < 12 ? 'AM' : 'PM'

  return `[${month}/${date}/${year}, ${hour}:${minute}:${second} ${suffix}]`
}

const logFile = './homebridge.test.log'

test('Simulating log writing', ()=>{

  const simulatedLog = `${timestamp()} ${randomRemote()}\n`

  console.log(simulatedLog)

  appendFileSync(logFile, simulatedLog)

  expect(true).toEqual(true)
})

