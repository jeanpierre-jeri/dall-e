import Post from '@/models/post.model'
import { uploadImage } from '@/services/cloudinary.service'
import { connectMongo } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb'
    }
  }
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectMongo()
      const posts = await Post.find().sort({ createdAt: 'desc' })

      return res.status(200).json({ success: true, data: posts })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false })
    }
  }

  if (req.method === 'POST') {
    const { name, prompt, image = '' } = req.body as { name: string, prompt: string, image: string }

    try {
      await connectMongo()
      const { url } = await uploadImage(image)

      const newPost = await Post.create({
        name,
        prompt,
        photo: url
      })

      return res.status(200).json({ success: true, data: { name: newPost.name, prompt: newPost.prompt, image: newPost.photo, _id: newPost._id } })
    } catch (error) {
      console.error('post controller error', error)
      return res.status(500).json({ success: false, error })
    }
  }

  return res.status(405).end()
}
