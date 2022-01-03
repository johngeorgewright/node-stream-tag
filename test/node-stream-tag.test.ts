import { Writable } from 'stream'
import { finished } from 'stream/promises'
import stream from '../src/node-stream-tag'

test('template to stream', async () => {
  let output = ''
  await finished(
    stream/*html*/ `
<!DOCTYPE html>
<html>
<head>
  <title>Node.js Stream Tag</title>
</head>
<body>
  <dl>
    <dt>String</dd>
    <dd>${'Foo'}</dd>
    <dt>Number</dt>
    <dd>${1_000}</dd>
    <dt>Promise</dt>
    <dd>${Promise.resolve('promise')}</dd>
    <dt>Undefined</dt>
    <dd>${undefined}</dd>
    <dt>Null</dt>
    <dd>${null}</dd>
  </dl>
</body>
</html>
`.pipe(
      new Writable({
        write(chunk, _, done) {
          output += chunk
          done()
        },
      })
    )
  )
  expect(output).toMatchInlineSnapshot(`
    "
    <!DOCTYPE html>
    <html>
    <head>
      <title>Node.js Stream Tag</title>
    </head>
    <body>
      <dl>
        <dt>String</dd>
        <dd>Foo</dd>
        <dt>Number</dt>
        <dd>1000</dd>
        <dt>Promise</dt>
        <dd>promise</dd>
        <dt>Undefined</dt>
        <dd></dd>
        <dt>Null</dt>
        <dd></dd>
      </dl>
    </body>
    </html>
    "
  `)
})
