import { useEffect, useRef, memo } from "react";
import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import VehicleFilter from "./VehicleFilter";
import "./vehicleCollection.css";
import VirtualizedList from "./VirtualizedList";

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
  return (
    <div className="flex flex-col w-full h-full pl-[1.25rem] lg:pl-[2rem] xl:pl-[4rem] pt-[1.5rem]">
      <div className="flex flex-col w-full h-max pr-[1.25rem] lg:pr-[2rem] xl:pr-[4rem] gap-4">
        <h1 className="tracking-[1.4px] text-3xl uppercase font-bold">
          Корабли
        </h1>
        <VehicleFilter data={data} setFilteredData={setFilteredData} />
        <div
          className={` grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5 invisible h-0 `}
        >
          <div className="vehicle-item--dummy relative w-full aspect-[4/3] bg-[rgba(4,18,40,0.35)] px-4 flex items-end "></div>
        </div>
      </div>

      <VirtualizedList
        filteredData={filteredData}
        setItemIndex={setItemIndex}
      />
    </div>
  );
};

export default memo(VehicleCollection);
