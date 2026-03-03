import Head from '@mason-mint/utils/head-shim'
import { HomeContent } from '@mason-mint/modules/Home'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'
import Product from '../models/Product'
import { transformObjectsToJson } from '@mason-mint/utils/json/transformObjectsToJson'
import { ProductProps } from '@mason-mint/utils/types'
import { FC } from 'react'
import db from '@mason-mint/utils/db'
import { MarqueCarouselWrapper } from '@mason-mint/components/MarqueeCarousel/MarqueeCarouselWrapper'

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
    const mockDataModule = await import('@mason-mint/utils/mockData')
    
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
