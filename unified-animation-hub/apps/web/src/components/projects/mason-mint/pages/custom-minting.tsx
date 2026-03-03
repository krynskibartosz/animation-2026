import Head from '@mason-mint/utils/head-shim'
import { CustomMintingContent } from '@mason-mint/modules/CustomMinting'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

const CustomMintingPage = () => {
  return (
    <>
      <Head>
        <title>Custom Minting | Mason Mint</title>
      </Head>
      <PageTransitionLayout>
        <CustomMintingContent />
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
