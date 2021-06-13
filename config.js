import rc from 'rc'

export const config = rc('linkping', {
  bot: {
    channel: '##linkpingdev',
    retryConnect: 5,
    password: 'fakepassword'
  }
})
