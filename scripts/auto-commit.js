#!/usr/bin/env node
const { exec } = require('child_process')
const chokidar = require('chokidar')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')

let timeout = null
const DEBOUNCE_MS = 1200

function run(cmd, cb) {
  exec(cmd, { cwd: repoRoot }, (err, stdout, stderr) => {
    if (err) return cb(err, stdout, stderr)
    cb(null, stdout, stderr)
  })
}

function tryCommit() {
  // stage everything
  run('git add -A', (err) => {
    if (err) {
      console.warn('git add failed:', err.message)
      return
    }

    const msg = `Auto commit: ${new Date().toISOString()}`
    run(`git commit -m "${msg}"`, (err, out, errout) => {
      if (err) {
        // nothing to commit is not an error we need to worry about
        const text = (out || '') + (errout || '')
        if (text.includes('nothing to commit')) return
        console.warn('git commit failed:', err.message)
        return
      }
      console.log('Auto-commit created:', msg)
    })
  })
}

const watcher = chokidar.watch(repoRoot, {
  ignored: [
    /node_modules/, /\.git/, /dist/, /build/, /\.vite/, /\.DS_Store/, /package-lock.json/
  ],
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 100 }
})

watcher.on('all', (event, pathChanged) => {
  // debounce rapid saves
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    tryCommit()
  }, DEBOUNCE_MS)
})

process.on('SIGINT', () => {
  console.log('\nStopping auto-commit watcher')
  watcher.close().then(() => process.exit(0))
})

console.log('Auto-commit watcher running — staging and committing changes with a short debounce')
