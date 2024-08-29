import chalk from 'chalk'

export const colorize = (displayValue, score) => {
  if (score >= 0.9) return chalk.green(displayValue)
  if (score > 0.5) return chalk.yellow(displayValue)
  return chalk.red(displayValue)
}
