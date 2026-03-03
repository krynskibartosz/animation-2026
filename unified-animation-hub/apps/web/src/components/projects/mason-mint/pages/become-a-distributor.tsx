import Head from '@mason-mint/utils/head-shim'
import { BecomeADistributorContent } from '@mason-mint/modules/BecomeADistributor'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

export default function BecomeADistributor() {
  return (
    <>
      <Head>
        <title>Become An Authorized Distributor | Mason Mint</title>
        <meta
          name="description"
          content="Complete the application below and one of our customer service representatives will contact you with more information regarding our products."
        />
      </Head>
      <PageTransitionLayout>
        <BecomeADistributorContent />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}
