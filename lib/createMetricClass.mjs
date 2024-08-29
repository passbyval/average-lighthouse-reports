import { capitalCase, kebabCase } from 'change-case'
import Immutable from 'seamless-immutable'

import { colorize } from './colorize.mjs'

export const createMetricClass = (report) => {
  return class Metric {
    constructor(key) {
      const { audits } = Immutable(report)
      const {
        score,
        title = capitalCase(key),
        displayValue,
      } = audits[kebabCase(key)]

      this.title = title
      this.score = score
      this.displayValue = displayValue
    }

    toString() {
      return [this.title, colorize(this.displayValue, this.score)]
    }
  }
}
