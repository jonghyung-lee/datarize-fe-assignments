import Koa from 'koa'
import path from 'path'
import Router from 'koa-router'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import customerRoutes from './routes/customers'
import purchaseFrequencyRoutes from './routes/purchaseFrequency'
import cors from '@koa/cors'

const app = new Koa()
const router = new Router()

const staticDirPath = path.join(__dirname, '../assets')

router.use('/api/customers', customerRoutes.routes()).use(customerRoutes.allowedMethods())
router.use(purchaseFrequencyRoutes.routes()).use(purchaseFrequencyRoutes.allowedMethods())

app.use(serve(staticDirPath))
app.use(cors())
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
