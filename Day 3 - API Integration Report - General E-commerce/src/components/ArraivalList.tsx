"use client";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import Loader from "./Loader";
import Link from "next/link"
interface NewArrivalDataType {
  _id: number;
  imageUrl: string;
  name: string;
  price: number;
  discountPercent: number;
  description: string;
}

const ArraivalList = () => {
  const [newArrivalData, setNewArrivalData] = useState<NewArrivalDataType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivalData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/new-arrival");

        setNewArrivalData(response.data.data);
      } catch (error) {
        console.error("Error fetching new arrival data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivalData();
  }, []);

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className="w-full">
        <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
          {newArrivalData.map((item) => (
            <Link
              key={item._id}
              href={`/product-details/${item._id}`}
              className="flex w-[280px] flex-shrink-0 snap-start flex-col items-center justify-center rounded-xl bg-gray-50/50 p-3 transition-all duration-300 hover:shadow-md sm:w-full"
            >
              <div className="mb-3 flex w-full justify-center">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={200}
                height={200}
                className="h-[200px] w-full max-w-[200px] rounded-lg object-cover transition-all hover:scale-110"
              />
              </div>
              <div className="w-full text-center">
              <p className="line-clamp-2 flex min-h-[50px] items-center justify-center text-base font-semibold sm:text-lg">
                {item.name}
              </p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <p className="text-lg font-bold text-black">
                ${item.price}
                </p>
                <p className="text-base font-medium text-gray-500 line-through">
                ${item.price + (item.price * item.discountPercent) / 100}
                </p>
                <p className="rounded-full bg-red-400/30 px-2 py-1 text-xs uppercase text-red-400">
                -{item.discountPercent}%
                </p>
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default ArraivalList;
