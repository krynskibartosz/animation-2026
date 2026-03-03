import { NextApiResponse, NextApiRequest } from 'next'
import db from '@mason-mint/utils/db'
import { getError } from '@mason-mint/utils/error'
import Product from '../../../models/Product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { category = null, search = '' },
  } = req

  const categories: string[] = category ? category.toString().split(',') : []
  const filter: {
    'category.id'?: string[]
    ProductName?: object
  } = {}

  if (categories.length) {
    filter['category.id'] = categories
  }

  if (search) {
    filter.ProductName = { $regex: search, $options: 'i' }
  }

  try {
    // Skip database connection if disabled
    if (process.env.DISABLE_MONGODB === 'true') {
      console.log('Using mock products - MongoDB disabled')
      const { mockApiProducts } = await import('@mason-mint/utils/mockApiData')
      
      // Apply filters if provided
      let filteredProducts = mockApiProducts
      if (req.query.isFeatured === 'true') {
        filteredProducts = mockApiProducts.filter(p => p.isFeatured)
      }
      
      res.status(200).json({ success: true, data: filteredProducts })
      return
    }

    await db.connect()
    const products = await Product.find(filter)
    // await db.disconnect()
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
