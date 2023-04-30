import { Configuration, OpenAIApi } from 'openai'
import { getEnv } from '@/config/env'

const configuration = new Configuration({
  apiKey: getEnv('OPENAI_API_KEY')
})

export const openai = new OpenAIApi(configuration)
