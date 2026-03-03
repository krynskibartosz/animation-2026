import { NextApiRequest, NextApiResponse } from 'next'
import db from '@mason-mint/utils/db'
import CategoryModel from '../../../models/Category'
import { getError } from '@mason-mint/utils/error'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Skip database connection if disabled
    if (process.env.DISABLE_MONGODB === 'true') {
      console.log('Using mock categories - MongoDB disabled')
      const { mockCategories } = await import('@mason-mint/utils/mockApiData')
      res.status(200).json({
        success: true,
        data: mockCategories,
      })
      return
    }

    await db.connect()
    const categories = await CategoryModel.find().sort({ name: 1 })
    // await db.disconnect()
    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
