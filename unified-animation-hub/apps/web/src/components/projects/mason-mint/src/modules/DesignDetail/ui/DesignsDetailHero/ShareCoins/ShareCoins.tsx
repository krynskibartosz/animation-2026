import { FC, memo, useCallback } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from '@mason-mint/utils/router-shim'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'next-share'
import { ProductProps } from '@mason-mint/utils/types'

import styles from './ShareCoins.module.scss'

const AnimatedElement = dynamic(
  () => import('@mason-mint/ui/AnimatedElement/AnimatedElement')
)

type ShareCoinsProps = {
  className?: string
  product?: ProductProps
}

const ShareCoins: FC<ShareCoinsProps> = ({ className }) => {
  const { asPath } = useRouter()
  const [_, copy] = useCopyToClipboard()
  const sharedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`

  const handleCopy = useCallback(() => {
    copy(sharedUrl)
      .then(() => {
        toast.success('Link copied!', {
          className: classNames(styles['toast'], styles['toast-success']),
        })
      })
      .catch(() => {
        toast.error('Something went wrong!', {
          className: classNames(styles['toast'], styles['toast-error']),
        })
      })
  }, [sharedUrl, copy])

  return (
    <div className={classNames(styles['ShareCoins'], className)}>
      <AnimatedElement>
        <h6>share coins</h6>
      </AnimatedElement>
      <AnimatedElement className={styles['linksList']}>
        <span>
          <span className={styles['icon']} onClick={handleCopy} style={{ cursor: 'pointer' }}>🔗</span>
        </span>
        <FacebookShareButton url={sharedUrl}>
          <span className={styles['icon']}>f</span>
        </FacebookShareButton>
        <TwitterShareButton url={sharedUrl}>
          <span className={styles['icon']}>𝕏</span>
        </TwitterShareButton>
        <LinkedinShareButton url={sharedUrl}>
          <span className={styles['icon']}>in</span>
        </LinkedinShareButton>
      </AnimatedElement>
    </div>
  )
}

export default memo(ShareCoins)
