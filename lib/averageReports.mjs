import { averageDisplayValues } from './averageDisplayValues.mjs'
import { averageNumericalValues } from './averageNumericalValues.mjs'
import { prepareReports } from './prepareReports.mjs'

export const averageReports = async ({ reportPaths }) => {
  const { baseReport, reports } = await prepareReports(reportPaths)
  const averaged = averageNumericalValues(baseReport, reports)
  const withDisplay = averageDisplayValues(averaged)

  return withDisplay
}
