import { FC } from 'react'
import dynamic from 'next/dynamic'
import CustomMintingProcess from '@mason-mint/modules/CustomMinting/ui/CustomMintingProcess/CustomMintingProcess'

const CustomMintingMarketing = dynamic(
  () =>
    import('@mason-mint/modules/CustomMinting/ui/CustomMintingMarketing/CustomMintingMarketing'
    ),
  { ssr: false }
)

const BecomeDistributorSection = dynamic(
  () =>
    import('@mason-mint/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)

import styles from './CustomMintingContent.module.scss'

export const CustomMintingContent: FC = () => {
  return (
    <main className={styles['CustomMintingContent']}>
      <CustomMintingProcess className={styles['proccess']} />
      <CustomMintingMarketing />
      <BecomeDistributorSection />
    </main>
  )
}
