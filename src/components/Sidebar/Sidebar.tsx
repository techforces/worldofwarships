import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="w-[18.75rem] h-[100%] bg-[rgba(0,0,0,0.2)] flex flex-col">
      <SidebarButton icon="featured" label="Корабли" />
    </div>
  );
};

export default Sidebar;
