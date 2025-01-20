"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { createCustomer, createOrder } from "@/sanity/lib/client";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";

import {useRouter} from 'next/navigation';
import useCustomerStore from "@/store/useCustomerData";

interface CustomerDetailsType {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

const CheckOutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCartStore();
  const {setCustomer} = useCustomerStore()
  const router = useRouter();
  const [formData, setFormData] = useState<CustomerDetailsType>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const customer = await createCustomer(formData);

      const order = await createOrder({
        customer: {
          _type: "reference",
          _ref: customer._id,
        },
        orderItems: cart.map((item: any) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice,
      });
      setCustomer({
        id: customer._id,
        phone: customer.phone,
        name: customer.name,
           })
      router.push("/order");
      toast.success("Order created successfully");
      clearCart();
    } catch (err) {
      toast.error("Error creating order");
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Checkout
            </h2>
          </div>

          <form onSubmit={handleCheckout} className="space-y-8 px-6 py-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="border-b pb-2 text-xl font-semibold text-gray-800">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="space-y-6">
              <h3 className="border-b pb-2 text-xl font-semibold text-gray-800">
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Information Section */}

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Complete Purchase
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckOutPage;
