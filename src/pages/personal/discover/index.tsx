import { Address } from "@/components/ui/address";
import { BottomTab } from "@/components/ui/bottom-tab";
import { Button } from "@/components/ui/button";
import { InputSearch } from "@/components/ui/input-search";
import { LogOut, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { stores } from "../data";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Categories } from "@/components/categories";
import { useUserContext } from "@/hooks/useUserContext";

export const Discover = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { logout } = useUserContext();

  const activeCategory = searchParams.get("category");

  const checkCategory = (item: (typeof stores)[number]) => {
    if (!activeCategory) return true;
    return item.categoria === activeCategory;
  };

  const activeBusinessName = searchParams.get("name");

  const checkBusinessName = (item: (typeof stores)[number]) => {
    if (!activeBusinessName) return true;
    return item.name.toLowerCase().includes(activeBusinessName.toLowerCase());
  };

  const fiteredStores = stores.filter((store) =>
    [checkCategory, checkBusinessName].every((check) => check(store))
  );

  const handleCategorySelect = (newCategory: string) => {
    setSearchParams((prev) => {
      const category = prev.get("category");

      prev.delete("category");

      if (category !== newCategory) {
        prev.append("category", newCategory);
      }

      return prev;
    });
  };

  const handleBusinessNameSearch = (name: string) => {
    setSearchParams((prev) => {
      const oldName = prev.get("name");

      prev.delete("name");

      if (oldName !== name) {
        prev.append("name", name);
      }

      return prev;
    });
  };

  return (
    <div>
      <header className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between">
          <Address />
          <Button
            size="sm"
            variant="ghost"
            className="text-red-500 gap-2"
            onClick={() => logout()}
          >
            <LogOut size="16" /> Sair
          </Button>
        </div>
        <InputSearch
          onChange={(e) => handleBusinessNameSearch(e.target.value)}
          onClean={() => setSearchParams({})}
          placeholder="Digite o nome de um estabelecimento"
        />

        <div>
          <h2 className="text-xs font-bold">Categorias</h2>
          <Categories
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </header>

      <main>
        {fiteredStores.length ? (
          <div className="flex flex-col gap-3">
            {fiteredStores.map(
              ({ id, address, name, rating, status, packages }) => (
                <Link to={`/${id}`} key={id}>
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
                            key={`${name}-star-${index}`}
                            fill={
                              index < rating ? "currentColor" : "transparent"
                            }
                            size={14}
                          />
                        ))}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 h-15 gap-2">
                      {packages.map(({ name: packageName, price }) => (
                        <div
                          key={`${name}-${packageName}`}
                          className="border border-emerald-500 h-full p-3 text-center rounded-sm"
                        >
                          <h4 className="text-sm font-bold">{packageName}</h4>
                          <p className="text-gray-500 text-lg">{price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-center text-xl font-bold pb-2">
              Sem resultados
            </h2>
            <p className="text-center text-gray-500">
              Talvez o estabelecimento o qual procura ainda não esteja no nosso
              site
            </p>
          </div>
        )}
      </main>
      <BottomTab activeIndex={1} />
    </div>
  );
};
