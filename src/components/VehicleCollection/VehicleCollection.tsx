import { useEffect, useRef, memo } from "react";
import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import VehicleFilter from "./VehicleFilter";
import VehicleItem from "./VehicleItem";
import "./vehicleCollection.css";

interface VehicleCollectionProps {
  data: VehicleList;
  filteredData: Vehicle[];
  setFilteredData: (newData: Vehicle[]) => void;
  setItemIndex: (index: number) => void;
}

const VehicleCollection = ({
  data,
  filteredData,
  setFilteredData,
  setItemIndex,
}: VehicleCollectionProps) => {
  const vehicleListContainer = useRef<HTMLDivElement>(null);

  // Фикс для ровного контейнера
  function setScrollbarWidth() {
    const el = vehicleListContainer.current;
    if (!el) return;
    const sb_width = el.offsetWidth - el.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      sb_width + "px"
    );
  }

  useEffect(() => setScrollbarWidth(), []);

  return (
    <div className="flex flex-col w-full h-full pl-[1.25rem] lg:pl-[2rem] xl:pl-[4rem] pt-[1.5rem]">
      <div className="flex flex-col w-full h-max pr-[1.25rem] lg:pr-[2rem] xl:pr-[4rem] gap-4">
        <h1 className="tracking-[1.4px] text-3xl uppercase font-bold">
          Корабли
        </h1>
        <VehicleFilter data={data} setFilteredData={setFilteredData} />
      </div>

      <div
        ref={vehicleListContainer}
        className="vc-container vc-vontainer--lg bg-moon vc-container--xl w-full h-full box-border pt-4 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-y-scroll relative"
      >
        {filteredData.map((vehicle: Vehicle, index: number) => (
          <VehicleItem
            key={`vehicle-item-${index}`}
            index={index}
            data={vehicle}
            setItemIndex={setItemIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(VehicleCollection);
