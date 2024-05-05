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
console.log('Size change:', format.bytes(m))
```

![image_2024-05-03_19-47-30](https://github.com/LuKks/mirror-format/assets/12686176/67659a58-ca88-4607-96d0-1a95a0f12590)

## License

MIT
