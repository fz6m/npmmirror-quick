import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { DOMAIN, TAOBAO_REGISTRY } from './agent'
import { isString, log } from './utils'

const ini = require('ini')

export const updateNpmrcFile = ({ force = false }: { force?: boolean }) => {
  const pwd = process.cwd()

  const npmrcPath = path.resolve(pwd, './.npmrc')
  if (!fs.existsSync(npmrcPath)) {
    return
  }

  const npmrcContent = fs.readFileSync(npmrcPath, {
    encoding: 'utf-8',
  })
  const npmrc = ini.parse(npmrcContent)

  const registry = npmrc?.registry as string | undefined

  if (!force) {
    if (!registry || !isString(registry)) {
      return
    }

    // is replaced
    if (~registry.indexOf(DOMAIN)) {
      return
    }

    // not replace company registry
    if (!~registry.indexOf('taobao')) {
      return
    }
  }

  npmrc.registry = TAOBAO_REGISTRY
  fs.writeFileSync(npmrcPath, ini.stringify(npmrc), {
    encoding: 'utf-8',
  })
  log(
    `replace ${chalk.green('.npmrc')} registry to new taobao registry success!`
  )
}
