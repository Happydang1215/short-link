import Koa from 'koa'
import views from 'koa-views'
import KoaStatic from 'koa-static'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import index from './routes/index.js'
import path from 'path'
import less from 'koa-less'
import { fileURLToPath } from 'url'

const app = new Koa()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(less(__dirname + '/public'));
app.use(KoaStatic(__dirname + '/public'))

app.use(views(__dirname + '/views'))

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app