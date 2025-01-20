import { defineType } from "sanity"
export default defineType({
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Full Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule) => Rule.email().error('Please enter a valid email'),
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      {
        name: 'state',
        title: 'State',
        type: 'string',
      },
    ],
  });
  