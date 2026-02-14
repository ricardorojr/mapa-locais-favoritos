import { useEffect } from "react";
import { useGlobalError } from "../../shared/errors/error-provider/error-context";
import { cn } from "../../shared/utils/cn";

export function ErrorToast() {
  const { error, clearError } = useGlobalError();

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      clearError();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div
      className={cn(
        "fixed transition-all duration-300",
        "z-10000",
        "top-4 right-4",
        "max-[320px]:top-2 max-[320px]:right-2",
      )}
    >
      <div
        className={cn(
          "bg-secondary-50 border shadow-xl rounded-xl px-5 py-4 animate-slide-in",
          "border-alert-danger/20",
          "w-80",
          "max-[350px]:w-[calc(100vw-24px)]",
          "max-[320px]:px-3 max-[320px]:py-3",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium text-secondary-900 leading-tight",
                "overflow-wrap-anywhere",
              )}
            >
              {error}
            </p>
          </div>

          <button
            onClick={clearError}
            className="text-secondary-600 hover:text-secondary-900 transition-colors shrink-0 p-1"
          >
            <span className="text-lg font-bold leading-none">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
