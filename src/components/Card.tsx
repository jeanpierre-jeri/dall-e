import { downloadImage } from '../utils'
import type { Post } from '../types'
import Image from 'next/image'

export function Card ({ _id, name, prompt, photo }: Post) {
  return (
    <article className='rouded-xl group relative shadow-card hover:shadow-cardhover card'>
      <Image src={photo} alt={prompt} className='w-full h-auto object-cover rounded-xl' width={311} height={311} priority />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>

        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <h3 className='w-7 aspect-square rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>{name[0]}</h3>
            <p className='text-white text-sm'>{name}</p>
          </div>

          <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
            <Image src='/download.png' alt='Download' width={24} height={24} className='aspect-square object-contain invert' />
          </button>
        </div>
      </div>
    </article>
  )
}
