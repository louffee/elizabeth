import fs from 'node:fs/promises'

import ElizabethConfig from './ElizabethConfig'

async function readConfig(): Promise<ElizabethConfig> {
  const workspace = process.cwd()
  try {
    const config = await fs.readFile(`${workspace}/.elizabethrc.json`, 'utf-8')

    console.log('👑 Found Elizabeth config file. Using it to configure the workspace multi-script process.')

    return JSON.parse(config) as ElizabethConfig
  } catch {
    console.log('👑 No Elizabeth config file found. Using default configuration.')

    return {
      script: 'build',
      workspacesFolder: 'packages',
    }
  }
}

export default readConfig
