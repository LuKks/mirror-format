const test = require('brittle')
const Localdrive = require('localdrive')
const tmp = require('test-tmp')
const format = require('./index.js')

// Skip due CI is not TTY, avoids any hack

test.skip('basic', async function (t) {
  const src = new Localdrive(await tmp(t))
  const dst = new Localdrive(await tmp(t))

  {
    await src.put('/index.js', 'console.log("Hello World!")')
    await src.put('/test.js', '{}')
    await src.put('/package-lock.json', '{}')

    const mirror = src.mirror(dst)
    const actual = []
    const expected = [
      '\x1B[32m+\x1B[39m \x1B[32m/index.js\x1B[39m \x1B[36m27B\x1B[39m',
      '\x1B[32m+\x1B[39m \x1B[32m/test.js\x1B[39m \x1B[36m2B\x1B[39m',
      '\x1B[32m+\x1B[39m \x1B[32m/package-lock.json\x1B[39m \x1B[36m2B\x1B[39m'
    ]

    for await (const diff of mirror) {
      const formatted = format.diff(diff)

      actual.push(formatted)
    }

    t.alike(actual.sort(), expected.sort())

    t.is(format.count(mirror.count), '\x1B[32m+3\x1B[39m \x1B[31m-0\x1B[39m \x1B[33m~0\x1B[39m')
  }

  {
    await src.put('/index.js', 'console.log("Hello Universe!")')
    await src.put('/test.js', '')
    await src.del('/package-lock.json')

    const mirror = src.mirror(dst)
    const actual = []
    const expected = [
      '\x1B[33m~\x1B[39m \x1B[33m/index.js\x1B[39m \x1B[36m30B\x1B[39m \x1B[32m+3B\x1B[39m',
      '\x1B[33m~\x1B[39m \x1B[33m/test.js\x1B[39m \x1B[36m0B\x1B[39m \x1B[31m-2B\x1B[39m',
      '\x1B[31m-\x1B[39m \x1B[31m/package-lock.json\x1B[39m \x1B[36m2B\x1B[39m'
    ]

    for await (const diff of mirror) {
      const formatted = format.diff(diff)

      actual.push(formatted)
    }

    t.alike(actual.sort(), expected.sort())

    t.is(format.count(mirror.count), '\x1B[32m+0\x1B[39m \x1B[31m-1\x1B[39m \x1B[33m~2\x1B[39m')
  }
})
