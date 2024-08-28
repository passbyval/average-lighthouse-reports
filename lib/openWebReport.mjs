import { exec } from 'child_process'

export const openWebReport = (report) => {
  const viewerUrl = (() => {
    const url = new URL('https://googlechrome.github.io/lighthouse/viewer/')

    url.hash = Buffer.from(
      JSON.stringify({
        lhr: report,
      }),
    ).toString('base64')

    return url
  })()

  const openCmd = (() => {
    if (process.platform == 'darwin') return 'open'
    if (process.platform == 'win32') return 'start'
    return 'xdg-open'
  })()

  exec(`${openCmd} ${viewerUrl.toString()}`)
}
