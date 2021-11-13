import chalk from 'chalk'

export const log = (content: string) => {
  console.log(`[${chalk.bold.cyan('npmmirror')}]: ${content}`)
}

export const isString = (obj: any): obj is string => typeof obj === 'string'
