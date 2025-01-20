import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import customer from './customer'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, customer, order],
}