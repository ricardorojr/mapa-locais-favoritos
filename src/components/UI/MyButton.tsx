import { Button, type ButtonProps } from '@headlessui/react';
import React from 'react';

interface MyButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function MyButton({ children, className, ...props }: MyButtonProps) {
  return (
     <Button
      {...props}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg 
        bg-emerald-700 py-2 px-4 text-sm font-bold text-white 
        shadow-md transition-all duration-200 hover:bg-emerald-500 focus:outline-none focus:ring-2
        cursor-pointer gradient-to-r
        ${className || ''}
      `}
    >
      {children}
    </Button>
  );
}
