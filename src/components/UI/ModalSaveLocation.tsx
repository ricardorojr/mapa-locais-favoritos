import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { TextInput } from "./TextInput";
import { ButtonBase } from "./ButtonBase";
import { cn } from "../../shared/utils/cn";

interface ModalSaveLocationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => boolean;
  coords: [number, number] | null;
}

export function ModalSaveLocation({
  isOpen,
  onClose,
  onConfirm,
  coords,
}: ModalSaveLocationProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen && (name !== "" || error !== null)) {
    setName("");
    setError(null);
  }

  const handleConfirm = () => {
    if (!name.trim()) return;
    if (onConfirm(name)) {
      onClose();
    } else {
      setError("Este endereço já está nos seus favoritos!");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative"
        style={{ zIndex: "var(--z-index-modal)" }}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div
          className={cn(
            "fixed inset-0 flex p-4 transition-all",
            "items-center justify-center",
            "max-[354px]:justify-end max-[354px]:items-center",
          )}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={cn(
                "w-full max-w-md rounded-xl bg-secondary-50 p-6 shadow-2xl relative",
                "max-[320px]:max-w-70 max-[320px]:p-4",
              )}
            >
              <DialogTitle className="text-lg font-bold text-secondary-600 mb-4">
                Salvar Local Favorito
              </DialogTitle>

              <div className="space-y-4">
                <TextInput
                  label="Nome do Local"
                  placeholder="Ex: Casa, Trabalho..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  error={!!error}
                  errorMessage={error || ""}
                  autoFocus
                />
                <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                  <p className="text-[10px] font-bold text-secondary-600 uppercase mb-1">
                    Coordenadas
                  </p>
                  <div
                    className={cn(
                      "text-xs text-secondary-600 font-mono flex gap-2",
                      "max-[325px]:flex-col max-[325px]:gap-0.5",
                    )}
                  >
                    <span>Lat: {coords?.[0].toFixed(6)}</span>
                    <span className="max-[325px]:hidden text-secondary-200">
                      |
                    </span>
                    <span>Lng: {coords?.[1].toFixed(6)}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <ButtonBase
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancelar
                  </ButtonBase>
                  <ButtonBase
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white"
                    disabled={!name.trim()}
                    onClick={handleConfirm}
                  >
                    Confirmar
                  </ButtonBase>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
