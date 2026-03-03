import { AdminProducts } from '@mason-mint/modules/Admin'
import db from '@mason-mint/utils/db'
import { useSession } from 'next-auth/react'
import { transformObjectsToJson } from '@mason-mint/utils/json/transformObjectsToJson'
import PageTransitionLayout from '@mason-mint/app/layouts/PageTransitionLayout'
import { ProductProps } from '@mason-mint/utils/types'
import ProductModel from '../../../models/Product'
import AdminAlert from '@mason-mint/ui/AdminAlert/AdminAlert'

type ProductsPageProps = {
  products: ProductProps[]
}

export default function ProductsPage({ products }: ProductsPageProps) {
  const session = useSession()

  return (
    <PageTransitionLayout>
      {session.status === 'authenticated' ? (
        <AdminProducts products={products} />
      ) : (
        <AdminAlert title="Sorry, You are not admin" />
      )}
    </PageTransitionLayout>
  )
}

export const getServerSideProps = async () => {
  await db.connect()
  const products = await ProductModel.find().lean()
  return {
    props: {
      products: transformObjectsToJson(products),
    },
  }
}
