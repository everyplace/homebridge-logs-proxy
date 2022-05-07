# homebridge-logs-proxy
## A simple way of responding to homebridge logs

This project is a companion application to [homebridge-hue-proxy](https://github.com/everyplace/homebridge-hue-proxy), and is designed to be used with [homebridge-pico](https://github.com/rnilssoncx/homebridge-pico)

### Introduction
This is an experimental project, and probably should be packaged up properly as a homebridge plugin. As such, these instructions are rudimentary at best, and brittle.

#### Assumptions
1. You are running homebridge on a device on your lan
1. You have a Philips Hue hub that you use to control Hue accessories
1. You have a Lutron SmartBridge Pro
1. You have some Caseta Pico remotes in your house, specifically the `PJ2-3BRL` 5-button model
1. You want to control your Hue lights with the Caseta remotes



### Installation
1. Clone this repo to the same folder as your homebridge installation: this folder should be a peer of the `homebridge.log` file. `git clone https://github.com/everyplace/homebridge-logs-proxy.git`
1. `cd homebridge-logs-proxy; npm install;`
1. `npm run monitor` to run with nodemon.

### Configuration
This project relies on both a `.env` file (or equivalent environmental variables) and a `switches.js` file to act as a mapping between the id of the Caseta Pico remote (as determined by `homebridge-pico`), and the ids of the lights you'd like the remote to operate on (as determined by your hue hub).

The format of the mapping is a JSON object with a key of the pico id, and the value as an array of hue ids. 

#### Sample switches.js
A sample `switches.js` could look like this:
```javascript
const switches = {
  1: [1,2,3], //pico room 1
  2: [4,5,6], //pico room 2
  3: [1,2,3,4,5,6] //a pico that manipulates many rooms' lights
}

export default switches
```

#### Sample .env
```bash
api="10.0.0.10:3001" #the lan address of your homebridge-hue-proxy running app
```

### Usage
When running, this app monitors the log file found at `../homebridge.log` for changes, parses each new line, and issues a request if it determines that the line matches the correct pattern. The request is sent to the api endpoint specified by the `api` environmental variable, based on the url pattern as defined in [homebridge-hue-proxy](https://github.com/everyplace/homebridge-hue-proxy).
