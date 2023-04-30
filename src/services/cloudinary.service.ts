import { v2 as cloudinary } from 'cloudinary'
import { getEnv } from '@/config/env'

cloudinary.config({
  cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnv('CLOUDINARY_API_KEY'),
  api_secret: getEnv('CLOUDINARY_API_SECRET')
})

export const uploadImage = async (image: string) => {
  if (image === '') return { url: '' }
  const { secure_url: url } = await cloudinary.uploader.upload(image, { upload_preset: 'dalle' })

  return { url }
}
