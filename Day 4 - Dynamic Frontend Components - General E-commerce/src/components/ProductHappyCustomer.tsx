"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import ArraivalList from "./ArraivalList";
import { client } from "@/sanity/lib/client";
import Loader from "./Loader";
import Link from "next/link";
import Image from "next/image";
interface CategoryDataType {
  _id: number;
  imageUrl: string;
  name: string;
  price: number;
  discountPercent: number;
  description: string;
}

const HappyCustomers = ({ categoryTag }: { categoryTag: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data =
          await client.fetch(`*[_type=="products" && category=="${categoryTag}"][0..7]{
          _id,
          name,
          price,
          "imageUrl" : image.asset->url,
          category,
          discountPercent,
          }`);
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryTag) {
      fetchCategoryData();
    }
  }, []);

  return (
    <section className="w-full px-4 py-10 sm:px-8 sm:py-16 md:px-16 lg:px-28 lg:py-20">
      <div className="mb-10 mt-10 flex w-full flex-col items-center justify-center">
        <h2 className="mb-7 text-center text-4xl font-extrabold uppercase">
          You Might Also Like
        </h2>
        {

          
          isLoading ? (
            <Loader />) : (
        <div className="w-full">
          <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
            {categoryData.map((item:CategoryDataType) => (
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
                  <p className="line-clamp-2 flex min-h-[50px] items-center justify-center text-base font-medium sm:text-lg">
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
      }
      </div>
      <div className="mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4 lg:mb-10">
        <h2 className="flex items-center gap-3 text-center text-2xl font-extrabold sm:text-left sm:text-3xl lg:text-4xl">
          All Reviews{" "}
          <span className="mt-3 text-center text-lg font-light text-gray-700/50">
            (451)
          </span>
        </h2>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex items-center justify-center rounded-full bg-black px-3 py-2 md:px-4 md:py-4">
            <GiSettingsKnobs className="h-4 w-4 invert md:w-6" />
          </div>
          <div>
            <button className="flex items-center gap-2 rounded-full border-[1px] border-black px-6 py-3 text-black transition-colors hover:bg-black hover:text-white">
              Latest
              <span>
                <IoIosArrowDown className="h-4 w-4" />
              </span>
            </button>
          </div>
          <div>
            <button className="rounded-full bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800">
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-gray-200 p-6 transition-colors hover:border-gray-300 sm:p-8"
          >
            <div className="mb-3 flex gap-1 text-yellow-400 sm:mb-4">
              {[...Array(review.rating)].map((_, index) => (
                <FaStar key={index} className="h-4 w-4 sm:h-5 sm:w-5" />
              ))}
            </div>
            <div className="mb-3 flex items-center gap-2 sm:mb-4">
              <h3 className="text-base font-semibold sm:text-lg">
                {review.name}
              </h3>
              {review.verified && (
                <span className="flex items-center gap-1 text-xs text-green-500 sm:text-sm">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <p className="line-clamp-4 text-sm text-gray-600 sm:text-base">
              {review.review}
            </p>
          </div>
        ))}
      </div> */}
      <div className="mt-8 flex justify-center">
        <button className="rounded-full border-[1px] border-black/30 bg-white px-8 py-3 text-black transition-colors hover:bg-gray-800">
          load More
        </button>
      </div>
    </section>
  );
};

export default HappyCustomers;
