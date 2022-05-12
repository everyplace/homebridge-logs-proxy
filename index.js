import { Tail } from 'tail'
import fetch from 'node-fetch'
import config from './env.js'
import switches from './switches.js'

const logfile = process.env.LOGFILE || '../homebridge/homebridge.log'

const tail = new Tail(logfile)
const { room, api } = process.env
console.log(room, api)

tail.on("line", async function(data) {
  try {
    const raw = data.split('~DEVICE,')[1].split(',')
    console.log("Parseable data: ", data);

    const labels = {2:'on',5:'increase',3:'fav',6:'decrease',4:'off'}

    const event = {
      remote: raw[0],
      button: {id:raw[1], name:labels[raw[1]]},
      action: raw[2]
    }

    const lights = switches[event.remote] //used to default to 16, but no more

    if(event.action == 4) return //button up
    event.lights = lights
    console.log(event)

    for(let light of lights) {
	    //button mapping to settings
	    if(['on','off'].includes(event.button.name)) {
        console.log("on off action")
        const url = `http://${api}/lights/${room}/${event.button.name}/${light}`
        const response = await fetch(url).then(r=>r.json())
        console.log(response)
      } else if (['increase','decrease'].includes(event.button.name)) {
        console.log("increase decrease action")
        const url = `http://${api}/lights/${room}/brightness/${light}/${event.button.name}`
        const response = await fetch(url).then(r=>r.json())
        console.log(response)
	    } else {
    		const value = event.button.name === 'up' ? 200 : event.button.name === 'down' ? 50 : 125
    		const url = `http://${api}/lights/${room}/brightness/${light}/${value}`
    		console.log(url)
    		const response = await fetch(url).then(r=>r.json())
    		console.log({response})
	    }
    }
  } catch(e) {
    console.log("no valid action", data)
  }
});
