import rc from './rc.js'
import { Client } from 'matrix-org-irc'

const client = new Client('irc.libera.chat', 'linkbot', {
  channels: [rc.channel],
  port: 6697,
  nick: 'linkbot',
  userName: 'linkbot',
  realName: 'linkbot',
  password: rc.password,
  debug: true,
  autoConnect: false,
  secure: true,
  sasl: true,
  selfSigned: true,
  certExpired: true,
  stripColors: true
})

const say = text => client.say(rc.channel, text)

client.connect(rc.retryConnect, () => {
  console.log('bot connected')
})

client.on('message', (nick, to, text, message) => {
  console.log('message', nick, to, text, message)
  if (text.startsWith('linkbot')) {
    say('hello')
  }
})
