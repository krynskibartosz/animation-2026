import React, { FC, useRef } from 'react'
import dynamic from 'next/dynamic'
import HeroInner from '@mason-mint/ui/HeroInner/HeroInner'
import WasBorn from '@mason-mint/modules/About/ui/WasBorn/WasBorn'
import AllProducts from '@mason-mint/modules/About/ui/AllProducts/AllProducts'
import WhatWeDo from '@mason-mint/components/WhatWeDo/WhatWeDo'
import { useScroll } from 'framer-motion'
import { DiscoverMasonMintSection } from '@mason-mint/components/DisocoverMasonMintSection/DiscoverMasonMintSection'

const BecomeDistributorSection = dynamic(
  () =>
    import('@mason-mint/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)

const HeroDetail = dynamic(() => import('@mason-mint/ui/HeroDetail/HeroDetail'), {
  ssr: false,
})

const sliderImages = ['/images/about/innerAbout-desktop.jpg']

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  return (
    <div ref={targetRef}>
      <HeroInner
        title="Finding a partner you can trust is not an easy decision"
        subtitle="Welcome to masonmint"
        centeredOnDesktop
      />
      <HeroDetail
        sliderImages={sliderImages}
        image="/images/about/innerAbout_1.jpg"
        topDescription="We've built our business on our high standard for excellency with industry leading pricing."
        bottomDescription="Providing our distribution partners with some of the highest quality silver bullion coins and bars at a price point that is second to none."
        scrollYProgress={scrollYProgress}
      />
    </div>
  )
}

export const AboutContent: FC = () => {
  return (
    <main>
      <HeroSection />
      <WasBorn />
      <DiscoverMasonMintSection />
      <AllProducts />
      <WhatWeDo />
      <BecomeDistributorSection />
    </main>
  )
}
