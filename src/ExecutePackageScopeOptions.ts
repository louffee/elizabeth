import type PackageManagerStrict from './PackageManagerStrict'

interface ExecutePackageScopeOptions {
  folderPackageName: string
  packageName: string
  script: string
  packageManager: PackageManagerStrict
}

export default ExecutePackageScopeOptions
