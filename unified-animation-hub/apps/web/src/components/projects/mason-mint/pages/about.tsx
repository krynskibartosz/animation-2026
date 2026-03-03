import Head from '@mason-mint/utils/head-shim'
import { AboutContent } from '@mason-mint/modules/About'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Mason Mint</title>
      </Head>
      <PageTransitionLayout>
        <AboutContent />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}
