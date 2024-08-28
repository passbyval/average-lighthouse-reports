import { basename } from 'node:path'

import { DEFAULT_REPORT_NAME } from './constants.mjs'

export const prepareReports = async (reports) => {
  const reportPaths = reports.filter((p) => basename(p) !== DEFAULT_REPORT_NAME)

  const reportsFinal = (
    await Promise.all(
      reportPaths.map((path) => import(path, { assert: { type: 'json' } })),
    )
  ).map((r) => r.default)

  const [baseReport] = reportsFinal

  return {
    baseReport,
    reports: reportsFinal,
  }
}
