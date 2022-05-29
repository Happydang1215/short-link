import yaml from 'yaml'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, '../../config.yaml')

const configFile = readFileSync(filePath, 'utf8')

const config: {
  port: number
  db: {
    path: string
  }
} = yaml.parse(configFile)

export default {
  ...config
}


