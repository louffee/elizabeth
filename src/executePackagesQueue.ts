import DependencyLevel from './DependencyLevel'
import executePackageScope from './executePackageScope'
import type ExecutePackagesQueueOptions from './ExecutePackagesQueueOptions'

async function executePackagesQueue({
  packageManager,
  script,
  packageNamesByDependencyLevel,
  baseFolder,
}: ExecutePackagesQueueOptions) {
  const dependencyLevels = Object.keys(packageNamesByDependencyLevel)

  if (dependencyLevels.length === 0) {
    console.log(
      `\n🪣 No package could have been found inside the "${baseFolder}" folder. Was the function scanPackages() invoked? We need it :/`,
    )
    return
  }

  for (const dependencyLevel of dependencyLevels) {
    const packages = packageNamesByDependencyLevel[dependencyLevel as unknown as DependencyLevel]

    if (!packages) {
      continue
    }

    for (const { folderPackageName, packageName } of packages) {
      await executePackageScope({ packageName, script, packageManager, folderPackageName: folderPackageName })
    }
  }
}

export default executePackagesQueue
