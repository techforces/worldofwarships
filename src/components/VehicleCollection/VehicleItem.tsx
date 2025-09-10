import type { Vehicle } from "../../utils/queryTypes";
import { toRoman } from "../../utils/utils";
import Button from "../Button/Button";
import "./vehicleItem.css";

interface VehicleItemProps {
  data: Vehicle;
}

const VehicleItem = ({ data }: VehicleItemProps) => {
  return (
    <div className="vehicle-item  relative w-full aspect-[4/3] bg-[rgba(4,18,40,0.25)] backdrop-blur-[8px] p-8 flex items-end">
      <div className="vi-background-gradient overflow-hidden w-full h-full absolute top-0 left-0"></div>
      <img
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[68%] z-1"
        src={data.nation.icons.large}
        alt={`flag of ${data.nation.name}`}
      />
      <img
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[85%] z-2"
        src={data.icons.large}
        alt=""
      />

      <div className="w-full h-max flex flex-col gap-6 relative z-4">
        <div className="flex flex-col gap-2">
          <img
            className="w-[2rem] -translate-x-[5px]"
            src={data.type.icons.default}
            alt=""
          />
          <h2 className="text-white tracking-[0.25px] text-2xl font-bold uppercase leading-6">
            {data.title}
          </h2>
          <p className="text-white opacity-75 text-base font-normal leading-4">
            {data.type.title} {toRoman(data.level)} уровня
          </p>
        </div>
        <Button label="О Корабле" />
      </div>
    </div>
  );
};

export default VehicleItem;
