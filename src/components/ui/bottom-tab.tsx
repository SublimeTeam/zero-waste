import clsx from "clsx";
import { Button } from "./button";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Início",
    href: "/",
  },
  {
    name: "Buscar",
    href: "/discover",
  },
  {
    name: "Pedidos",
    href: "/orders",
  },
];

export const BottomTab = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="bg-white h-14 fixed bottom-0 left-0 w-full flex items-center justify-center shadow-md">
      {links.map(({ name, href }, index) => (
        <Link to={href} key={name}>
          <Button
            variant="link"
            size="sm"
            className={clsx("font-normal", {
              "font-bold": activeIndex === index,
            })}
          >
            {name}
          </Button>
        </Link>
      ))}
    </div>
  );
};
