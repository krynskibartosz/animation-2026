// Mock API data for development without database
import { ProductProps } from '@/utils/types'

export const mockApiProducts: ProductProps[] = [
  {
    id: '1',
    ProductName: 'Silver Eagle Coin',
    description: 'Beautiful silver coin with eagle design',
    isFeatured: true,
    mainImages: { obverse: '/images/coin1-obverse.jpg', reverse: '/images/coin1-reverse.jpg' },
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
    mainImages: { obverse: '/images/coin2-obverse.jpg', reverse: '/images/coin2-reverse.jpg' },
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
    mainImages: { obverse: '/images/coin3-obverse.jpg', reverse: '/images/coin3-reverse.jpg' },
    additionalImages: [],
    slug: 'platinum-buffalo-coin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    ProductName: 'American Gold Eagle',
    description: 'Classic American gold coin',
    isFeatured: false,
    mainImages: { obverse: '/images/coin4-obverse.jpg', reverse: '/images/coin4-reverse.jpg' },
    additionalImages: [],
    slug: 'american-gold-eagle',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    ProductName: 'Canadian Maple Leaf',
    description: 'Premium Canadian silver coin',
    isFeatured: false,
    mainImages: { obverse: '/images/coin5-obverse.jpg', reverse: '/images/coin5-reverse.jpg' },
    additionalImages: [],
    slug: 'canadian-maple-leaf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const mockCategories = [
  { id: '1', name: 'Silver Coins' },
  { id: '2', name: 'Gold Coins' },
  { id: '3', name: 'Platinum Coins' },
  { id: '4', name: 'Rounds' }
]

export const mockUser = {
  id: '1',
  email: 'admin@masonmint.com',
  name: 'Admin User',
  role: 'admin'
}
