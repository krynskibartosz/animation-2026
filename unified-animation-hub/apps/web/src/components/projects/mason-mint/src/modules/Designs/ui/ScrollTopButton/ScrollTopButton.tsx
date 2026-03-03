import { useContext } from 'react'
import { motion } from 'framer-motion'
import ArrowSelect from '@mason-mint/ui/Icons/ArrowSelect'
import { Portal } from '@mason-mint/ui/Portal/Portal'

import { ProducsSectionContext } from '../../lib/ProductListContext'
import styles from './ScrollTopButton.module.scss'

const buttonVariants = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'anticipate',
    },
  },
}

export const ScrollTopButton = () => {
  const { scrollTop } = useContext(ProducsSectionContext)
  return (
    <Portal>
      <motion.button
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={buttonVariants}
        className={styles['ScrollTopButton']}
        onClick={scrollTop}
      >
        <ArrowSelect className={styles['arrowIcon']} />
      </motion.button>
    </Portal>
  )
}
