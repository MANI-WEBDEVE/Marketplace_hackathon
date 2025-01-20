import { createClient } from 'next-sanity'
import { v4 as uuidv4 } from 'uuid';
import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})



export const createCustomer = async (customerData:any) => {
  try {
    const result = await client.create({
      _type: 'customer',
      ...customerData,
    });
    return result;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
};


export const createOrder = async (orderData:any) => {
  try {
    const orderItemsWithKeys = orderData.orderItems.map((item:any) => ({
      ...item,
      _key: uuidv4(), // Add a unique _key to each order item
    }));

    const result = await client.create({
      _type: 'order',
      ...orderData,
      orderItems: orderItemsWithKeys, // Include updated order items with _key
    });

    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};