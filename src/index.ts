import { updateAgentGlobalRegistry } from './agent'
import { updateLockFiles } from './lock'
import { updateNpmrcFile } from './npmrc'

export const run = ({ force = false }: { force?: boolean }) => {
  updateAgentGlobalRegistry({ force })
  updateNpmrcFile({ force })
  updateLockFiles()
}
