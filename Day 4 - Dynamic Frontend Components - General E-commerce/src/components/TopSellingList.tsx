'use client'
import React, {useEffect, useState} from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link';
import Loader from './Loader';


interface TopSellingData {
  _id: number;
  imageUrl: string;
  name: string;
  price: number;
  discountPercent: number;
  description: string;
}

const TopSellingList = () => {
  const [topSellingData, setTopSellingData] = useState<TopSellingData[]>([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const fetchTopSellingData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/top-selling-products');
        
        setTopSellingData(response.data.data);
      } catch (error) {
        console.error('Error fetching new arrival data:', error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchTopSellingData()
  }, [])


  return (
    <div>
      {isLoading ? (<Loader />) : (
        <div className='w-full'>
          <div className='flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory'>
            {topSellingData.map((item) => (
              <Link href={`/product-details/${item._id}`} key={item._id}>
                <div className='flex-shrink-0 w-[280px] sm:w-full flex flex-col justify-center items-center rounded-xl bg-gray-50/50 p-3 hover:shadow-md transition-all duration-300 snap-start'>
                  <div className='w-full flex justify-center mb-3'>
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      width={200}  
                      height={200} 
                      className='object-cover h-[200px] w-full max-w-[200px] rounded-lg hover:scale-110 transition-all'
                    />
                  </div>
                  <div className='w-full text-center'>
                    <p className='text-base sm:text-lg font-semibold line-clamp-2 min-h-[50px] flex items-center justify-center'>{item.name}</p>
                    <div className='flex justify-center items-center gap-3 mt-2'>
                      <p className='text-lg font-bold text-black'>${item.price}</p>
                      <p className='text-base font-medium text-gray-500 line-through'>${item.price + (item.price * item.discountPercent / 100)}</p>
                      <p className='bg-red-400/30 uppercase text-red-400 px-2 rounded-full text-xs py-1'>
                        -{item.discountPercent}%
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TopSellingList
