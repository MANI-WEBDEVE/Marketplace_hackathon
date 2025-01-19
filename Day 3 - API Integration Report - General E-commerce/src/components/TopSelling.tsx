
import React from 'react'

import TopSellingList from './TopSellingList';
const TopSelling = () => {
  return (
    <>
      <section className='w-full flex flex-col justify-center items-center py-16 gap-10 border-b mb-10 px-20'>
        <div>
          <h2 className='text-4xl font-extrabold uppercase text-center'>New TopSellings</h2>
        </div>
        <div className='flex flex-row justify-center items-center gap-10 mx-auto flex-wrap w-full mt-10 '>
          <TopSellingList/>
        </div>
       
      </section>
    </>
  )
}

export default TopSelling
