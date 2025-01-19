"use client";
import * as React from "react";
import { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  discountPercent: number;
  isNew: boolean | null;
}

interface CategoryProductProps {
  data: Product[];
}

export function CategoryProduct({ data }: CategoryProductProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product: Product) => (
          <Link
            href={`/product-details/${product._id}`}
            key={product._id}
            className="relative"
          >
            <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="relative w-full">
                {product.isNew === true ? (
                  <span className="absolute left-0 top-0 rounded-br-lg bg-green-500 px-2 py-1 text-white z-10">
                    New
                  </span>
                ) : product.isNew === false ? (
                  <span className="absolute left-0 top-0 rounded-br-lg bg-yellow-600 px-2 py-1 text-white z-10">
                    Old
                  </span>
                ) : null}
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-[210px]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-2 flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.price / 30)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500">
                    ({product.price / 50})
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="font-semibold">${product.price}</span>
                  {product.discountPercent > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price * 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex w-full items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  className={`cursor-pointer ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
