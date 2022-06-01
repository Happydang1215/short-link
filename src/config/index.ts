import yaml from 'yaml'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, '../../config.yaml')

let config: {
  port: number
  db: {
    path: string
  }
}

if(fs.existsSync(filePath)){
  config = yaml.parse(readFileSync(filePath, 'utf8'))
}else{
  config= {
    port: Number(process.env.port) || 3000,
    db: {
      path: process.env.dbPath || '/link-db'
    }
  }
}



export default {
  ...config
}


