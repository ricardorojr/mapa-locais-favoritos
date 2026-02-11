import { Input, type InputProps } from '@headlessui/react';

interface MyInputProps extends InputProps {
  className?: string;
}

export function MyInput({ className, ...props }: MyInputProps) {
  return (
    <Input
      {...props}
      className={`
        w-full rounded-lg border border-slate-300 bg-white py-2 px-4 
        text-sm text-slate-900 shadow-sm transition-all duration-200
        
        /* Estados do Headless UI */
        data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-emerald-500
        data-[focus]:border-transparent
        data-[hover]:border-slate-400
        
        /* Placeholder styling */
        placeholder:text-slate-400
        
        ${className || ''}
      `}
    />
  );
}
