import objectPath from 'object-path'
import traverse from 'traverse'

const FORBIDDEN_PATHS = [
  'node',
  'boundingRect',
  'nodes',
  'main-thread-tasks',
  'long-tasks',
  'configSettings',
]

const INCLUSION_LIST = ['environment', 'audits', 'categories']

export const averageNumericalValues = (baseReport, allReports) => {
  return traverse(baseReport, { immutable: true }).map(function (value) {
    if (this.path.some((p) => FORBIDDEN_PATHS.includes(p))) return
    if (this.path.some((p) => !INCLUSION_LIST.includes(p))) return

    const isPercent = this.key === 'percent'

    if (typeof value === 'number' || isPercent) {
      const average =
        allReports.reduce((acc, r) => {
          const val = objectPath.get(r, this.path)
          return acc + isPercent ? parseInt(val) : val
        }, 0) / allReports.length

      return this.update(isPercent ? `${average}%` : average)
    }
  })
}
