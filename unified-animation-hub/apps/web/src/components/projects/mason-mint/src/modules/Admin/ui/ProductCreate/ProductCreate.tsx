import { CategoryProps, ProductProps } from '@mason-mint/utils/types'
import dynamic from 'next/dynamic'
import axios, { AxiosResponse } from 'axios'
import Container from '@mason-mint/app/layouts/Container'
import { ButtonPrimary } from '@mason-mint/ui/ButtonPrimary/ButtonPrimary'
import routes from '@mason-mint/utils/routes'
import ProductForm from '@mason-mint/ui/ProductForm/ProductForm'
import { useState } from 'react'
import { useModal } from '@mason-mint/hooks/useModal'
const ProductManipulatedSuccessModal = dynamic(
  () => import('@mason-mint/modals/ProductManipulatedSuccess/ProductManipulatedSuccess'),
  { ssr: false }
)

import styles from '@mason-mint/modules/Admin/Admin.module.scss'

const ProductCreate = ({ categories }: { categories: CategoryProps[] }) => {
  const [loading, setLoading] = useState(false)
  const openSuccessModal = useModal(ProductManipulatedSuccessModal, {
    size: 'md',
  })

  const handleCreate = async (data: ProductProps) => {
    setLoading(true)
    await axios
      .post(`/api/products/create`, data)
      .then(({ data: { success, data } }: AxiosResponse) => {
        if (success) {
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
          categories={categories}
          onValues={handleCreate}
          loading={loading}
        />
      </Container>
    </main>
  )
}

export default ProductCreate
