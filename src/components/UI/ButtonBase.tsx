import { Button, type ButtonProps } from "@headlessui/react";
import { cn } from "../../shared/utils/cn";

interface ButtonBaseProps extends ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function ButtonBase({
  variant = "primary",
  size = "md",
  isLoading,
  className,
  children,
  ...props
}: ButtonBaseProps) {
  const variants = {
    primary:
      "bg-primary-500 text-white data-[hover]:bg-primary-600 data-[active]:bg-primary-700 data-[focus]:outline-primary-500",
    secondary:
      "bg-secondary-200 text-secondary-900 data-[hover]:bg-secondary-300 data-[focus]:outline-secondary-600",
    danger:
      "bg-alert-danger text-white data-[hover]:bg-red-600 data-[active]:bg-red-700 data-[focus]:outline-alert-danger",
    outline:
      "border-2 border-secondary-200 bg-transparent text-secondary-600 data-[hover]:bg-secondary-50 data-[focus]:outline-primary-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <Button
      {...props}
      disabled={props.disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200",
        "cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Carregando...</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
