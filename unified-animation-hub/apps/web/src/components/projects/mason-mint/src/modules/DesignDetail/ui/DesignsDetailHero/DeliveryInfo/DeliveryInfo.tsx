import { FC, memo } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { ProductProps } from '@mason-mint/utils/types'


const AnimatedText = dynamic(() => import('@mason-mint/ui/AnimatedText/AnimatedText'))

import styles from './DeliveryInfo.module.scss'
import AnimatedElement from '@mason-mint/ui/AnimatedElement/AnimatedElement'

type DeliveryInfoProps = {
  className?: string
  product?: ProductProps
}

const DeliveryInfo: FC<DeliveryInfoProps> = ({ className }) => {
  return (
    <div className={classNames(styles['DeliveryInfo'], className)}>
      <AnimatedElement className={styles['title']}>
        <span className={styles['car']}>🚗</span>
        <h6>delivery info</h6>
      </AnimatedElement>
      <p className={styles['description']}>
        <AnimatedText>
          Coins are delivered in bags or boxes made of durable materials, such
          as plastic or metal.
        </AnimatedText>
      </p>
    </div>
  )
}

export default memo(DeliveryInfo)
