import createMqttClient from './mqtt.js'
const mqtt = createMqttClient()

setTimeout(() => {
  mqtt.publish('door/open', JSON.stringify({ foo: 'bar' }))
}, 2000)
