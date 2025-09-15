import { memo } from "react";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed md:flex bottom-0 left-0 md:relative z-10 w-full bg-[#001438] md:bg-transparent md:w-[13.75rem] lg:w-[15.625rem] xl:w-[18.75rem] h-[calc(100%-60px)] md:h-full flex-col justify-between pt-6 pb-10 md:shrink-0`}
    >
      <div className="flex flex-col w-full">
        <SidebarButton icon="featured" label="Главное" variant="primary" />
        <SidebarButton icon="ship" label="Корабли" variant="secondary" active />
        <SidebarButton icon="commander" label="Командиры" variant="secondary" />
        <SidebarButton icon="crate" label="Контейнеры" variant="secondary" />
        <SidebarButton icon="instruments" label="Разное" variant="secondary" />
        <SidebarButton
          icon="knot"
          label="Морское единство"
          variant="secondary"
        />
        <SidebarButton
          icon="ten_years"
          label="Десять лет в море"
          variant="secondary"
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <SidebarButton
          icon="gold_and_silver"
          label="Золото и серебро"
          variant="gold"
        />
        <SidebarButton icon="star" label="Купоны" variant="promo" />
      </div>
    </div>
  );
};

export default memo(Sidebar);
