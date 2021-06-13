import { config } from './config.js'
import { Client } from 'matrix-org-irc'

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

client.connect(config.bot.retryConnect, () => {
  console.log('bot connected')
})

client.on('message', (nick, to, text, message) => {
  console.log('message', nick, to, text, message)
  if (text.startsWith('linkbot')) {
    say('hello')
  }
})
