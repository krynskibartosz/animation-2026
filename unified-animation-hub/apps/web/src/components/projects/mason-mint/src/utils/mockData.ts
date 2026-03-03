// Mock data for development without database
import { ProductProps } from '@mason-mint/utils/types'

export const mockProducts: ProductProps[] = [
  {
    id: '1',
    ProductName: 'Silver Eagle Coin',
    description: 'Beautiful silver coin with eagle design',
    isFeatured: true,
    mainImages: { obverse: '/projects/mason-mint/images/coin1-obverse.jpg', reverse: '/projects/mason-mint/images/coin1-reverse.jpg' },
    additionalImages: [],
    slug: 'silver-eagle-coin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    ProductName: 'Golden Liberty Round',
    description: 'Stunning golden round with liberty design',
    isFeatured: true,
    mainImages: { obverse: '/projects/mason-mint/images/coin2-obverse.jpg', reverse: '/projects/mason-mint/images/coin2-reverse.jpg' },
    additionalImages: [],
    slug: 'golden-liberty-round',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    ProductName: 'Platinum Buffalo Coin',
    description: 'Exclusive platinum coin with buffalo design',
    isFeatured: true,
    mainImages: { obverse: '/projects/mason-mint/images/coin3-obverse.jpg', reverse: '/projects/mason-mint/images/coin3-reverse.jpg' },
    additionalImages: [],
    slug: 'platinum-buffalo-coin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
