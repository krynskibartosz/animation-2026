import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { ButtonPrimary } from '@mason-mint/ui/ButtonPrimary/ButtonPrimary'
import Container from '@mason-mint/app/layouts/Container'
import AnimatedText from '@mason-mint/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@mason-mint/ui/AnimatedElement/AnimatedElement'
import useWindowDimensions from '@mason-mint/hooks/useWindowDimensions'
import { BackgroundImage } from '@mason-mint/ui/BackgroundImage/BackgroundImage'
import routes from '@mason-mint/utils/routes'
import AnimateScaleBg from '@mason-mint/ui/AnimateScaleBG/AnimateScaleBG'

import styles from './CustomDesignsSection.module.scss'
import { breakpointMob } from '@mason-mint/utils/variables'

const images = [
  '/images/home/customDesign/slide_1.jpg',
  '/images/home/customDesign/slide_2.jpg',
  '/images/home/customDesign/slide_3.jpg',
  '/images/home/customDesign/slide_4.jpg',
  '/images/home/customDesign/slide_5.jpg',
]

const CustomDesignsSection: FC<{ className?: string }> = ({ className }) => {
  const { width } = useWindowDimensions()

  return (
    <section className={classNames(styles['CustomDesignsSection'], className)}>
      {width > breakpointMob ? (
        <AnimateScaleBg images={images} />
      ) : (
        <div className={styles['CustomDesignsSection__mob']}>
          <BackgroundImage
            className={styles['CustomDesignsSection__mob_image']}
            src="/projects/mason-mint/projects/mason-mint/projects/mason-mint/images/home/customDesign/slide_mob_1.jpg"
            alt="Custom Minting Program"
          />
        </div>
      )}
      <Container>
        <div className={styles['CustomDesignsSection__content']}>
          <h6
            className={classNames(
              'h6',
              styles['CustomDesignsSection__content_subtitle']
            )}
          >
            <AnimatedText title>custom design</AnimatedText>
          </h6>
          <h2
            className={classNames(
              'h2',
              styles['CustomDesignsSection__content_title']
            )}
          >
            <AnimatedText title withBlueDot>
              Custom Minting Program
            </AnimatedText>
          </h2>
          <p className={styles['CustomDesignsSection__content_description']}>
            <AnimatedText>
              Minted to the same standard of excellence for which Mason Mint is
              known for, stand out from your competition with your own custom
              minted silver coin or bar.
            </AnimatedText>
          </p>
          <AnimatedElement delay={0.2}>
            <Link scroll={false} href={routes.public.customMinting}>
              <ButtonPrimary
                className={styles['CustomDesignsSection__content_button']}
              >
                Learn more
              </ButtonPrimary>
            </Link>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  )
}

export default CustomDesignsSection
