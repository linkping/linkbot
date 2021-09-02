import test from 'ava'
import { getArgs } from './util.js'

test('command arguments', t => {
  t.deepEqual(getArgs(), [])
  t.deepEqual(getArgs(''), [])
  t.deepEqual(getArgs('!foo'), [])
  t.deepEqual(getArgs('!foo '), [])
  t.deepEqual(getArgs('!foo bar'), ['bar'])
  t.deepEqual(getArgs('!foo   bar'), ['bar'])
  t.deepEqual(getArgs(' !foo   bar '), ['bar'])
  t.deepEqual(getArgs(' !foo   bar  baz'), ['bar', 'baz'])
})
