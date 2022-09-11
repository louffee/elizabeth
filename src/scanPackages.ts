import fs from 'node:fs'

import type ScanPackagesOptions from './ScanPackagesOptions'
import type PackageJsonWithDependencyLevel from './PackageJsonWithDependencyLevel'

const METADATA_PLACEHOLDER_KEY = '{{PACKAGE_META_NAME}}'

async function scanPackages(
  callback: () => Promise<void>,
  { packagesFolder, script, packageNamesByDependencyLevel }: ScanPackagesOptions,
) {
  const baseFolderPath = `${process.cwd()}/${packagesFolder}`
  const metaPathname = `${baseFolderPath}/${METADATA_PLACEHOLDER_KEY}/package.json`

  console.log('🧭 Scanning packages...')

  fs.readdir(baseFolderPath, (err, folderPackageNames) => {
    if (err) {
      if (err) {
        console.log(`🪣 Could not read the ${packagesFolder} folder due to the following error`, err)
        return
      }

      if (folderPackageNames.length === 0) {
        console.log(`🪣 No package could have been found inside the "${packagesFolder}" folder.`)
        return
      }

      for (const folderName in folderPackageNames) {
        const packageMetadataFilename = metaPathname.replace(METADATA_PLACEHOLDER_KEY, folderName)
        const packageMetadata = require(packageMetadataFilename) as PackageJsonWithDependencyLevel

        if (
          // If the package has dependencyLevel but not the necessary script
          typeof packageMetadata?.dependencyLevel === 'number' &&
          !packageMetadata?.scripts?.[script]
        ) {
          console.log(
            `🪣 The package "${folderName}" has a dependencyLevel field but no "${script}" script. Either declare a build script or remove the dependencyLevel field from its package.json file. We will ignore this package.`,
          )
          continue
        }

        const packageName = packageMetadata.name
        const packageDependencyLevel = packageMetadata.dependencyLevel

        if (typeof packageName !== 'string') {
          console.log(
            `🪣 The package in the folder "${packagesFolder}/${folderName}" does not have a name. Please declare it in order to execute the script. We will ignore this package.`,
          )
          continue
        }

        if (!packageDependencyLevel) {
          console.log(
            `🪣 The package "${packageName}" does not have a dependencyLevel field. Please declare it in order to execute the script. We will ignore this package.`,
          )
          continue
        }

        if (!packageNamesByDependencyLevel[packageDependencyLevel]) {
          packageNamesByDependencyLevel[packageDependencyLevel] = []
        }

        packageNamesByDependencyLevel[packageDependencyLevel!].push({ folderPackageName: folderName, packageName })
        console.log(`🔎 Detected package "${packageName}" with dependency level ${packageDependencyLevel}`)
      }
    }

    if (typeof callback === 'function') {
      callback()
    }
  })
}

export default scanPackages
