export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule:any) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' }
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image' }]
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }]
      },
      {
        name: 'sizes',
        title: 'Available Sizes',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'stock',
        title: 'Stock',
        type: 'number'
      }
    ]
  }