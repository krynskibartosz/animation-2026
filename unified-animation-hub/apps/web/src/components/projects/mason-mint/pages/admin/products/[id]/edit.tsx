import { NextApiRequest } from 'next'
import { useSession } from 'next-auth/react'
import { ProductEdit } from '@mason-mint/modules/Admin'
import CategoryModel from '../../../../models/Category'
import db from '@mason-mint/utils/db'
import { CategoryProps, ProductProps } from '@mason-mint/utils/types'
import PageTransitionLayout from '@mason-mint/app/layouts/PageTransitionLayout'
import { transformObjectsToJson } from '@mason-mint/utils/json/transformObjectsToJson'
import ProductModel from '../../../../models/Product'
import AdminAlert from '@mason-mint/ui/AdminAlert/AdminAlert'

export default function ProductEditPage({
  product,
  categories,
}: {
  product: ProductProps
  categories: CategoryProps[]
}) {
  const session = useSession()

  return (
    <PageTransitionLayout>
      {session.status === 'authenticated' ? (
        <ProductEdit product={product} categories={categories} />
      ) : (
        <AdminAlert title="Sorry, You are not admin" />
      )}
    </PageTransitionLayout>
  )
}

export const getServerSideProps = async (req: NextApiRequest) => {
  const { query } = req
  await db.connect()
  const product = await ProductModel.findOne({ id: query.id }).lean()
  const categories = await CategoryModel.find().lean()

  return {
    props: {
      product: transformObjectsToJson(product),
      categories: transformObjectsToJson(categories),
    },
  }
}
