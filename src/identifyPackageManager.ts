import fs from 'node:fs/promises'

import type PackageManagerStrict from './PackageManagerStrict'

async function identifyPackageManager(): Promise<PackageManagerStrict> {
  let pm: PackageManagerStrict | undefined
  const workspace = process.cwd()

  try {
    await fs.access(`${workspace}/yarn.lock`)
    pm = 'yarn'
  } catch {}

  try {
    await fs.access(`${workspace}/pnpm-lock.yaml`)
    pm = 'pnpm'
  } catch {}

  try {
    await fs.access(`${workspace}/package-lock.json`)
    pm = 'npm'
  } catch {}

  if (!pm) {
    console.log(
      '🧱 No package manager could be found. By default Louffee’s Elizabeth uses Yarn as package manager. We will proceed with it, but if you want to change, just create the lockfile of your preferred package manager and we take care of the busy work ☺️.',
    )
    pm = 'yarn'
  }

  return pm
}

export default identifyPackageManager
