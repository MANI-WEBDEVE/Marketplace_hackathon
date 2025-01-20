"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
interface CartItem {
  id: number;
  name: string;
  details: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartComponent() {
  const { cart, removeFromCart, totalPrice } = useCartStore();
  
 

  
  const deliveryFee = 15;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-500">/</span>
          <span>Cart</span>
        </nav>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <h1 className="mb-6 text-2xl font-extrabold">YOUR CART</h1>
            <div className="space-y-6 rounded-lg border-[1px] border-gray-400/30 p-5">
              {cart.length === 0 && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Your cart is empty.</p>
                </div>
              )}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border-b border-gray-400/30 pb-6"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.color, item.size)
                        }
                        className="text-red-500 hover:text-red-600"
                      >
                        <MdDelete className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="text-sm text-gray-500">{item.color}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xl font-medium">${item.price}</p>

                      <div>Qty :{item.quantity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <h2 className="mb-6 text-2xl font-medium">Order Summary</h2>
            <div className="rounded-xl border-[1px] border-gray-400/30 bg-neutral-300/20 p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${deliveryFee}</span>
                </div>
                <div className="border-t border-gray-400/30 pt-4">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-xl font-medium">
                      ${totalPrice + deliveryFee}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input
                      placeholder="Add promo code"
                      className="flex-1 rounded-full border border-gray-600 bg-transparent py-2 pl-[1.75rem] pr-[5.75rem] text-sm placeholder:text-gray-600 focus:outline-none"
                    />
                    <IoIosPricetag className="absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full bg-black px-5 py-3 text-white"
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
                {cart.length > 0 && (
                  <Link href="/check-out">
                    <Button className="w-full mt-7 rounded-full bg-black py-3 text-white hover:bg-gray-200 hover:text-black">
                      Go to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
