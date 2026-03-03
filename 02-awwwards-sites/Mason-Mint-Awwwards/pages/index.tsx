import Head from 'next/head'
import { HomeContent } from '@/modules/Home'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'
import Product from '../models/Product'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import { ProductProps } from '@/utils/types'
import { FC } from 'react'
import db from '@/utils/db'
import { MarqueCarouselWrapper } from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

type HomeProps = {
  products: ProductProps[]
}

const Home: FC<HomeProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Mason Mint Silver Coins and Rounds</title>
      </Head>
      <PageTransitionLayout>
        <MarqueCarouselWrapper>
          <HomeContent products={products} />
        </MarqueCarouselWrapper>
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps = async () => {
  // Skip database connection if disabled
  if (process.env.DISABLE_MONGODB === 'true') {
    console.log('Using mock data - MongoDB disabled')
    const mockDataModule = await import('@/utils/mockData')
    
    return {
      props: {
        products: mockDataModule.mockProducts,
      },
      revalidate: 10, // Revalidate every 10 seconds
    }
  }

  await db.connect()
  const products = await Product.find({
    isFeatured: true,
  })

  return {
    props: {
      products: transformObjectsToJson(products),
    },
  }
}

export default Home
