export default {
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Full Name',
        type: 'string'
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string'
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string'
      },
      {
        name: 'address',
        title: 'Address',
        type: 'object',
        fields: [
          {
            name: 'street',
            title: 'Street',
            type: 'string'
          },
          {
            name: 'city',
            title: 'City',
            type: 'string'
          },
          {
            name: 'state',
            title: 'State',
            type: 'string'
          },
          {
            name: 'pincode',
            title: 'Pincode',
            type: 'string'
          }
        ]
      }
    ]
  }