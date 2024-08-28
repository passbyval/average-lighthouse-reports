#!/usr/bin/env node
import { Command, Option } from 'commander'

import { DEFAULT_REPORT_NAME } from './lib/constants.mjs'
import packageJson from './package.json' with { type: 'json' }

const { name, description, version } = packageJson

const program = new Command()

program.configureHelp({
  sortOptions: true,
})

program
  .name(name)
  .description(description)
  .version(version, '-v | --version')
  .helpOption('--help | -h')

program
  .option(
    '-d | --directory <path>',
    'A directory of lighthouse reports to average. Defaults to the [directory] provided.',
    async (directory) => {
      const { directoryProcessor } = await import(
        './lib/processors/directory.mjs'
      )

      return directoryProcessor(directory)
    },
  )
  .addOption(
    new Option(
      '-n | --report-name <file-name>',
      'The filename of the averaged report.',
    )
      .default(DEFAULT_REPORT_NAME)
      .implies({
        saveToFile: true,
      }),
  )
  .addOption(
    new Option(
      '-r | --recursive',
      'Whether or not to recurse through the provided [directory]. Otherwise, only the top level reports will be averaged.',
      false,
    ),
  )
  .addOption(
    new Option('-vm | --view-mode <mode>')
      .choices(['terminal', 'browser'])
      .default('terminal'),
  )
  .option(
    '-g | --glob',
    'Whether or not the treat the provided [directory] as a glob.',
    false,
  )
  .option(
    '-s | --save-to-file',
    'Whether or not the report should be saved to disk.',
    true,
  )

const result = await program.parseAsync(process.argv)

const { glob: isGlob, viewMode, saveToFile, ...rest } = result.opts()
const { reportPaths } = await rest.directory

const { averageReports } = await import('./lib/averageReports.mjs')

const averaged = await averageReports({
  reportPaths,
  isGlob,
  ...rest,
})

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
    viewCliReport(averaged)
    break
  }
  case 'browser': {
    const { openWebReport } = await import('./lib/openWebReport.mjs')
    openWebReport(averaged)
  }
}
