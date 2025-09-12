import { useEffect, useRef } from "react";
import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import VehicleFilter from "./VehicleFilter";
import VehicleItem from "./VehicleItem";
import "./vehicleCollection.css";

interface VehicleCollectionProps {
  data: VehicleList;
  setItemIndex: (index: number) => void;
}

const VehicleCollection = ({ data, setItemIndex }: VehicleCollectionProps) => {
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
    <div className="flex flex-col w-full h-full pl-[4rem] pt-[1.5rem]">
      <div className="flex flex-col w-full h-max pr-[4rem] gap-4">
        <h1 className="tracking-[1.4px] text-3xl uppercase font-bold">
          Корабли
        </h1>
        <VehicleFilter data={data} />
      </div>

      <div
        ref={vehicleListContainer}
        className="vc-container w-full h-full box-border pt-4 pr-[4rem] grid grid-cols-3 gap-5 overflow-y-scroll relative"
      >
        {data.vehicles.map((vehicle: Vehicle, index: number) => (
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

export default VehicleCollection;
