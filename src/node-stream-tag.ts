import { Readable } from 'stream'

export default function stream(
  strings: TemplateStringsArray,
  ...expressions: Array<
    Stringable | null | undefined | Promise<Stringable | null | undefined>
  >
) {
  return Readable.from(
    (async function* () {
      for (let i = 0; i < strings.length; i++) {
        yield strings[i]
        yield ((await expressions[i]) ?? '').toString()
      }
    })()
  )
}

export interface Stringable {
  toString(): string
}
