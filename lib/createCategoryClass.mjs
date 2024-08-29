import boxen from 'boxen'
import { capitalCase, kebabCase } from 'change-case'
import Immutable from 'seamless-immutable'

import { colorize } from './colorize.mjs'

export const createCategoryClass = (report) => {
  return class Category {
    constructor(key) {
      const { categories } = Immutable(report)
      const { score, title = capitalCase(key) } = categories[kebabCase(key)]

      this.score = score
      this.title = title
      this.displayValue = `${score * 100}%`
    }

    get colorized() {
      return colorize(this.displayValue, this.score)
    }

    toString() {
      return boxen(this.colorized, {
        padding: 1,
        title: this.title,
        titleAlignment: 'center',
        textAlignment: 'center',
      })
    }
  }
}
