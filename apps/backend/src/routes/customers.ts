import Router from 'koa-router'
import { getPurchases, getProducts, getCustomers } from '../data'

const router = new Router()

// 고객 목록 API (정렬 포함)
router.get('/', async (ctx) => {
  try {
    const { sortBy, name } = ctx.query
    const purchases = await getPurchases()
    const customers = await getCustomers()
    const products = await getProducts()

    const customerStats: { [key: number]: { count: number; totalAmount: number } } = {}

    purchases.forEach((purchase) => {
      if (!customerStats[purchase.customerId]) {
        customerStats[purchase.customerId] = { count: 0, totalAmount: 0 }
      }
      const product = products.find((p) => p.id === purchase.productId)
      if (product) {
        customerStats[purchase.customerId].count += purchase.quantity
        customerStats[purchase.customerId].totalAmount += purchase.quantity * product.price
      }
    })

    const topCustomers = Object.keys(customerStats).map((id) => {
      const customer = customers.find((c) => c.id === Number(id))
      return {
        id: Number(id),
        name: customer ? customer.name : 'Unknown',
        ...customerStats[Number(id)],
      }
    })

    if (name) {
      if (typeof name !== 'string') {
        ctx.status = 400
        ctx.body = { error: 'Invalid name type parameter.' }
        return
      }
      const filteredCustomers = topCustomers.filter((customer) =>
        customer.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      )
      if (!filteredCustomers.length) {
        ctx.status = 404
        ctx.body = { error: 'Customer not found' }
        return
      }

      if (!sortBy) return (ctx.body = filteredCustomers.sort((a, b) => a.id - b.id))

      if (sortBy === 'asc' || sortBy === 'desc') {
        filteredCustomers.sort((a, b) => {
          const comparison = b.totalAmount - a.totalAmount
          return sortBy === 'asc' ? -comparison : comparison
        })

        ctx.body = filteredCustomers
        return
      }
    }
    if (!sortBy) return (ctx.body = topCustomers.sort((a, b) => a.id - b.id))

    if (sortBy === 'asc' || sortBy === 'desc') {
      topCustomers.sort((a, b) => {
        const comparison = b.totalAmount - a.totalAmount
        return sortBy === 'asc' ? -comparison : comparison
      })
    } else {
      ctx.status = 400
      ctx.body = { error: 'Invalid sortBy parameter. Use "asc" or "desc".' }
      return
    }

    ctx.body = topCustomers
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'An error occurred while processing your request.' }
  }
})

// 특정 고객의 구매 내역 API
router.get('/:id/purchases', async (ctx) => {
  try {
    const customerId = Number(ctx.params.id)

    if (isNaN(customerId)) {
      ctx.status = 400
      ctx.body = { error: 'Invalid customer ID' }
      return
    }

    const customers = await getCustomers()
    const customerExists = customers.some((customer) => customer.id === customerId)

    if (!customerExists) {
      ctx.status = 404
      ctx.body = { error: 'Customer not found' }
      return
    }

    const purchases = await getPurchases()
    const products = await getProducts()

    const customerPurchases = purchases.filter((purchase) => purchase.customerId === customerId)

    const purchaseDetails = customerPurchases.map((purchase) => {
      const product = products.find((p) => p.id === purchase.productId)
      return {
        date: purchase.date,
        quantity: purchase.quantity,
        product: product ? product.name : 'Unknown',
        price: product ? product.price * purchase.quantity : 0,
        imgSrc: product ? product.imgSrc : '',
      }
    })

    ctx.body = purchaseDetails
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'An error occurred while processing your request.' }
  }
})

export default router
