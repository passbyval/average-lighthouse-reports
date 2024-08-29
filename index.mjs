#!/usr/bin/env node
import { basename } from 'node:path'

import { program } from './lib/program.mjs'

const result = await program.parseAsync(process.argv)

const { glob: isGlob, viewMode, saveToFile, ...rest } = result.opts()
const { reportPaths, directory } = await rest.directory

const { averageReports } = await import('./lib/averageReports.mjs')

const { avg, paths } = await averageReports({
  reportPaths,
  isGlob,
  ...rest,
})

if (rest.info) {
  const { default: Table } = await import('cli-table3')

  const table = new Table({
    head: [{ colSpan: 2, content: rest.reportName }],
  })

  table.push(
    ['Created', new Date().toLocaleString()],
    ['Directory', directory],
    ['Inputs', paths.map((p) => basename(p)).join('\n')],
  )

  console.log(table.toString())
}

const averaged = avg()

if (saveToFile) {
  const { writeReportToFile } = await import('./lib/writeReportToFile.mjs')
  await writeReportToFile({
    report: averaged,
    reportPaths,
    name: rest.reportName,
  })
}

switch (viewMode) {
  default:
  case 'terminal': {
    const { viewCliReport } = await import('./lib/viewCliReport.mjs')
    await viewCliReport(averaged)
    break
  }
  case 'browser': {
    const { openWebReport } = await import('./lib/openWebReport.mjs')
    openWebReport(averaged)
  }
}
