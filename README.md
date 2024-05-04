# mirror-format

Formatting for MirrorDrive diffing and count

```
npm i mirror-format
```

## Usage

```js
const format = require('mirror-format')
const MirrorDrive = require('mirror-drive')

const m = new MirrorDrive(src, dst)

for await (const diff of m) {
  console.log(format.diff(diff))
}

console.log('Total files:', m.count.files, '(' + format.count(m.count) + ')')
```

## License

MIT
