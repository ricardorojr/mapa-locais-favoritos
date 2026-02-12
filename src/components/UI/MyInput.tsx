import { Input, type InputProps } from "@headlessui/react";

interface MyInputProps extends InputProps {
  className?: string;
  error?: boolean; // Prop para ativar o estado de erro
  errorMessage?: string; // Texto que aparecerá abaixo
}

export function MyInput({
  className,
  error,
  errorMessage,
  ...props
}: MyInputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <Input
        {...props}
        className={`
          w-full rounded-lg border bg-white py-2 px-4 
          text-sm text-slate-900 shadow-sm transition-all duration-200
          ${
            error
              ? "border-red-500 focus:outline-red-500"
              : "border-slate-300 data-[focus]:outline-emerald-500 data-[focus]:outline-2"
          }
          data-[focus]:border-transparent
          data-[hover]:border-slate-400
          placeholder:text-slate-400
          ${className || ""}
        `}
      />
      {error && errorMessage && (
        <span className="text-[11px] font-medium text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
