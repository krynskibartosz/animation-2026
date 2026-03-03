import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import Head from '@mason-mint/utils/head-shim'

import PageTransitionLayout from '@mason-mint/app/layouts/PageTransitionLayout'
import { DesignsContent } from '@mason-mint/modules/Designs'

import db from '@mason-mint/utils/db'
import { CategoryProps, ProductProps } from '@mason-mint/utils/types'
import { transformObjectsToJson } from '@mason-mint/utils/json/transformObjectsToJson'

import CategoryModel from '../../models/Category'
import Product from '../../models/Product'

type DesignsProps = {
  products: ProductProps[]
  categories: CategoryProps[]
}

const Index: FC<DesignsProps> = ({ categories, products }) => {
  return (
    <>
      <Head>
        <title>Mason Mint Category | Mason Mint</title>
        <meta
          name="description"
          content="Find Mason Mint silver rounds and silver bullion products from precious metal wholesalers. We live by our motto, Excellence in Minting!"
        />
      </Head>
      <PageTransitionLayout>
        <DesignsContent categories={categories} products={products} />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Skip database connection if disabled
  if (process.env.DISABLE_MONGODB === 'true') {
    console.log('Using mock designs data - MongoDB disabled')
    const { mockApiProducts } = await import('@mason-mint/utils/mockApiData')

    return {
      props: {
        products: mockApiProducts,
      },
      revalidate: 10,
    }
  }

  await db.connect()

  const products = await Product.find()
    .sort({ 'category.name': 1, _id: 1 })
    .lean()

  const categories = await CategoryModel.find().sort({ name: 1 })

  return {
    props: {
      products: transformObjectsToJson(products),
      categories: transformObjectsToJson(categories),
    },
  }
}

export default Index
