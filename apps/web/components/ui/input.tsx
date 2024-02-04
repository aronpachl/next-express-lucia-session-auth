import { forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ ...props }, ref) => {
    return <input ref={ref} {...props} className={'px-2.5 py-2 border border-black/20 text-sm rounded-lg block'} />
})
