import mqtt from 'mqtt'
import { v4 as uuidv4 } from 'uuid'
import { config } from './config.js'
import log from './log.js'

const TOPICS = [
  'door/open'
]

function createMqttClient () {
  const client = mqtt.connect(`tcp://${config.mqtt.host}:${config.mqtt.port}`, {
    clientId: `linkbot-${uuidv4()}`,
    reconnectPeriod: 3000,
    username: config.mqtt.username,
    password: config.mqtt.password
  })

  client.on('connect', () => {
    log.info('mqtt client connected to broker')
    client.subscribe(TOPICS, (err) => {
      if (err) log.error('mqtt.subscribe error', err)
    })
  })

  return client
}

export default createMqttClient
