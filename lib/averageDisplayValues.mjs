import ms from 'ms'
import traverse from 'traverse'

import { getKiB, round } from './util.mjs'

export const averageDisplayValues = (report) => {
  return traverse(report).map(function () {
    if (
      this.key === 'displayValue' &&
      this.node.length > 0 &&
      'numericValue' in this.parent.node
    ) {
      const numericValue = round(this.parent.node.numericValue)

      if (this.parent.key === 'uses-long-cache-ttl') {
        return this.update(`${Math.round(numericValue / 1000)} resources found`)
      }

      if (
        this.parent.node.details &&
        'overallSavingsBytes' in this.parent.node.details
      ) {
        return this.update(
          `Potential savings of ${getKiB(
            this.parent.node.details.overallSavingsBytes,
          )}`,
        )
      }

      switch (this.parent.node.numericUnit) {
        case 'millisecond':
          return this.update(`${ms(numericValue, { long: true })}`)
        case 'byte':
          return this.update(`Total size was ${getKiB(numericValue)}`)
        default:
        case 'unitless':
          if (numericValue !== null && numericValue !== '') {
            return this.update(numericValue)
          }
      }
    }
  })
}
