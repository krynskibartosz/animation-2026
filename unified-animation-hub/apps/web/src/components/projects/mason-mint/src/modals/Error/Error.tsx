import { FC, useCallback } from 'react'
import classNames from 'classnames'
import { useRouter } from '@mason-mint/utils/router-shim'
import ModalWindow, { ModalWindowProps } from '@mason-mint/ui/ModalWindow/ModalWindow'
import Exclamation from '@mason-mint/ui/Icons/Exclamation'
import { ButtonPrimary } from '@mason-mint/ui/ButtonPrimary/ButtonPrimary'

import styles from './Error.module.scss'

const ErrorModal: FC<ModalWindowProps> = (props) => {
  const router = useRouter()

  const handleReload = useCallback(() => {
    router.reload()
  }, [router])

  return (
    <ModalWindow {...props} className={styles['errorModal']}>
      <div className={styles['modal']}>
        <div className={styles['modal__icon']}>
          <Exclamation className={styles['modal__icon_item']} />
        </div>
        <p className={classNames('h4', styles['modal__title'])}>
          Oops! Something Went Wrong.
        </p>
        <ButtonPrimary
          fullWidth
          variant="blue"
          arrows={false}
          size="small"
          onClick={handleReload}
        >
          Try again
        </ButtonPrimary>
      </div>
    </ModalWindow>
  )
}

export default ErrorModal
