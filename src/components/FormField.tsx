
interface FormFieldProps {
  labelName: string
  type: string
  name: string
  placeHolder: string
  isSurpriseMe?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSurpriseMe?: () => void
}

export function FormField (props: FormFieldProps) {
  const { labelName, name, placeHolder, type, isSurpriseMe = false, value, onChange, handleSurpriseMe } = props
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-md text-black'
          >
            Surprise me
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeHolder}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
