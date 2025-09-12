import { useState } from "react";
import type { VehicleList } from "../../utils/queryTypes";
import Icon from "../Icon/Icon";
import "./vehicleFilter.css";

interface VehicleFilterProps {
  data: VehicleList;
}

const VehicleFilter = ({ data }: VehicleFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="vehicle-filter relative w-full h-max flex justify-between p-[0.625rem] z-1">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon icon="filter" className="w-6 h-6" />
      </button>
      <button className="flex gap-2 items-center">
        <span className="text-base w-max font-normal opacity-75">
          По умолчанию
        </span>
        <Icon icon="arrow" className="w-6 h-6 opacity-75" />
      </button>

      {/* <div className="absolute left-0 top-[100%] w-full h-[500px] bg-black"></div> */}
    </div>
  );
};

export default VehicleFilter;
