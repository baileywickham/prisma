import { BasicBuilder } from './BasicBuilder'
import type { KeyType } from './KeyType'
import { Writer } from './Writer'

export abstract class TypeBuilder implements BasicBuilder {
  // TODO(@SevInf): this should be replaced with precedence system that would
  // automatically add parenthesis where they are needed
  needsParenthesisWhenIndexed = false
  needsParenthesisInKeyof = false
  needsParenthesisInUnion = false
  needsParenthesisInIntersection = false

  abstract write(writer: Writer): void

  subKey(key: string): KeyType {
    // TODO: since we translating ESM to CommonJS during bundling, we
    // can't handle circular dependencies the same way ESM does. We have to delay KeyType import
    // to resolve it. Once we stop doing this, we can move this import to top of the file.
    const { KeyType } = require('./KeyType')
    return new KeyType(this, key)
  }

  writeIndexed(writer: Writer) {
    if (this.needsParenthesisWhenIndexed) {
      writer.write('(')
    }

    writer.write(this)

    if (this.needsParenthesisWhenIndexed) {
      writer.write(')')
    }
  }
}
