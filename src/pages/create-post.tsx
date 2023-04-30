import { ChangeEvent, FormEvent, useState } from 'react'
import { FormField, Loader } from '../components'
import { getRandomPrompt } from '../utils'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function CreatePost () {
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    image: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const generateImage = async () => {
    if (form.prompt !== '') {
      setGeneratingImg(true)
      try {
        const { photo } = await fetch('/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        }).then(async (res) => await res.json() as { photo: string }).catch(err => { throw new Error(err) })

        setForm((form) => ({ ...form, image: `data:image/jpeg;base64,${photo}` }))
      } catch (err) {
        console.error(err)
        window.alert('There was an error creating the image')
      } finally {
        setGeneratingImg(false)
      }

      return
    }

    window.alert('Please enter a prompt')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.prompt === '' || form.image === '') {
      window.alert('Please enter a promp and an image')
      return
    }

    try {
      setLoading(true)
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }).then(async (res) => await res.json()).catch(err => { throw new Error(err) })
      void router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setForm({
        name: '',
        prompt: '',
        image: ''
      })
    }
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm((form) => ({
      ...form,
      prompt: randomPrompt
    }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-4xl'>Create</h1>
        <p className='mt-2 text-[#666e75] text-base max-w-lg'>
          Create imaginative and visually stunning images through DALL-E AI and share them with the community
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your name'
            type='text'
            name='name'
            placeHolder='John Doe'
            value={form.name}
            onChange={handleChange}
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeHolder='an armchair in the shape of an avocado'
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            value={form.prompt}
            onChange={handleChange}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.image !== ''
              ? (
                <Image src={form.image} alt={form.prompt} className='w-full h-full object-contain' />
                )
              : (
                <Image src='/preview.png' alt='Preview Image' className='w-9/12 h-9/12 object-contain opacity-40' />
                )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-black/50 rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            disabled={generatingImg}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Genrating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2  text-[#666e75] text-sm'>
            Once you have created the image you want, you can share it with others in the community
          </p>

          <input
            type='submit'
            value={loading ? 'Sharing...' : 'Share with the community'}
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer'
          />
        </div>
      </form>
    </section>
  )
}
