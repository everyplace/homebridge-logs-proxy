

const double = `

[5/14/2022, 8:11:11 PM] [Pico] Cama Grande Pico - Up double press
[5/15/2022, 1:53:42 AM] [Pico] Oficina Bonus New - Up double press

`
const single = `
[5/14/2022, 10:14:14 PM] [Pico] Pico Dining Room - On single press
[5/14/2022, 10:15:36 PM] [Pico] Pico Dining Room - Off single press
[5/15/2022, 1:54:00 AM] [Pico] Oficina Bonus New - Off single press
`

const valid = `
[5/15/2022, 7:27:41 PM] [Pico] [lutron.lan] Bus Data: ~DEVICE,19,4,4
[5/15/2022, 7:27:41 PM] [Pico] [lutron.lan] Bus Data: ~DEVICE,19,2,3
[5/15/2022, 7:27:41 PM] [Pico] [lutron.lan] Bus Data: ~DEVICE,19,2,4
[5/15/2022, 7:27:42 PM] [Pico] [lutron.lan] Bus Data: ~DEVICE,19,3,3
[5/15/2022, 7:27:43 PM] [Pico] [lutron.lan] Bus Data: ~DEVICE,19,3,4
[5/15/2022, 7:27:43 PM] [Pico] [lutron.lan] Bus Data: ~DEVICE,19,2,3

`

import { switches, override } from './switches.js'
import { readFileSync, writeFileSync, appendFileSync } from 'fs'

const randomAction = () => {
  const validSwitches = Object.keys(switches)
  const validSwitch = validSwitches[Math.floor(Math.random()*validSwitches.length)]
  const validButtons = [2,5,3,6,4]
  const validButton = validButtons[Math.floor(Math.random()*validButtons.length)]

  const action = `[Pico] [lutron.lan] Bus Data: ~DEVICE,${validSwitch},${validButton},3`
  return action
}

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

test('Simulating log writing for invalid actions', ()=>{

  const simulatedLog = `${timestamp()} ${randomRemote()}\n`

  console.log(simulatedLog)

  appendFileSync(logFile, simulatedLog)

  expect(true).toEqual(true)
})


test('Simulating log writing for valid actions', ()=>{

  const simulatedLog = `${timestamp()} ${randomAction()}\n`

  console.log(simulatedLog)

  appendFileSync(logFile, simulatedLog)

  expect(true).toEqual(true)
})

