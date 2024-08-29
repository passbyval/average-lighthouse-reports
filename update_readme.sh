#!/usr/bin/env bash

truncate -s 0 README.md
echo "# average-lighthouse-reports\n\n\n\n\`\`\`shell" > README.md
node index.mjs --help >> README.md && echo "\`\`\`" >> README.md
npx prettier --write README.md
cat README.md
