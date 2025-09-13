import Icon, { type IconType } from "../Icon/Icon";
import "./navigation.css";

interface ResourceItemProps {
  value: number | string;
  icon: IconType;
  label: string;
  color?: string;
}

const Navigation = () => {
  const ResourceItem = ({ value, icon, label, color }: ResourceItemProps) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-[2px]">
        <span
          style={{ color }}
          className={`text-base leading-[100%] font-bold`}
        >
          {value}
        </span>
        <Icon icon={icon} className="w-4 h-4" />
      </div>
      <span className="text-xs font-normal opacity-75 w-max">{label}</span>
    </div>
  );

  return (
    <div className="w-full h-[3.75rem] bg-[rgba(0,20,56,0.75)] shrink-0 pl-[22.75rem] pr-[4rem] flex items-center justify-between">
      <div className="flex gap-5 items-center">
        <div className="search-input relative">
          <input
            type="text"
            placeholder="Поиск по названию"
            className="h-[1.875rem] w-[22rem] pl-9 pr-2 border focus:outline-none border-[#172439] focus:border-[rgba(255,255,255,0.45)] hover:border-[rgba(255,255,255,0.45)] bg-[#041228] text-sm"
          />
        </div>
        <Icon icon="volume" className="w-6 h-6" />
      </div>

      <div className="flex gap-5">
        <ResourceItem value={900} icon="coal" label="Уголь" />
        <ResourceItem value={200} icon="steel" label="Сталь" />
        <ResourceItem
          value={14000}
          icon="experience"
          label="Очки исследования"
        />
        <ResourceItem value={150} icon="gold" label="Купить" color="#FFD966" />
        <ResourceItem
          value="58 дней"
          icon="premium"
          label="Купить"
          color="#FFD966"
        />
      </div>
    </div>
  );
};

export default Navigation;
