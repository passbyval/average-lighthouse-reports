# average-lighthouse-reports
Small CLI tool to create averages of multiple Lighthouse reports

```shell
  --help | -h                     display help for command
  -d | --directory <path>         A directory of lighthouse reports to average. Defaults to
                                  the [directory] provided.
  -g | --glob                     Whether or not the treat the provided [directory] as a
                                  glob. (default: false)
  -i | --info                     Prints information about the run. (default: false)
  -n | --report-name <file-name>  The filename of the averaged report. (default:
                                  "averaged-report.json")
  -r | --recursive                Whether or not to recurse through the provided
                                  [directory]. Otherwise, only the top level reports will
                                  be averaged.
  -s | --save-to-file             Whether or not the report should be saved to disk.
                                  (default: true)
  -v | --version                  output the version number
  -vm | --view-mode <mode>         (choices: "terminal", "browser", default: "terminal")
```
