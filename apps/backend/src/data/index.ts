import fs from 'fs'
import path from 'path'

// Define types
export interface Product {
  id: number
  name: string
  price: number
  imgSrc: string
}

export interface Purchase {
  productId: number
  customerId: number
  quantity: number
  date: string
}

export interface Customer {
  id: number
  name: string
}

// Load JSON data
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const purchasesFilePath = path.resolve(__dirname, '../data/purchases.json')
const customersFilePath = path.resolve(__dirname, '../data/customers.json')

export const getProducts = async (): Promise<Product[]> => {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
}

export const getPurchases = async (): Promise<Purchase[]> => {
  return JSON.parse(fs.readFileSync(purchasesFilePath, 'utf-8'))
}

export const getCustomers = async (): Promise<Customer[]> => {
  return JSON.parse(fs.readFileSync(customersFilePath, 'utf-8'))
}
