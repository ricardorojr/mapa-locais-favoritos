import { ButtonBase } from "../../ui/ButtonBase";
import { StarIcon } from "../../../assets/icons/StarIcon";

interface LocationPopupProps {
  addressLines: string[];
  isFetching: boolean;
  onSave: () => void;
  disabled?: boolean;
}

export function LocationPopup({
  addressLines,
  isFetching,
  onSave,
  disabled,
}: LocationPopupProps) {
  return (
    <div className="text-sm p-1 max-w-[100]">
      <strong className="text-primary-700 block mb-1">Localização:</strong>
      <div className="text-secondary-600 leading-tight mb-2">
        {isFetching ? (
          <span className="animate-pulse">Buscando endereço...</span>
        ) : (
          addressLines.map((addr, i) => <div key={i}>{addr}</div>)
        )}
      </div>
      {!disabled && (
        <ButtonBase
          size="sm"
          className="w-full text-[12px] flex items-center justify-center"
          onClick={onSave}
          disabled={disabled}
        >
          <StarIcon size={14} className="fill-white" />
          Salvar Favorito
        </ButtonBase>
      )}
    </div>
  );
}
