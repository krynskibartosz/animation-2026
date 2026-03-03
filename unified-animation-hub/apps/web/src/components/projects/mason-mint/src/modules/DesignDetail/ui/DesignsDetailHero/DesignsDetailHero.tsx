import { FC, memo, useCallback, useRef, useState } from 'react'
import { useRouter } from '@mason-mint/utils/router-shim'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import PhotoMain from './PhotoMain/PhotoMain'
import ProductDescription from './ProductDescription/ProductDescription'
import { PhotoPicker } from './PhotoPicker/PhotoPicker'
import DeliveryInfo from './DeliveryInfo/DeliveryInfo'
import ShareCoins from './ShareCoins/ShareCoins'
import { ButtonPrimary } from '@mason-mint/ui/ButtonPrimary/ButtonPrimary'
import { ProductProps } from '@mason-mint/utils/types'

import styles from './DesignsDetailHero.module.scss'
import AnimatedElement from '@mason-mint/ui/AnimatedElement/AnimatedElement'

const AbstractLogo = dynamic(() => import('@mason-mint/ui/AbstractLogo/AbstractLogo'), {
  ssr: false,
})

type DesignsDetailHeroProps = {
  className?: string
  product?: ProductProps
}

const DesignsDetailHero: FC<DesignsDetailHeroProps> = ({
  product,
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeSide, setActiveSide] = useState<'obverse' | 'reverse'>('obverse')
  const router = useRouter()

  const handleFlip = useCallback((valueToSet: 'obverse' | 'reverse') => {
    setActiveSide((prev) => {
      if (prev !== valueToSet) {
        if (audioRef.current) audioRef.current.play()
      }
      return valueToSet
    })
  }, [])

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <section className={classNames(styles['DesignsDetailHero'], className)}>
      <AnimatedElement className={styles['goBack']}>
        <ButtonPrimary backwardArrows variant="noStroked" onClick={goBack}>
          Go to back
        </ButtonPrimary>
      </AnimatedElement>
      {product && (
        <>
          <audio
            src="/projects/mason-mint/projects/mason-mint/projects/mason-mint/sounds/coin-rotate-2.mp3"
            ref={audioRef}
            className={styles['sound']}
          />
          <ProductDescription
            className={styles['productDescription']}
            product={product}
          />
          <PhotoMain
            className={styles['photoMain']}
            activeSide={activeSide}
            product={product}
          />
          {product.mainImages && (
            <PhotoPicker
              className={styles['photoPicker']}
              activeSide={activeSide}
              flip={handleFlip}
              product={product}
            />
          )}

          <DeliveryInfo className={styles['deliveryInfo']} />
          <ShareCoins className={styles['shareCoins']} />
        </>
      )}
      <AbstractLogo parallax className={styles['abstract']} />
    </section>
  )
}

export default memo(DesignsDetailHero)
