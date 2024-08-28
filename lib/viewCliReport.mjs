import ms from 'ms'

import { round } from './util.mjs'

const METRIC_KEYS = [
  { key: 'firstContentfulPaint', type: 'millisecond' },
  { key: 'largestContentfulPaint', type: 'millisecond' },
  { key: 'speedIndex', type: 'millisecond' },
  { key: 'totalBlockingTime', type: 'millisecond' },
  { key: 'cumulativeLayoutShift', type: 'unitless' },
]

const CATEGORY_KEYS = ['performance', 'accessibility', 'best-practices', 'seo']

export const viewCliReport = (report) => {
  const categoryPadding = Math.max(
    ...[...METRIC_KEYS, ...CATEGORY_KEYS].map((k) => k.length),
  )

  const table = {
    ['benchmarkIndex'.padEnd(categoryPadding)]: {
      score: round(report.environment.benchmarkIndex).toString(),
    },
    ...Object.fromEntries(
      CATEGORY_KEYS.map((key) => {
        const { score } = report.categories[key]

        return [
          key.padEnd(categoryPadding),
          {
            score: `${round(score) * 100}%`,
          },
        ]
      }),
    ),
    ...Object.fromEntries(
      METRIC_KEYS.map(({ key, type }) => {
        const score = round(report.audits.metrics.details.items[0][key])

        return [
          key.padEnd(categoryPadding),
          {
            score: `${
              type === 'millisecond'
                ? ms(score, { long: true })
                : score.toString()
            }`,
          },
        ]
      }),
    ),
  }

  console.table(table)
}
