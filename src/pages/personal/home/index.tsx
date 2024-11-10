import { Address } from "@/components/ui/address";
import { Badge } from "@/components/ui/badge";
import { BottomTab } from "@/components/ui/bottom-tab";
import { Button } from "@/components/ui/button";
import { Star, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { stores } from "../data";
import { useUserContext } from "@/hooks/useUserContext";
import { Categories } from "@/components/categories";
import { ReadyPackage } from "@/components/ui/ready-package";
import { useEffect, useState } from "react";
import { UserOrder } from "@/types/User";
import { useUsers } from "@/hooks/useUsers";

export const Home = () => {
  const { user, logout } = useUserContext();
  const { getDataCallback, updateOrder } = useUsers();
  const [data, setData] = useState<UserOrder[]>([]);

  useEffect(() => {
    if (user?.email) {
      getDataCallback(user?.email, "email", (res) =>
        setData(res?.orders || [])
      );
    }
  }, [getDataCallback, user?.email]);

  const readyPackages = data.filter(({ status }) => status === "preparado");

  const navigate = useNavigate();
  const handleCategorySelect = (category: string) => {
    navigate(`/discover?category=${category}`);
  };

  return (
    <div>
      <header className="flex justify-between">
        <Address />
        <Button
          size="sm"
          variant="ghost"
          className="text-red-500 gap-2"
          onClick={logout}
        >
          <LogOut size="16" /> Sair
        </Button>
      </header>

      <main className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold mt-3">Olá, {user?.username}.</h1>

        {readyPackages.map((order) => (
          <ReadyPackage
            order={order}
            onConfirm={(order) => {
              if (!user?.email) return;
              updateOrder(user?.email, { ...order, status: "entregue" });
            }}
            onCancel={(order) => {
              if (!user?.email) return;
              updateOrder(user?.email, { ...order, status: "cancelado" });
            }}
          />
        ))}
        <Categories onCategorySelect={handleCategorySelect} />

        <h2 className="font-semibold md:text-xl mt-3">Próximos a você</h2>

        <div className="grid grid-cols-2 gap-3">
          {stores.map(({ categoria, name, rating, id }) => (
            <Link to={`/${id}`}>
              <div className="bg-white py-3 px-4 flex gap-2 flex-col rounded-sm">
                <div className="bg-gray-300 font-bold text-xl h-16 w-16 flex items-center justify-center rounded-full self-center">
                  {name.split(" ")[0].slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <h4 className="font-medium text-ellipsis text-nowrap overflow-hidden">
                    {name}
                  </h4>
                  <Badge label={categoria} />
                </div>

                <span className="flex items-center text-sm gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      fill={index < rating ? "currentColor" : "transparent"}
                      size={14}
                    />
                  ))}
                </span>

                <span className="flex items-center text-xs text-gray-600">
                  09:00 às 18:00
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <BottomTab activeIndex={0} />
    </div>
  );
};
