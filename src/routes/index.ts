
import Router from 'koa-router'
import { nanoid } from 'nanoid'
import { db, Link } from '../database/index.js'

const router = new Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.post('/link', async (ctx, next) => {
  const { url: longUrl } = ctx.request.body

  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/

  if (!reg.test(longUrl)) {
    console.log(111)
    ctx.response.status = 400
    return ctx.body = {
      message: 'Invalid URL'
    }
  }
  await db.read()

  const link = db.data?.link

  const item = link?.find((e) => e.longUrl === longUrl)

  if (item) {
    return ctx.body = {
      code:200,
      data: { ...item, shortUrl: `${ctx.origin}/${item.shortKey}` }
    }
  }

  const urlCode = nanoid(10)
  const entity: Link = {
    longUrl,
    shortKey: urlCode,
    creatTime: new Date(),
    isDelete: 0, //是否删除
  }

  link?.push(entity)

  await db.write()

  return ctx.body = {
    code:200,
    data: { ...entity, shortUrl: `${ctx.origin}/${entity.shortKey}` }
  }
})

router.put('/links',async(ctx, next)=>{
  const { shortKey ,isDelete} = ctx.request.body
  await db.read()
  const link = db.data?.link
  const index = link?.findIndex((e) => e.shortKey === shortKey)
  if(index!==undefined && db.data?.link){
    const item= db.data?.link[index]
    item.isDelete=isDelete
  }
  await db.write()
  return ctx.body = {
    code: 200
  }
})

router.get('/getUrls',async(ctx, next)=>{
  await db.read()
  return ctx.body = {
    data:db.data?.link.map((e)=>({...e,shortUrl:`${ctx.origin}/${e.shortKey}`}))
  }
})

router.get('/:code', async (ctx, next) => {
  const { code } = ctx.params

  await db.read()

  const link = db.data?.link
  const item = link?.find((e) => e.shortKey === code)

  if (item && !item.isDelete) {
    ctx.redirect(item.longUrl);
    return
  }
  return ctx.body = {
    code: 404
  }
})

export default router
