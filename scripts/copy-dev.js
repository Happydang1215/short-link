import fs from 'fs-extra'
import chokidar from 'chokidar'

fs.copySync('./src/views', './dist/views')
fs.copySync('./src/public', './dist/public')

const watcher = chokidar.watch(['./src/views','./src/public'], {
  ignored: './src/**/*.ts',
  persistent: true
});

watcher
  .on('all', (event, path) => {
    fs.copySync('./src/views', './dist/views')
    fs.copySync('./src/public', './dist/public')
  })
  // .on('add', path => console.log(`File ${path} has been added`))
  // .on('change', path => {})
  // .on('unlink', path => console.log(`File ${path} has been removed`))
  // .on('addDir', path => console.log(`Directory ${path} has been added`))
  // .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
  // .on('error', error => console.log(`Watcher error: ${error}`))
  // .on('ready', () => console.log('Initial scan complete. Ready for changes'))

  // .on('raw', (event, path, details) => {
  //   log('Raw event info:', event, path, details);
  // });