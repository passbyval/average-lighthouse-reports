import { CommanderError, InvalidOptionArgumentError } from 'commander'

export const directoryProcessor = async (directory, program) => {
  const { access, constants } = await import('node:fs/promises')

  if (!directory) {
    throw new InvalidOptionArgumentError('Empty directory supplied.')
  }

  try {
    await access(directory, constants.R_OK | constants.W_OK)
  } catch (error) {
    throw new InvalidOptionArgumentError('Invalid directory supplied.', {
      cause: error,
    })
  }

  const { glob } = await import('glob')
  const { recursive } = program.opts()

  const reportPaths = await glob(
    `${directory}${recursive ? '/**/*' : '/*'}.json`,
  )

  if (!reportPaths.length) {
    throw new CommanderError(
      'Provided directory has no available Lighthouse reports.',
    )
  }

  return {
    directory,
    reportPaths,
  }
}
