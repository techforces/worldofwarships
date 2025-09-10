import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="w-[18.75rem] h-[100%] flex flex-col justify-between pt-6 pb-10">
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

export default Sidebar;
