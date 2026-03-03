import { FC } from 'react'
import { useRouter } from '@mason-mint/utils/router-shim'
import ModalWindow, { ModalWindowProps } from '@mason-mint/ui/ModalWindow/ModalWindow'
import { ButtonPrimary } from '@mason-mint/ui/ButtonPrimary/ButtonPrimary'
import routes from '@mason-mint/utils/routes'

import styles from './ProductManipulatedSuccess.module.scss'

const ProductManipulatedSuccessModal: FC<ModalWindowProps> = (props) => {
  const router = useRouter()

  const handleClose = () => {
    props.onClose()
    router.reload()
  }

  return (
    <ModalWindow {...props}>
      <div className={styles['modal']}>
        <p className="h4">The data has been successfully saved</p>
        <div className={styles['modal__actions']}>
          <ButtonPrimary
            size="small"
            href={routes.private.products}
            variant="noStroked"
            backwardArrows
          >
            Back to list
          </ButtonPrimary>
          <ButtonPrimary
            size="small"
            variant="blue"
            onClick={handleClose}
            arrows={false}
          >
            Continue on this page
          </ButtonPrimary>
        </div>
      </div>
    </ModalWindow>
  )
}

export default ProductManipulatedSuccessModal
