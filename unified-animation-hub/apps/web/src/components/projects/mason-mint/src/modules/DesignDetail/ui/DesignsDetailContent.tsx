import React, { FC, useContext } from 'react'
import Head from '@mason-mint/utils/head-shim'
import dynamic from 'next/dynamic'

import DesignsDetailHero from './DesignsDetailHero/DesignsDetailHero'
import DesignsDetailSpecifications from './DesignsDetailSpecifications/DesignsDetailSpecifications'
import {
  MarqueCarouselContext,
  MarqueCarouselContextType,
} from '@mason-mint/components/MarqueeCarousel/MarqueeCarouselWrapper'

import { ProductProps } from '@mason-mint/utils/types'

import styles from './DesignsDetailContent.module.scss'
import DesignsDetailSameProducts from './DesignsDetailSameProducts/DesignsDetailSameProducts'

const BecomeDistributorSection = dynamic(
  () => import('@mason-mint/components/BecomeDistributorSection/BecomeDistributorSection')
)

type DesignDetailProps = {
  product: ProductProps
  sameProducts: ProductProps[]
}

const DesignsDetailContent: FC<DesignDetailProps> = ({
  product,
  sameProducts,
}) => {
  const { onWheel } = useContext(
    MarqueCarouselContext
  ) as MarqueCarouselContextType

  return (
    <>
      <Head>
        <title>{product?.ProductName} | Mason Mint</title>
      </Head>
      <main className={styles['detail']} onWheel={onWheel}>
        <DesignsDetailHero product={product} />
        <DesignsDetailSpecifications product={product} />
        {sameProducts.length > 0 && (
          <DesignsDetailSameProducts
            products={sameProducts}
            category={product.category?.name}
          />
        )}
        <BecomeDistributorSection />
      </main>
    </>
  )
}

export default DesignsDetailContent
