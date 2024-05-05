const crayon = require('tiny-crayon')
const byteSize = require('tiny-byte-size')

const OP_COLORS = { add: 'green', remove: 'red', change: 'yellow' }
const DIFF_COLORS = { more: 'green', less: 'red', same: 'gray' }
const SYMBOLS = { add: '+', remove: '-', change: '~' }

exports.diff = function mirrorFormatDiff (diff) {
  const color = OP_COLORS[diff.op]
  const symbol = SYMBOLS[diff.op]

  let bytes = null
  if (diff.op === 'add') bytes = byteSize(diff.bytesAdded)
  else if (diff.op === 'remove') bytes = byteSize(diff.bytesRemoved)
  else bytes = byteSize(diff.bytesAdded)

  bytes = crayon.cyan(bytes)

  if (diff.op === 'change') {
    bytes += ' ' + exports.bytes(diff)
  }

  return crayon[color](symbol) + ' ' + crayon[color](diff.key) + ' ' + bytes
}

exports.count = function mirrorFormatCount (count) {
  return crayon.green('+' + count.add) + ' ' + crayon.red('-' + count.remove) + ' ' + crayon.yellow('~' + count.change)
}

exports.bytes = function (diff) {
  const d = diff.bytesAdded - diff.bytesRemoved
  const symbol = d > 0 ? '+' : ''
  const type = d > 0 ? 'more' : (d < 0 ? 'less' : 'same')
  const color = DIFF_COLORS[type]

  return crayon[color](symbol + byteSize(d))
}
