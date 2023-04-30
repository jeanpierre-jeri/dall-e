import mongoose from 'mongoose';
import { saveAs } from 'file-saver'
import { surpriseMePrompts } from '../constants'
import { getEnv } from '@/config/env';

export function getRandomPrompt (prompt: string): string {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPrompt = surpriseMePrompts[randomIndex]

  if (randomPrompt === prompt) return getRandomPrompt(prompt)

  return randomPrompt
}

export function downloadImage (id: string, photo: string) {
  saveAs(photo, `download-${id}.jpg`)
}


export const connectMongo = async () => {

  if(mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  }

  mongoose.set('strictQuery', true)
  return mongoose.connect(getEnv('MONGO_URI'))
}
