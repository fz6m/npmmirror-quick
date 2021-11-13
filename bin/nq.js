#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()

const pkg = require('../package.json')
const { run } = require('../dist')

program
  .option(
    '-f, --force',
    'force set new taobao registry for all dependencies agent',
    false
  )
  .action(({ force }) => {
    run({
      force,
    })
  })

program.version(pkg.version)
program.parse(process.argv)
