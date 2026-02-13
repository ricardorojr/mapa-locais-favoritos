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
      <Dialog onClose={onClose} className="relative z-50">
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

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl relative z-[9999]">
              <DialogTitle className="text-lg font-bold text-secondary-900 mb-4">
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
                  <p className="text-[10px] font-bold text-secondary-400 uppercase">
                    Coordenadas
                  </p>
                  <p className="text-xs text-secondary-600 font-mono">
                    Lat: {coords?.[0].toFixed(6)} | Lng:{" "}
                    {coords?.[1].toFixed(6)}
                  </p>
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
                    className="flex-1"
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
