import Router from 'koa-router'
import { getPurchases, getProducts } from '../data'

const router = new Router()

router.get('/api/purchase-frequency', async (ctx) => {
  try {
    if (Math.random() <= 1) {
      throw new Error('Intentional error occurred')
    }

    const { from, to } = ctx.query

    if ((from && !to) || (!from && to)) {
      ctx.status = 400
      ctx.body = { error: 'Both from and to must be provided' }
      return
    }

    let fromDate: Date
    let toDate: Date
    if (from && to) {
      if (typeof from !== 'string' || typeof to !== 'string') {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }

      if (isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }

      fromDate = new Date(from)
      toDate = new Date(to)

      if (fromDate > toDate) {
        ctx.status = 400
        ctx.body = { error: 'From date must be before to date' }
        return
      }
    }

    const purchases = await getPurchases()
    const products = await getProducts()

    const priceRanges = [
      { min: 0, max: 20000 },
      { min: 20001, max: 30000 },
      { min: 30001, max: 40000 },
      { min: 40001, max: 50000 },
      { min: 50001, max: 60000 },
      { min: 60001, max: 70000 },
      { min: 70001, max: 80000 },
      { min: 80001, max: 90000 },
      { min: 90001, max: 100000 },
    ]

    const frequency = priceRanges.map((range) => ({ range: `${range.min} - ${range.max}`, count: 0 }))

    purchases
      .filter((purchase) => {
        const purchaseDate = new Date(purchase.date)
        if (fromDate && toDate) return purchaseDate >= fromDate && purchaseDate <= toDate
        return true
      })
      .forEach((purchase) => {
        const product = products.find((p) => p.id === purchase.productId)
        if (product) {
          const productPrice = product.price
          const range = priceRanges.find((r) => productPrice >= r.min && productPrice <= r.max)
          if (range) {
            const rangeIndex = priceRanges.indexOf(range)
            frequency[rangeIndex].count += purchase.quantity
          }
        } else {
          ctx.status = 400
          ctx.body = { error: `Product with ID ${purchase.productId} not found` }
          return
        }
      })

    ctx.body = frequency
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: `An error occurred while processing your request. ${error}` }
  }
})

export default router
