import { UserOrder } from "@/types/User";
import { Badge } from "./badge";
import { Button } from "./button";

type ReadyPackageProps = {
  order: UserOrder;
  onConfirm: (order: UserOrder) => void;
  onCancel: (order: UserOrder) => void;
};

export const ReadyPackage = ({
  order,
  onConfirm,
  onCancel,
}: ReadyPackageProps) => {
  return (
    <div className="bg-white px-5 py-4 rounded-sm flex flex-col gap-2">
      <Badge label="Pronto para retirada" />

      <h2 className="text-lg font-semibold">{order.name}</h2>

      <div>
        <p className="font-medium">Horário de retirada: 12:00 - 17:00</p>
        <p className="text-gray-600">{order.businessName}</p>
        <p className="text-gray-600">N #{order.id}</p>
      </div>

      <div className="inline-flex gap-2 md:flex-row flex-col">
        <Button
          size="sm"
          className="w-full bg-emerald-600"
          onClick={() => onConfirm(order)}
        >
          Confirmar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="w-full"
          onClick={() => onCancel(order)}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
