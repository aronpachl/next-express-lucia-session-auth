import { forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ ...props }, ref) => {
        return <button ref={ref} {...props} className={'py-2 px-6 text-md font-semibold uppercase bg-green-500 rounded-lg w-full text-white'} />
    }
)
