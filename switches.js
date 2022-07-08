const switches = {
  32: [1,2,11,12,13,14], //kitchen
  45: [15,18,20], //living room
  44: [23], //oficina lamp
   2: [9,10], //oficina ceiling fan
  18: [16], //bedroom
  47: [16], //bedroom bedside
  19: [22], //quiet light
  34: [3,4,5,6], //dining room
  37: [17,19,21] //sun room
}

const special = {
  18: {
    'single':'special single action',
    'double':'special double action'
  }
}

export default switches

export { special }
