import { NextApiResponse, NextApiRequest } from 'next'
import db from '@mason-mint/utils/db'
import { getError } from '@mason-mint/utils/error'
import Product from '../../../../models/Product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Skip database connection if disabled
    if (process.env.DISABLE_MONGODB === 'true') {
      console.log('Using mock single product - MongoDB disabled')
      const { mockApiProducts } = await import('@mason-mint/utils/mockApiData')
      const product = mockApiProducts.find(p => p.id === req.query.id)
      
      if (product) {
        res.status(200).json({ success: true, data: product })
      } else {
        res.status(404).json({ success: false, message: 'Product not found' })
      }
      return
    }

    await db.connect()
    const product = await Product.findOne({ id: req.query.id })
    // await db.disconnect()
    if (product) {
      res.status(200).json({ success: true, data: product })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
