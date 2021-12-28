import { Client } from 'matrix-org-irc'
import getUrls from 'get-urls'
import { config } from './config.js'
import createMqttClient from './mqtt.js'
import log from './log.js'
import { getArgs } from './util.js'

import idea from './scripts/idea.js'
import time from './scripts/time.js'
import getTitle from './scripts/title.js'

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

const publish = (topic, message = '') => {
  mqtt.publish(topic, JSON.stringify(message), { qos: 2 }, (err) => {
    if (err) log.error('mqtt.publish error', err)
  })
}

mqtt.on('message', (topic, message) => {
  const data = JSON.parse(message.toString())
  log.info('mqtt message', topic, data)
  // if (topic === 'door/open') {
  //   notice(`door opened ${message.toString()}`)
  // }
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

client.on('message', async (nick, to, text, message) => {
  log.info('message', nick, to, `'${text}'`, message)
  const args = getArgs(text)
  if (isOp(nick) && /^!close/.test(text)) {
    publish('linkping/close')
    notice('we\'re closed!')
  } else if (/^!help/.test(text)) {
    tell(nick, usage())
  } else if (/^!idea/.test(text)) {
    notice(idea())
  } else if (isOp(nick) && /^!open/.test(text)) {
    publish('linkping/open')
    notice('we\'re open!')
  } else if (/^!ping/.test(text)) {
    notice('pong')
  } else if (/^!time/.test(text)) {
    notice(time(args))
  } else if (/^!/.test(text)) {
    tell(nick, `unknown command: '${text}'`)
  } else {
    // Actions on message content etc.
    for (const url of getUrls(text)) {
      try {
        const title = await getTitle(url)
        if (typeof title === 'string') {
          notice(`${nick} linked -> '${title.trim()}'`)
        }
      } catch (err) {
        log.error('Failed to get title for url', url)
      }
    }
  }
})

function isOp (nick) {
  return [
    'rtn',
    'gnyrfta'
  ].includes(nick)
}

function usage () {
  return [
    '!close      -- mark space as closed in spaceapi (op)',
    '!help       -- this command (well duh)',
    '!idea       -- random idea',
    '!open       -- mark space as open in spaceapi (op)',
    '!time [arg] -- show time for a timezone'
  ].join('\n')
}
