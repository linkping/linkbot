import rc from 'rc'

export const config = rc('linkping', {
  bot: {
    channel: '##linkpingdev',
    password: 'fakepassword',
    db: './linkbot-db'
  },
  mqtt: {
    host: 'localhost',
    port: 1883,
    username: 'linkping-mqtt-user',
    password: 'fakepass'
  }
})
