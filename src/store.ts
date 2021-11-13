import Configstore from 'configstore'
import fs from 'fs-extra'
import path from 'path'

const pkgPath = path.resolve(__dirname, '../package.json')
const packageJson = fs.readJsonSync(pkgPath, { encoding: 'utf-8' })

export const config = new Configstore(packageJson.name, {})
