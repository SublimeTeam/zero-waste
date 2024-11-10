import { Link, useNavigate, useParams } from "react-router-dom";
import { stores } from "../../data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { creditCardSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "@/hooks/useUserContext";
import { useUsers } from "@/hooks/useUsers";

export const PlaceOrder = () => {
  const { id, packageId } = useParams();
  const { user } = useUserContext();
  const { makeOrder } = useUsers();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(creditCardSchema),
  });

  const navigate = useNavigate();

  if (!id || !packageId || !stores[id as unknown as number]) {
    return (
      <div>
        <Link to="/">
          <Button variant="link">
            <ChevronLeft size={16} /> voltar
          </Button>
        </Link>
        <h2 className="flex gap-1 items-center font-semibold md:text-xl mt-3">
          Pedido não encontrado
        </h2>
      </div>
    );
  }

  const { name, address, packages } = stores[id as unknown as number];
  const { name: packageName, price: packagePrice } =
    packages[packageId as unknown as number];

  const onSubmit = async () => {
    await makeOrder(user?.email || "", {
      id: Date.now().toString(),
      name: packageName,
      businessName: name,
      date: new Date().toLocaleDateString(),
      status: "preparado",
    });

    navigate("/orders");
  };

  return (
    <div>
      <Link to="/">
        <Button variant="link">
          <ChevronLeft size={16} /> voltar
        </Button>
      </Link>
      <div className="flex flex-col gap-3">
        <div className="bg-white py-3 px-4 flex gap-2 flex-col rounded-sm">
          <div>
            <h3 className="text-lg font-bold">{packageName}</h3>
            <p className="text-gray-500">{name}</p>
            <p className="text-gray-500 flex items-center gap-1">
              <MapPin size={14} /> {address}
            </p>
            <span className="text-2xl text-emerald-600 font-bold">
              {packagePrice}
            </span>
          </div>
        </div>

        <h2 className="flex gap-1 items-center font-semibold md:text-xl mt-3">
          Forma de Pagamento
        </h2>
        <form className="flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="">
              Número do Cartão
              <Input
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={16}
                {...register("cardNumber")}
              />
            </label>
            <span className="text-red-600">{errors.cardNumber?.message}</span>
          </div>
          <div className="flex w-full gap-2">
            <div className="flex-1">
              <label htmlFor="cvv-input">
                CVV
                <Input
                  type="text"
                  id="cvv-input"
                  placeholder="000"
                  maxLength={3}
                  {...register("cvv")}
                />
              </label>
              <span className="text-red-600">{errors.cvv?.message}</span>
            </div>
            <div className="flex-1">
              <label htmlFor="card-date-input">
                Data de Vencimento
                <Input
                  type="date"
                  id="card-date-input"
                  placeholder="00/00"
                  {...register("expirationDate")}
                />
              </label>
              <span className="text-red-600">
                {errors.expirationDate?.message}
              </span>
            </div>
          </div>
          <Button className="bg-emerald-800 w-full mt-4">
            Confirmar Reserva
          </Button>
        </form>
      </div>
    </div>
  );
};
