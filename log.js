function createLogger (who) {
  function log (level) {
    return function () {
      const args = Array.prototype.slice.call(arguments)
      args.unshift('|')
      args.unshift((new Date()).toUTCString())
      args.unshift('|')
      args.unshift(level)
      args.unshift('|')
      args.unshift(who)
      console.log.apply(null, args)
    }
  }
  return {
    info: log('INFO'),
    error: log('ERROR')
  }
}

export default createLogger('linkbot')
