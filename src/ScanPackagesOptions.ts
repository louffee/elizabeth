import type DependencyLevel from './DependencyLevel'
import type PackageShortMetadata from './PackageShortMetadata'

interface ScanPackagesOptions {
  packagesFolder: string
  script: string
  packageNamesByDependencyLevel: Record<DependencyLevel, PackageShortMetadata[]>
}

export default ScanPackagesOptions
