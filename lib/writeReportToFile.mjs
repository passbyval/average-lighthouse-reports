import { writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'

export const writeReportToFile = async ({ report, name, reportPaths }) => {
  const { dir: parentFolder } = parse(reportPaths[0])
  const filePath = join(parentFolder, name)

  await writeFile(filePath, JSON.stringify(report, null, 2), 'utf8')
}
