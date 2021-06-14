import { Client } from 'matrix-org-irc'
import { config } from './config.js'
import createMqttClient from './mqtt.js'
import log from './log.js'

const client = new Client('irc.libera.chat', 'linkbot', {
  channels: [config.bot.channel],
  port: 6697,
  nick: 'linkbot',
  userName: 'linkbot',
  realName: 'linkbot',
  password: config.bot.password,
  debug: true,
  autoConnect: false,
  secure: true,
  sasl: true,
  selfSigned: true,
  certExpired: true,
  stripColors: true
})

const say = text => client.say(config.bot.channel, text)
const tell = (who, text) => client.say(who, text)

const mqtt = createMqttClient()

// const publish = (topic, message) => {
//   mqtt.publish(topic, JSON.stringify(message), { qos: 2 }, (err) => {
//     if (err) log.error('mqtt.publish error', err)
//   })
// }

mqtt.on('message', (topic, message) => {
  const data = JSON.parse(message.toString())
  log.info('mqtt message', topic, data)
  if (topic === 'door/open') {
    say(`door opened ${message.toString()}`)
  }
})

client.connect(config.bot.retryConnect, () => {
  log.info('bot connected')
})

client.on('message', (nick, to, text, message) => {
  log.info('message', nick, to, `'${text}'`, message)
  if (/^!help/.test(text)) {
    tell(nick, usage())
  }
})

function usage () {
  return [
    '!help -- this command (well duh)'
  ].join('\n')
}
