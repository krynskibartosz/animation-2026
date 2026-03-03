import { FC, useState } from 'react'
import { useRouter } from '@mason-mint/utils/router-shim'
import dynamic from 'next/dynamic'
import axios, { AxiosResponse } from 'axios'
import Container from '@mason-mint/app/layouts/Container'
import { CategoryProps, ProductProps } from '@mason-mint/utils/types'
import { ButtonPrimary } from '@mason-mint/ui/ButtonPrimary/ButtonPrimary'
import { useModal } from '@mason-mint/hooks/useModal'
import ProductForm from '@mason-mint/ui/ProductForm/ProductForm'
import routes from '@mason-mint/utils/routes'
const ProductManipulatedSuccessModal = dynamic(
  () => import('@mason-mint/modals/ProductManipulatedSuccess/ProductManipulatedSuccess'),
  { ssr: false }
)

import styles from '@mason-mint/modules/Admin/Admin.module.scss'

const ProductEdit: FC<{
  product: ProductProps
  categories: CategoryProps[]
}> = ({ product, categories }) => {
  const { query } = useRouter()
  const [productState, setProductState] = useState(product)
  const [loading, setLoading] = useState(false)
  const openSuccessModal = useModal(ProductManipulatedSuccessModal, {
    size: 'md',
  })

  const handleEdit = async (data: ProductProps) => {
    setLoading(true)
    await axios
      .put(`/api/products/${query.id}/edit`, data)
      .then(({ data: { success, data } }: AxiosResponse) => {
        if (success) {
          setProductState(data)
          setLoading(false)
          openSuccessModal()
        }
      })
  }

  return (
    <main className={styles['admin']}>
      <Container>
        <ButtonPrimary
          href={routes.private.products}
          backwardArrows
          size="small"
        >
          Back to list
        </ButtonPrimary>
        <ProductForm
          product={productState}
          categories={categories}
          onValues={handleEdit}
          loading={loading}
        />
      </Container>
    </main>
  )
}

export default ProductEdit
