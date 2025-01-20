"use client";

import { useEffect, useState } from "react";
import useCustomerData from "@/store/useCustomerData";
import { client } from "@/sanity/lib/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  _id: string;
  
  delieverd: boolean;
  totalPrice: number;
  orderItems: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  _createdAt: string | null;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { customer } = useCustomerData();

  useEffect(() => {
    async function fetchOrders() {
      if (customer?.phone) {
        const query = `*[_type == "order" && customer->phone == "${customer?.phone}"] | order(createdAt desc) {
                    _id,
                    delieverd,
                    totalPrice,
                    orderItems[] {
                            name,
                            price,
                            quantity
                    },
                    _createdAt,
                }`;

        try {
          const result = await client.fetch(query, { phone: customer.phone });
          setOrders(result);
          
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    }

    fetchOrders();
  }, [customer]);

  if (!customer) {
    return <div className="p-4">Please log in to view your orders.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Orders</h1>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
       
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              
              <TableCell>
                {order._createdAt
                  ? new Date(order._createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    order.delieverd
                      ? "text-black bg-green-800"
                      : "bg-yellow-600 text-black"
                  }`}
                >
                  {order.delieverd ? "Delivered" : "transit"}
                </span>
              </TableCell>
              <TableCell>
                {order.orderItems
                  .map((item) => `${item.name} (${item.quantity})`)
                  .join(", ")}
              </TableCell>
              <TableCell className="text-right">
                ${order.totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
