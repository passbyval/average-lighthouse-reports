import { Command, Option } from 'commander'

import packageJson from '../package.json' with { type: 'json' }
import { DEFAULT_REPORT_NAME } from './constants.mjs'

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
  .requiredOption(
    '-d | --directory <path>',
    'A directory of lighthouse reports to average. Defaults to the [directory] provided.',
    async (directory) => {
      const { directoryProcessor } = await import('./processors/directory.mjs')

      return directoryProcessor(directory, program)
    },
  )
  .addOption(
    new Option(
      '-n | --report-name <file-name>',
      'The filename of the averaged report.',
    ).default(DEFAULT_REPORT_NAME),
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
  .option('-i | --info', 'Prints information about the run.', false)

export { program }
