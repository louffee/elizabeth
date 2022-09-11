import colors from 'colors'

import readConfig from './readConfig'
import identifyPackageManager from './identifyPackageManager'
import scanPackages from './scanPackages'
import PackageShortMetadata from './PackageShortMetadata'
import executePackagesQueue from './executePackagesQueue'

async function rootExecution(): Promise<void> {
  const { script, workspacesFolder } = await readConfig()
  const packageManager = await identifyPackageManager()

  console.log(`⚙️ Configured script to run is ${colors.red(script)}`)
  console.log(`🖥 Configured workspaces folder is ${colors.cyan(workspacesFolder)}`)
  console.log(`📦 Package manager is ${colors.yellow.bold(packageManager)}`)

  console.log('🚀 Starting multi-script process...')

  const packageNamesByDependencyLevel: Record<number, PackageShortMetadata[]> = {}

  await scanPackages(
    async () => {
      await executePackagesQueue({
        packageManager,
        packageNamesByDependencyLevel,
        script,
        baseFolder: workspacesFolder,
      })
    },
    { packageNamesByDependencyLevel, packagesFolder: workspacesFolder, script },
  )
}

export default rootExecution
