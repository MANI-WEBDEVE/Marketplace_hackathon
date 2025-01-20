export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'customer',
        title: 'Customer',
        type: 'reference',
        to: [{ type: 'customer' }],
      },
      {
        name: 'orderItems',
        title: 'Order Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'productId', title: 'Product ID', type: 'string' },
              { name: 'name', title: 'Product Name', type: 'string' },
              { name: 'price', title: 'Price', type: 'number' },
              { name: 'quantity', title: 'Quantity', type: 'number' },
            ],
          },
        ],
      },
      {
        name: 'totalPrice',
        title: 'Total Price',
        type: 'number',
      },
      {
        name: "delieverd",
        title: "Delieverd",
        type: "boolean",
        initialValue: false
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        initialValue: () =>  new Date().toISOString(),
      },
    ],

    initialValue: {
      createdAt: new Date().toISOString(),
    },
  };
  