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

const mqtt = createMqttClient()

const say = text => client.say(config.bot.channel, text)

client.connect(config.bot.retryConnect, () => {
  log.info('bot connected')
})

client.on('message', (nick, to, text, message) => {
  log.info('message', nick, to, text, message)
  if (text.startsWith('linkbot')) {
    say('hello')
  }
})
