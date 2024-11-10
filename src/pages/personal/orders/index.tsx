import { Badge } from "@/components/ui/badge";
import { BottomTab } from "@/components/ui/bottom-tab";
import { ReadyPackage } from "@/components/ui/ready-package";
import { useUserContext } from "@/hooks/useUserContext";
import { useUsers } from "@/hooks/useUsers";
import { UserOrder } from "@/types/User";
import { useEffect, useState } from "react";

export const Orders = () => {
  const { user } = useUserContext();
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
  const otherPackages = data.filter(({ status }) => status !== "preparado");

  return (
    <div>
      <main className="flex flex-col gap-5">
        <div>
          <h1 className="text-lg font-semibold mb-3">Minhas reservas</h1>
          {!readyPackages.length ? (
            <div> Não há pedidos esperando para serem retirados</div>
          ) : (
            readyPackages.map((order) => (
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
            ))
          )}
        </div>

        {otherPackages.length ? (
          <>
            <h2 className="font-semibold md:text-xl mt-3">
              Últimos pacotes retirados
            </h2>

            <div className="flex flex-col gap-2">
              {otherPackages.map(({ businessName, date, id, name, status }) => (
                <div className="bg-white rounded-sm px-5 py-4">
                  <Badge
                    label={status}
                    variant={status === "cancelado" ? "destructive" : "default"}
                  />
                  <h3 className="font-semibold md:text-xl mb-2">
                    {businessName}
                  </h3>
                  <p>{date}</p>
                  <p> Pacote - {name}</p>
                  <p>N #{id}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </main>
      <BottomTab activeIndex={2} />
    </div>
  );
};
