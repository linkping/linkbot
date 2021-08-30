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

const notice = (text) => client.notice(config.bot.channel, text)
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
    notice(`door opened ${message.toString()}`)
  }
})

client.connect(() => log.info('bot connected'))

// Remove all event handlers for close and timeout to skip retry logic
client.conn.removeAllListeners('close')
client.conn.removeAllListeners('timeout')

client.conn.addListener('close', () => {
  log.info('got close event, restarting')
  process.exit(0)
})

client.conn.addListener('timeout', () => {
  log.info('got timeout event, restarting')
  process.exit(0)
})

client.on('message', (nick, to, text, message) => {
  log.info('message', nick, to, `'${text}'`, message)
  if (/^!help/.test(text)) {
    tell(nick, usage())
  } else if (/^!ping/.test(text)) {
    notice('pong')
  } else if (/^!/.test(text)) {
    tell(nick, `unknown command: '${text}'`)
  }
})

function usage () {
  return [
    '!help -- this command (well duh)'
  ].join('\n')
}
