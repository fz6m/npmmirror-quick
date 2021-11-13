import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { TABAO_URL } from './agent'
import { log } from './utils'
import { getPackages } from '@manypkg/get-packages'

const OLD_REGISTRYS = ['registry.npm.taobao.org', 'registry.nlark.com']
const LOCK_FILES = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml']

export const updateLockFiles = async () => {
  const cwd = process.cwd()

  const update = async (filePath: string) => {
    if (!fs.existsSync(filePath)) {
      return
    }

    let content = fs.readFileSync(filePath, { encoding: 'utf-8' })
    let isReplaced = false
    OLD_REGISTRYS.forEach((registry) => {
      const reg = new RegExp(registry, 'gi')
      if (~content.indexOf(registry)) {
        isReplaced = true
      }
      content = content.replace(reg, TABAO_URL)
    })
    const filename = path.basename(filePath)
    const filenameText = chalk.green(filename)
    if (!isReplaced) {
      log(`in ${filenameText} no old taobao registry. not need replace.`)
      return
    }

    fs.writeFileSync(filePath, content, { encoding: 'utf-8' })
    log(
      `replace ${filenameText} to new taobao registry success, please run install command check dependencies.`
    )
  }

  const allPakcages = await getPackages(cwd)
  LOCK_FILES.forEach((filename) => {
    const rootFilePath = path.resolve(cwd, filename)
    const allProjectFilePath = [rootFilePath]
    // if monorepo
    if (allPakcages.tool !== 'root') {
      allPakcages.packages.forEach(({ dir }) => {
        const lockFilePath = path.resolve(dir, filename)
        allProjectFilePath.push(lockFilePath)
      })
    }
    allProjectFilePath.forEach((filePath) => {
      update(filePath)
    })
  })
}
