"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "./ui/checkbox";
import { MdArrowForwardIos } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";
import { CategoryProduct } from "./CategoryProduct";
import axios from "axios";
import Loader from "./Loader";
interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  discountPercent: number;
  isNew: boolean;
  category: string;
  price: number;
  sizes?: string[];
}
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const categories = ["tshirt", "short", "hoodie", "jeans", "shirt"];

export function FilterSidebar() {
  const [allProductData, setAllProductData] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  useEffect(() => {
    const getProductsData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/products");
        setAllProductData(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProductsData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev: string[]) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };
  
  const handleSizeClick = (size: string) => {
    setSelectedSizes((prev: string[]) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      }
      return [...prev, size];
    });
  };
  

  const applyFilters = () => {
    let filtered = [...allProductData];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    filtered = filtered.filter((product) => product.price <= priceRange[0]);

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => selectedSizes.includes(size)),
      );
    }

    setFilteredProducts(filtered);
  };

  const FilterContent = () => (
    <>
      <section className="rounded-md border-[1px] border-black/20 px-2">
        <div className="flex items-center justify-between rounded-t-md border-b px-4 py-5">
          <h3>Filter</h3> <GiSettingsKnobs size={20} className="h-6 w-6" />
        </div>
        <ScrollArea className="h-full">
          <div className="space-y-4 border-b py-4">
            <div className="rounded-md px-4 py-4">
              {categories.map((category) => (
                <div
                  key={category}
                  className="mb-2 flex items-center justify-between"
                >
                  <div className="flex items-center justify-start gap-2">
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />

                    <p>{category.toUpperCase()}</p>
                  </div>
                  <MdArrowForwardIos />
                </div>
              ))}
            </div>

            <div className="space-y-3 border-b py-4">
              <h3 className="font-semibold">Price</h3>
              <Slider
                defaultValue={[500]}
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                step={1}
              />
              <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>${priceRange[0]}</span>
              </div>
            </div>

            <div className="space-y-3 border-b py-4">
              <h3 className="font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      selectedSizes.includes(size)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      handleSizeClick(size), applyFilters();
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={applyFilters}>
              Apply Filter
            </Button>
          </div>
        </ScrollArea>
      </section>
    </>
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center">
            <div className="hidden w-64 flex-col gap-6 border-r p-4 pr-4 md:flex md:flex-row lg:block">
              <FilterContent />
            </div>
            <CategoryProduct data={filteredProducts} />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="fixed bottom-4 left-4 z-50 lg:hidden"
              >
                <Menu className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[400px]">
              <FilterContent />
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}
