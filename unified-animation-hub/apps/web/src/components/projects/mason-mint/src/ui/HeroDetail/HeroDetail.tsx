import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
import Container from '@mason-mint/app/layouts/Container'
import { BackgroundImage } from '@mason-mint/ui/BackgroundImage/BackgroundImage'
import AnimatedText from '@mason-mint/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@mason-mint/ui/AnimatedElement/AnimatedElement'
import AnimateScaleBg from '@mason-mint/ui/AnimateScaleBG/AnimateScaleBG'
import useWindowDimensions from '@mason-mint/hooks/useWindowDimensions'
import { MotionValue, motion, useTransform } from 'framer-motion'

import styles from './HeroDetail.module.scss'
import { breakpointMob } from '@mason-mint/utils/variables'

type HeroDetail = {
  className?: string
  topDescription?: string
  bottomDescription?: string
  image: string
  sliderImages: string[]
  scrollYProgress: MotionValue<number>
}

const HeroDetail: FC<HeroDetail> = ({
  className,
  topDescription,
  bottomDescription,
  image,
  sliderImages,
  scrollYProgress,
}) => {
  const { width } = useWindowDimensions()

  const imageWidthTransform = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['75%', '100%']
  )

  const imageStyles = useMemo(() => {
    return { width: width > breakpointMob ? imageWidthTransform : '100%' }
  }, [width, imageWidthTransform])

  return (
    <section className={classNames(styles['HeroDetail'], className)}>
      <motion.div
        className={styles['HeroDetail__imageWrapper']}
        style={imageStyles}
      >
        <AnimatedElement delay={0.2} className={styles['HeroDetail__image']}>
          {width > breakpointMob ? (
            <AnimateScaleBg images={sliderImages} />
          ) : (
            <BackgroundImage
              className={styles['image']}
              parallax
              cover
              src={image}
              alt="image"
            />
          )}
        </AnimatedElement>
      </motion.div>
      {topDescription || bottomDescription ? (
        <Container className={styles['container']}>
          <div className={styles['HeroDetail__content']}>
            <div className={styles['HeroDetail__content_description']}>
              <h4 className={classNames('h4', styles['title'])}>
                <AnimatedText>{`${topDescription}`}</AnimatedText>
              </h4>
              <p className={styles['subtitle']}>
                <AnimatedText>{`${bottomDescription}`}</AnimatedText>
              </p>
            </div>
          </div>
        </Container>
      ) : null}
    </section>
  )
}

export default HeroDetail
