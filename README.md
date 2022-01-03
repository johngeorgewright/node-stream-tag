# node-stream-tag

Template tag for streaming content. Template parts must be "stringable" or a promise of something "stringable". The strings will be pushed on to the stream as soon as they are available.

## Example

```typescript
import { Server } from 'http'
import { Readable } from 'stream'
import { setTimeout } from 'timers/promises'
import stream from 'node-stream-tag'

const server = new Server((_, res) => {
  const secs = 2
  stream`<!DOCTYPE html>
<html>
  <head>
    <title>Streaming tagged templates</title>
</head>
<body>
  <p>
    I will now wait for ${secs} secs then say hello... ${hello(secs)}
  </p>
</body>
</html>`.pipe(res)
}).listen(3_000, () => console.info('server listening on', server.address()))

async function hello(secs: number) {
  await setTimeout(secs * 1_000)
  return '<b>Hello</b>'
}
```

The above example will immediately push a string on to the response, and then will wait for 2secs before finishing.

**When using promises, you must ensure that handle errors correctly, otherwise your stream may break.**
