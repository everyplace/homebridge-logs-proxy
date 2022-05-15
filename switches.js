const switches = {
  32: [1,2,11,12,13,14], //kitchen
  45: [15,18,20], //living room
  44: [23], //oficina lamp
   2: [9,10], //oficina ceiling fan
  18: [16], //bedroom
  19: [22], //quiet light
  34: [3,4,5,6], //dining room
  37: [17,19,21] //sun room
}

const overrides = [
  {"switch":18, "method": "single", action: 'saturation', value:140},
  {"switch":18, "method": "double", action: 'saturation', value:0}
]

const override = (id, method) => {
  const config = overrideConfig.filter((row)=>{
    return row.switch === id && row.method === method
  })
  if(config.length === 0) throw new Error('No override available')
  return config
}

export default switches

export { switches, override }
