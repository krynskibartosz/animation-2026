import { NextApiRequest } from 'next'
import PageTransitionLayout from '@mason-mint/app/layouts/PageTransitionLayout'
import ProductCreate from '@mason-mint/modules/Admin/ui/ProductCreate/ProductCreate'
import { transformObjectsToJson } from '@mason-mint/utils/json/transformObjectsToJson'
import { CategoryProps } from '@mason-mint/utils/types'
import CategoryModel from '../../../models/Category'
import db from '@mason-mint/utils/db'

const ProductCreatePage = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <PageTransitionLayout>
      <ProductCreate categories={categories} />
    </PageTransitionLayout>
  )
}

export default ProductCreatePage

export const getServerSideProps = async (req: NextApiRequest) => {
  await db.connect()
  const categories = await CategoryModel.find().lean()

  return {
    props: {
      categories: transformObjectsToJson(categories),
    },
  }
}
