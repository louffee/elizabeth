import $rootExecution from './rootExecution'

import type $DependencyLevel from './DependencyLevel'
import type $ElizabethConfig from './ElizabethConfig'

namespace Elizabeth {
  export type DependencyLevel = $DependencyLevel
  export type ElizabethConfig = $ElizabethConfig

  export const run = $rootExecution
}

export = Elizabeth
