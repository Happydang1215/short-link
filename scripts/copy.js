import fs from 'fs-extra'
import chokidar from 'chokidar'

fs.copySync('./src/views', './dist/views')
fs.copySync('./src/public', './dist/public')
