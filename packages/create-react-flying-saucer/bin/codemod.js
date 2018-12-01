#!/usr/bin/env node
const path = require('path')
const { packageJson, uninstall, install } = require('mrm-core')
const { copySync, ensureDirSync, removeSync } = require('fs-extra')

const projectName = process.argv[2]

// Execute in-order
process.chdir(projectName)
replaceDependencies()
replaceScripts()
addTemplates()

function replaceDependencies() {
  uninstall('react-scripts', { dev: false })
  install('react-flying-saucer', { dev: false })
}

function replaceScripts() {
  const file = packageJson()

  if (!file.exists()) {
    console.error('package.json not found!')
    return
  }

  file.setScript('start', 'react-flying-saucer start')
  file.setScript('build', 'react-flying-saucer build')
  file.setScript('test', 'react-flying-saucer test')
  file.removeScript('eject')

  file.unset('eslintConfig')

  file.save()
}

function addTemplates() {
  ensureDirSync('src/features/Main')
  copySync(path.join(__dirname, '../templates/src'), 'src')
  removeSync('src/App.css')
  removeSync('src/logo.svg')
}
