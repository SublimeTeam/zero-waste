import { Badge } from "@/components/ui/badge";
import { stores } from "../data";
import { ChevronLeft, Package, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export const Store = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const store = useMemo(
    () => stores.find((store) => store.id === Number(id)),
    [id]
  );

  if (!id || !store) {
    return (
      <div>
        <Link to="/">
          <Button variant="link">
            <ChevronLeft size={16} /> voltar
          </Button>
        </Link>
        <h2 className="flex gap-1 items-center font-semibold md:text-xl mt-3">
          Loja não encontrada
        </h2>
      </div>
    );
  }

  const { name, address, status, rating, packages } =
    stores[id as unknown as number];

  return (
    <div>
      <Button variant="link" onClick={() => navigate(-1)}>
        <ChevronLeft size={16} /> voltar
      </Button>
      <div className="flex flex-col gap-3">
        <div className="bg-white py-3 px-4 flex gap-2 flex-col rounded-sm">
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <Badge label={status} />
            <p className="text-gray-500">
              Horário de funcionamento: 09:00 - 18:00
            </p>
            <p className="text-gray-500">{address}</p>
            <span className="flex items-center text-sm gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  fill={index < rating ? "currentColor" : "transparent"}
                  size={14}
                />
              ))}
            </span>
          </div>
        </div>

        <h2 className="flex gap-1 items-center font-semibold md:text-xl mt-3">
          <Package />
          Pacotes
        </h2>

        <div className="flex flex-col gap-2">
          {packages.map(({ name, description, price }, index) => (
            <div className="flex flex-col gap-2 bg-white rounded-sm px-5 py-4">
              <div className="flex justify-between">
                <h3 className="font-semibold md:text-xl">{name}</h3>
                <p className="text-xl font-semibold text-emerald-600">
                  {price}
                </p>
              </div>
              <p>{description}</p>
              <Link to={`/${id}/${index}`}>
                <Button className="bg-emerald-800 w-full">Reservar</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
