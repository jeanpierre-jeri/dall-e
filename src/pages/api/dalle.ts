import { openai } from '@/services/openai.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body as { prompt: string }

  if (prompt.trim() === '') return res.status(400).end()

  try {
    const { data } = await openai.createImage({ prompt, n: 1, size: '1024x1024', response_format: 'b64_json' })

    const image = data.data[0].b64_json
    return res.status(200).json({ photo: image })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
