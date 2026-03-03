import { ReactNode, useEffect } from 'react'
import { useRouter } from '@mason-mint/utils/router-shim'
import classNames from 'classnames'
import Close from '@mason-mint/ui/Icons/Close'

import styles from './ModalWindow.module.scss'

export type ModalWindowProps = {
  onClose: () => void
  size: string
  children?: ReactNode
  className?: string
}
const ModalWindow = ({
  onClose,
  size,
  children,
  className,
}: ModalWindowProps) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => onClose())
  }, [onClose, router])

  return (
    <div className={styles['modal']}>
      <div className={styles['modal__bg']} />
      <div className={styles['modal__close']} onClick={() => onClose()} />
      <div
        className={classNames(styles['modal__body'], styles[size], className)}
      >
        <button
          className={styles['modal__body_close']}
          onClick={() => onClose()}
        >
          <Close className={styles['modal__body_close_icon']} />
        </button>
        <div className={styles['modal__body_content']}>{children}</div>
      </div>
    </div>
  )
}

export default ModalWindow
