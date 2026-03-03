import Head from '@mason-mint/utils/head-shim'
import PageTransitionLayout from '@mason-mint/app/layouts/PageTransitionLayout'
import { PackagingContent } from '@mason-mint/modules/Packaging'
import { MarqueCarouselWrapper } from '@mason-mint/components/MarqueeCarousel/MarqueeCarouselWrapper'

const CustomMintingPage = () => {
  return (
    <>
      <Head>
        <title>Packaging | Mason Mint</title>
      </Head>
      <PageTransitionLayout>
        <MarqueCarouselWrapper>
          <PackagingContent />
        </MarqueCarouselWrapper>
      </PageTransitionLayout>
    </>
  )
}

export default CustomMintingPage

export const getStaticProps = () => {
  return {
    props: {},
  }
}
