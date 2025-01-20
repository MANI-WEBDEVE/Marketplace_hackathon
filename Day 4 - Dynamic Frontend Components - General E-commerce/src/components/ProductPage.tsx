"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import HappyCustomers from "./HappyCustomers";
import ProductHappyCustomer from "./ProductHappyCustomer";
import axios from "axios";
import Loader from "./Loader";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  discountPercent: number;
  description: string;
  sizes: string[];
  colors: string[];
};

const ProductPage = ({ productId }: { productId: string }) => {
  const [productData, setProductData] = useState<ProductType>();
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, cart,totalQuantity } = useCartStore()

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    const productDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/product-detail", {
          id: productId,
        });
        setProductData(response.data.data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    productDetail();
  }, []);

 
  const handleAddToCart = () => {
    if (productData) {
      const result = addToCart({ id: productData?._id as string, name: productData?.name, imageUrl: productData?.imageUrl, color: selectedColor, size: selectedSize,  price: productData?.price as number }, quantity)

          
        toast.success("Product added to cart")
        setQuantity(1)
        
   
    }else {
      toast.error("Product not added to cart")
      setQuantity(1)
    }
  };
 
  
  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <div className="mx-auto max-w-[1440px]">
      {/* Product Section */}
      <div className="grid grid-cols-1 gap-8 px-4 py-4 md:grid-cols-2 md:px-8 lg:px-16">
        {/* Image Gallery */}
        <div className="flex w-full flex-col-reverse items-start gap-10 space-y-0 md:flex-row md:space-y-4">
          <div className="relative w-full rounded-lg border border-gray-200">
            <Image
              src={productData?.imageUrl || "/default-image.jpg"}
              alt="Product main"
              width={200}
              height={200}
              className="h-[478px] w-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{productData?.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">${productData?.price}</span>
            <span className="text-gray-500 line-through">
              ${productData?.price ? productData.price * 2 : ""}
            </span>
            <span className="text-red-500">
              {productData?.discountPercent}%
            </span>
          </div>

          <p className="text-gray-600">{productData?.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="mb-2 font-medium">Select Colors</h3>
            <div className="flex items-center gap-4">
              {productData?.colors?.map((item: any) => {
                switch (item) {
                  case "Black": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full bg-black p-4 ${selectedColor === item ? "border-2 border-white" : ""}`}
                      ></div>
                    );
                  }
                  case "White": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full border-2 border-gray-600 bg-white p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                  case "Red": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full bg-red-500 p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                  case "Blue": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full bg-blue-500 p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                  case "Green": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full bg-green-500 p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                  case "Yellow": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full bg-yellow-500 p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                  case "Brown": {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`bg-yellow-950-500 cursor-pointer rounded-full p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                  default: {
                    return (
                      <div
                        key={item}
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-full bg-gray-500 p-4 ${selectedColor === item ? "border-2 border-black" : ""}`}
                      ></div>
                    );
                  }
                }
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="mb-2 font-medium">Choose Size</h3>
            <div className="flex flex-wrap gap-4">
              {productData?.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-4 py-2 ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center rounded-full border border-gray-300">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 rounded-full bg-black px-8 py-2 text-white transition-colors hover:bg-gray-800">
              Add to Cart
            </button>
          </div>

          {/* Tabs */}
        </div>
      </div>
      {/* <div className="border-b border-gray-200 w-full flex items-center justify-between gap-4 mt-10 px-10">
        <div className="flex gap-8 justify-between px-10 w-full">
          <button className="w-full text-gray-500 pb-2 font-medium text-sm md:text-xl">
            Product Details
          </button>
          <button className="w-full border-b-2 border-black  pb-2 font-medium text-sm md:text-xl">
            Rating & Reviews
          </button>
          <button className="w-full text-gray-500 pb-2 font-medium text-sm md:text-xl">FAQs</button>
        </div>
      </div> */}
      <div><ProductHappyCustomer categoryTag={productData?.category as string}/></div>
    </div>
  );
};

export default ProductPage;
