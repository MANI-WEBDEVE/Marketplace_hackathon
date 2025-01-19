'use client'
import  React,{useState, useEffect} from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { MdArrowForwardIos } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";
import { CategoryProduct } from "./CategoryProduct";
import axios from "axios";
import Loader from "./Loader";



const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function FilterSidebar() {

  const [allProductData, setAllProductData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {

    const getProductsData = async  () => {
      try{
        setIsLoading(true)
        const res = await axios.get('/api/products')
        setAllProductData(res.data)
        console.log(res.data)
      }catch(err){
        console.log(err)
      }finally{
        setIsLoading(false)
      }

    }
    getProductsData()

  }, [])




  const FilterContent = () => (
    <>
      <section className=" border-[1px] border-black/20 rounded-md  px-2 ">
        <div className="flex items-center justify-between px-4 py-5 border-b rounded-t-md ">
          <h3>Filter</h3> <GiSettingsKnobs size={20} className=" w-6 h-6" />
        </div>
        <ScrollArea className="h-full ">
          <div className="space-y-4 py-4 border-b">
            <div className=" px-4 py-4 rounded-md">
              <div className="flex items-center justify-between ">
                <p>T-Shirt</p>
                <MdArrowForwardIos />
              </div>
              <div className="flex items-center justify-between ">
                <p>Short</p>
                <MdArrowForwardIos />
              </div>
              <div className="flex items-center justify-between ">
                <p>Hoodie</p>
                <MdArrowForwardIos />
              </div>
              <div className="flex items-center justify-between ">
                <p>Jeans</p>
                <MdArrowForwardIos />
              </div>
              <div className="flex items-center justify-between ">
                <p>Shirt</p>
                <MdArrowForwardIos />
              </div>
            </div>

            <div className="space-y-3 border-b py-4">
              <h3 className="font-semibold">Price</h3>
              <Slider defaultValue={[50]} max={500} step={1} />
              <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>

           

            <div className="space-y-3 border-b py-4">
              <h3 className="font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
           
            <Button className="w-full">Apply Filter</Button>
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
            <CategoryProduct data={allProductData} />
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
