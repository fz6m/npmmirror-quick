import chalk from 'chalk'
import execa from 'execa'
import { log } from './utils'
import { config } from './store'

export const DOMAIN = `npmmirror`
export const TABAO_URL = `registry.${DOMAIN}.com`
export const TAOBAO_REGISTRY = `https://${TABAO_URL}/`
const AGENTS = ['npm', 'yarn']

const isUpdated = (agent: string) => {
  return config.get(agent)
}

const setUpdated = (agent: string) => {
  config.set(agent, true)
}

const checkAgentExist = async (agentName: string) => {
  try {
    const res = await execa.command(`${agentName} --version`)
    if (res.exitCode === 0) {
      return true
    }
    return false
  } catch {
    return false
  }
}

const setTaobaoRegistry = async (agent: string) => {
  try {
    const res = await execa.command(
      `${agent} config set registry ${TAOBAO_REGISTRY}`
    )
    if (res.exitCode === 0) {
      const agentText = chalk.green(agent)
      log(`${agentText} set new taobao registry success!`)
      setUpdated(agent)
      return
    }
  } catch {}
  const failText = chalk.red(`${agent} set registry failed.`)
  log(failText)
}

export const updateAgentGlobalRegistry = ({
  force = false,
}: {
  force?: boolean
}) => {
  const update = async (agent: string) => {
    if (!force && isUpdated(agent)) {
      return
    }

    const isExist = await checkAgentExist(agent)
    if (!isExist) {
      return
    }

    await setTaobaoRegistry(agent)
  }

  AGENTS.forEach((agent) => {
    update(agent)
  })
}
