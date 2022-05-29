import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import config from '../config/index.js'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

export interface Link {
  longUrl: string;
  shortKey: string;
  creatTime: Date;
  isDelete: 0 | 1;
}

export interface Data {
  link: Link[];
}

const file = join(config.db.path, 'db.json')

fs.ensureDirSync(config.db.path)

const adapter = new JSONFile<Data>(file)

const db = new Low<Data>(adapter);

(async () => {
  await db.read()

  const data: Data = { link: [] }
  db.data ||= data

  await db.write()
})()


export { db }