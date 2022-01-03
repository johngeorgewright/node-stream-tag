import tsModule from '../src/node-stream-tag'

test("it's a module", () => {
  expect(tsModule()).toBe('I am a TypeScript module')
})
