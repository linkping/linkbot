import rc from './rc.js'
import { Client } from 'irc'

const client = new Client('irc.libera.chat', 'linkbot', {
  channels: [rc.channel],
  port: 6697,
  debug: true,
  autoConnect: false,
  secure: true,
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
