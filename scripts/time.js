import moment from 'moment-timezone'

const zones = moment.tz.names()

const time = (args = []) => {
  const origWhere = args.join(' ') || 'stockholm'
  const where = origWhere.replace(' ', '_')
  const regex = new RegExp(where, 'gi')

  for (const zone of zones) {
    const found = zone.match(regex)
    if (found) {
      return moment().tz(zone).toString() + ' - ' + zone.replace('_', ' ')
    }
  }

  return `Sorry, couldn't find '${origWhere}'`
}

export default time
