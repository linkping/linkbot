import mqtt from 'mqtt'
import { config } from './config.js'
import log from './log.js'

const TOPICS = [
  'door/open'
]

function createMqttClient () {
  const client = mqtt.connect(`tcp://${config.mqtt.host}:${config.mqtt.port}`, {
    clientId: 'linkbot',
    reconnectPeriod: 3000,
    username: config.mqtt.username,
    password: config.mqtt.password
  })

  client.on('connect', () => {
    log.info('mqtt client connected to broker')
    client.on('message', (topic, message) => {
      const data = JSON.parse(message.toString())
      log.info('mqtt message', topic, data)
    })
    client.subscribe(TOPICS, (err) => {
      if (err) log.error('mqtt.subscribe error', err)
    })
  })

  return {
    publish: (topic, message) => {
      client.publish(`linkbot/${topic}`, JSON.stringify(message), { qos: 2 }, (err) => {
        if (err) log.error('mqtt.publish error', err)
      })
    }
  }
}

export default createMqttClient
