import { useEffect } from "react";
import { useGlobalError } from "../../shared/errors/error-provider/error-context";

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
  }, [error]);

  if (!error) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div className="bg-white border border-red-200 shadow-xl rounded-xl px-5 py-4 w-80 animate-slide-in">
        <div className="flex items-start gap-3">
          <div className="text-red-500 text-lg">⚠️</div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{error}</p>
          </div>

          <button
            onClick={clearError}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
