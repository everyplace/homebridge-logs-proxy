import { Tail } from 'tail'
import fetch from 'node-fetch'
import { resolve } from "path"
import { config } from "dotenv"
                                                  
//load .env
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, ".env") })


const tail = new Tail("../homebridge.log")
const { room, api } = process.env
console.log(room, api)
//http://<hue>/lights/<room>/brightness/16
//room/brightness/id/value

tail.on("line", async function(data) {
  try {
    const raw = data.split('~DEVICE,')[1].split(',')
    console.log("Parseable data: ", data);

    const labels = {2:'on',5:'up',3:'fav',6:'down',4:'off'}

    const event = {
      remote: raw[0],
      button: {id:raw[1], name:labels[raw[1]]},
      action: raw[2]
    }

    if(event.action == 4) return //button up

    console.log(event)

    //button mapping to settings
    if(['on','off'].includes(event.button.name)) {
      console.log("on off action")
      const url = `http://${api}/lights/${room}/${event.button.name}/23`
      const response = await fetch(url).then(r=>r.json())
      console.log(response)
    } else {
	const value = event.button.name === 'up' ? 200 : event.button.name === 'down' ? 50 : 125
	const light = 23
	const url = `http://${api}/lights/${room}/brightness/23/${value}`
	console.log(url)
	const response = await fetch(url).then(r=>r.json())
	console.log({response})
    }
  } catch(e) {
    console.log("no valid action", data)
  }
});
