import { Card } from './Card'
import type { Post } from '../types'

interface RenderCardsProps {
  data: Post[]
  title: string
}

export function RenderCards ({ data = [], title }: RenderCardsProps) {
  if (data.length === 0) return <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  return (
    <>
      {data.map((post) => (
        <Card key={post._id} {...post} />
      ))}
    </>
  )
}
