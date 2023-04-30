import { Inter } from 'next/font/google'
import MainLayout from '@/layouts/MainLayout'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { SWRConfig } from 'swr'

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  display: 'swap'
})

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Image Generator</title>
      </Head>
      <SWRConfig value={{ fallback: pageProps.fallback }}>
        <div className={inter.className}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </div>
      </SWRConfig>
    </>
  )
}
