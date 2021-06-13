import rc from 'rc'

export const config = rc('linkping', {
  bot: {
    channel: '##linkpingdev',
    retryConnect: 5,
    password: 'fakepassword'
  },
  mqtt: {
    host: 'localhost',
    port: 1883,
    username: 'linkping-mqtt-user',
    password: 'fakepass'
  }
})
