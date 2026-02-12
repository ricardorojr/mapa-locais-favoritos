import { Input, type InputProps } from "@headlessui/react";
import { cn } from "../../utils/cn";

interface TextInputProps extends InputProps {
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

export function TextInput({
  className,
  error,
  errorMessage,
  label,
  ...props
}: TextInputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-bold text-secondary-600 uppercase tracking-wider ml-1">
          {label}
        </label>
      )}

      <Input
        {...props}
        className={cn(
          "w-full rounded-lg border bg-white py-2 px-4 text-sm transition-all duration-200 shadow-sm",
          "placeholder:text-secondary-600 text-secondary-900",
          "border-secondary-600 data-[hover]:border-secondary-900",
          "data-[focus]:outline-2 data-[focus]:outline-primary-500 data-[focus]:border-transparent",
          error && [
            "border-alert-danger text-alert-danger",
            "data-[focus]:outline-alert-danger data-[focus]:border-transparent",
            "placeholder:text-alert-danger/50",
          ],
          "disabled:opacity-none disabled:bg-secondary-50 disabled:cursor-not-allowed",
          className,
        )}
      />
      {error && errorMessage && (
        <span className="text-[11px] font-medium text-alert-danger ml-1 animate-in fade-in slide-in-from-top-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
