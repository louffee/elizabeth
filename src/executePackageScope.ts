import { exec } from 'node:child_process'

import type ExecutePackageScopeOptions from './ExecutePackageScopeOptions'
import PackageManagerStrict from './PackageManagerStrict'

const commandPatternByPackageManager: { [K in PackageManagerStrict]: string } = {
  npm: 'npm run {{SCRIPT}} --workspace {{PACKAGE_NAME}}',
  yarn: 'yarn workspace {{PACKAGE_NAME}} run {{SCRIPT}}',
  pnpm: 'pnpm run {{SCRIPT}} --workspace {{PACKAGE_NAME}}',
}

async function executePackageScope({
  packageName,
  packageManager,
  script,
  folderPackageName,
}: ExecutePackageScopeOptions): Promise<void> {
  if (!folderPackageName) {
    return
  }

  return new Promise<void>((resolve) => {
    console.log(`🎁 Executing '${script}' in '${packageName}'...`)

    const command = commandPatternByPackageManager[packageManager]
      .replace('{{SCRIPT}}', script)
      .replace('{{PACKAGE_NAME}}', packageName)

    exec(command, (err) => {
      if (err) {
        console.log(
          `🔥 Could not execute "${script}" inside of the package "${packageName}" due to the following error`,
          err,
        )
        resolve()
      }

      console.log(`📦 Finished executing '${script}' in '${packageName}'`)
      resolve()
    })
  })
}

export default executePackageScope
