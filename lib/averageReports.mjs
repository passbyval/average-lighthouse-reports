import { averageDisplayValues } from './averageDisplayValues.mjs'
import { averageNumericalValues } from './averageNumericalValues.mjs'
import { prepareReports } from './prepareReports.mjs'

export const averageReports = async ({ reportPaths }) => {
  const { baseReport, reports, ...rest } = await prepareReports(reportPaths)

  return {
    avg: () => {
      const averaged = averageNumericalValues(baseReport, reports)
      return averageDisplayValues(averaged)
    },
    baseReport,
    reports,
    paths: rest.reportPaths,
  }
}
