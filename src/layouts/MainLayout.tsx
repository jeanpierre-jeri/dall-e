import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className='w-full bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <div className='max-w-7xl flex justify-between items-center mx-auto'>
          <Link href='/'>
            <Image src='/logo.svg' alt='Logo' className='w-28 object-contain' />
          </Link>

          <Link href='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
            Create
          </Link>
        </div>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh_-_73px)]'>
        <div className='max-w-7xl mx-auto'>
          {children}
        </div>
      </main>
    </>
  )
}

export default MainLayout
