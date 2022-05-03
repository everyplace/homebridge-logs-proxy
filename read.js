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
  console.log(data);
  try {
    const event = data.split('~DEVICE,')[1].split(',')
    const remote = event[0]
    const button = event[1]
    const action = event[2]


    if(action == 4) return

    console.log({remote, button, action})

    const values = {
      2: 1,
      4: 5
    }

    const value = values[button] || 0

    const url = `http://${api}/lights/${room}/brightness/16/${value}`
    console.log(url)
    const response = await fetch(url).then(r=>r.json())
    console.log({response})
  } catch(e) {
    console.log("no valid action")
  }
});
