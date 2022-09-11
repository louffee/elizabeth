import type PackageShortMetadata from './PackageShortMetadata'
import type PackageManagerStrict from './PackageManagerStrict'
import type DependencyLevel from './DependencyLevel'

interface ExecutePackagesQueueOptions {
  script: string
  packageManager: PackageManagerStrict
  packageNamesByDependencyLevel: Record<DependencyLevel, PackageShortMetadata[]>
  baseFolder: string
}

export default ExecutePackagesQueueOptions
