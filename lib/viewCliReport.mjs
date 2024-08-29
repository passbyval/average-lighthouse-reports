import { INVISIBLE_BORDERS } from './constants.mjs'
import { createCategoryClass } from './createCategoryClass.mjs'
import { createMetricClass } from './createMetricClass.mjs'

export const viewCliReport = async (report) => {
  const { default: Table } = await import('cli-table3')

  const Category = createCategoryClass(report)
  const Metric = createMetricClass(report)

  const performanceTable = new Table({
    wordWrap: false,
    wrapOnWordBoundary: false,
    style: {
      border: [],
    },
    chars: INVISIBLE_BORDERS,
  })

  const metricTable = new Table({
    wordWrap: true,
    wrapOnWordBoundary: true,
    style: {
      border: [],
    },
  })

  const categories = ['performance', 'accessibility', 'seo', 'best-practices']

  const boxes = categories.map((key) =>
    new Category(key, categories.length).toString(),
  )

  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'speed-index',
    'total-blocking-time',
    'cumulative-layout-shift',
  ].map((key) => new Metric(key).toString())

  performanceTable.push([{ content: 'Categories', colSpan: 4 }], boxes)
  metricTable.push([{ content: 'Metrics', colSpan: 2 }], ...metrics)

  console.log(`\n${performanceTable.toString()}\n`)
  console.log(metricTable.toString())
}
