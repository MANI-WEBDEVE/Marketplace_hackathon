import ProductPage from '@/components/ProductPage'
import React from 'react'

const Page = ({params}:{params:{id:string}}) => {

  return (
    <main>
      <ProductPage productId={params.id} />
    </main>
  )
}

export default Page
