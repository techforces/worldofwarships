import {
  useState,
  useMemo,
  useDeferredValue,
  useRef,
  useCallback,
  useEffect,
  type ChangeEvent,
} from "react";
import Icon, { type IconType } from "../Icon/Icon";
import "./navigation.css";
import type { VehicleList } from "../../utils/queryTypes";
import { toRoman } from "../../utils/utils";

interface NavigationProps {
  data: VehicleList;
  setItemIndex: (index: number) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (val: boolean) => void;
}

interface ResourceItemProps {
  value: number | string;
  icon: IconType;
  label: string;
  color?: string;
}

const Navigation = ({
  data,
  setItemIndex,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: NavigationProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const deferredQuery = useDeferredValue(query);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLocaleLowerCase();
    if (!q) return null;
    return data.vehicles.filter((vehicle) =>
      vehicle.title.toLocaleLowerCase().includes(q)
    );
  }, [data, deferredQuery]);

  const handleSearchClick = (title: string) => {
    const originalIndex = data.vehicles.findIndex(
      (vehicle) => vehicle.title == title
    );

    setItemIndex(originalIndex);
  };

  const closeSearch = useCallback(
    (e: MouseEvent) => {
      if (
        isOpen &&
        inputContainerRef.current &&
        !inputContainerRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    },
    [inputContainerRef, isOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeSearch);
  }, [closeSearch]);

  const ResourceItem = ({ value, icon, label, color }: ResourceItemProps) => (
    <div className="flex flex-col ">
      <div className="flex items-center gap-[2px]">
        <span
          style={{ color }}
          className={`text-base leading-[100%] font-bold hidden lg:block`}
        >
          {value}
        </span>
        <Icon icon={icon} className="w-4 h-4 shrink-0 " />
      </div>
      <span className="text-xs font-normal opacity-75 w-max hidden xl:block">
        {label}
      </span>
    </div>
  );

  const SearchResult = () => (
    <div className="absolute top-[100%] left-0 w-full min-h-0 overflow-y-auto max-h-[min(30rem,70vh)] bg-[rgba(255,255,255,0.05)] backdrop-blur-2xl justify-center z-2">
      {filtered && filtered.length != 0 && isOpen ? (
        <>
          {filtered.map((vehicle, index) => (
            <button
              key={`${index}-filtered-vehicle-idx`}
              onClick={() => {
                handleSearchClick(vehicle.title);
              }}
              className="flex w-full items-center px-4 py-2 gap-2"
            >
              <Icon icon={vehicle.nation.name as IconType} />
              <span className="w-6 text-center">{toRoman(vehicle.level)}</span>
              <span className="uppercase">{vehicle.title}</span>
              <Icon icon={vehicle.type.name as IconType} />
            </button>
          ))}
        </>
      ) : (
        <>
          {query != "" && isOpen && (
            <span className="block text-sm p-4">Ничего не найдено</span>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="bg-[rgba(0,20,56,0.75)] flex justify-center w-full">
      <div className="w-full h-[3.75rem] max-w-[120rem] shrink-0 gap-5 pl-[1.25rem] md:pl-[15rem] lg:pl-[17.625rem] xl:pl-[22.75rem] pr-[1.25rem] lg:pr-[2rem] xl:pr-[4rem] flex items-center justify-between">
        <button
          className="md:hidden"
          onClick={() => {
            setMobileSidebarOpen(!mobileSidebarOpen);
          }}
        >
          <Icon icon="hamburger" />
        </button>
        <div className="flex gap-5 items-center w-full md:w-max ">
          <div
            ref={inputContainerRef}
            onClick={() => setIsOpen(true)}
            className="search-input relative w-full "
          >
            <input
              onChange={handleChange}
              type="text"
              placeholder="Поиск по названию"
              className="h-[1.875rem] w-full md:w-[22rem] pl-9 pr-2 border focus:outline-none border-[#172439] focus:border-[rgba(255,255,255,0.45)] hover:border-[rgba(255,255,255,0.45)] bg-[#041228] text-sm"
            />
            <SearchResult />
          </div>
          <Icon icon="volume" className="w-6 h-6" />
        </div>

        <div className="hidden sm:flex gap-2 xl:gap-5">
          <ResourceItem value={900} icon="coal" label="Уголь" />
          <ResourceItem value={200} icon="steel" label="Сталь" />
          <ResourceItem
            value={14000}
            icon="experience"
            label="Очки исследования"
          />
          <ResourceItem
            value={150}
            icon="gold"
            label="Купить"
            color="#FFD966"
          />
          <ResourceItem
            value="58 дней"
            icon="premium"
            label="Купить"
            color="#FFD966"
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
