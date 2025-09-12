import { useState } from "react";
import type { VehicleList } from "../../utils/queryTypes";
import Icon, { type IconType } from "../Icon/Icon";
import Checkbox from "../Checkbox/Checkbox";
import { toRoman } from "../../utils/utils";
import "./vehicleFilter.css";

interface VehicleFilterProps {
  data: VehicleList;
}

const VehicleFilter = ({ data }: VehicleFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const vehicles = data.vehicles;

  const uniqueLevels = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.level).sort((a, b) => a - b))
  );

  const uniqueTypes = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.type.name))
  );
  const typeOrder = {
    submarine: 1,
    destroyer: 2,
    cruiser: 3,
    battleship: 4,
    aircarrier: 5,
    default: Number.MAX_VALUE,
  };
  const orderedTypes = uniqueTypes.sort((a, b) =>
    ((typeOrder as Record<string, number>)[a] || typeOrder.default) -
    ((typeOrder as Record<string, number>)[b] || typeOrder.default)
      ? 1
      : 0
  );

  const uniqueFlags = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.nation.name))
  );

  const divider = (
    <div className="flex self-stretch w-max">
      <div className="w-[1px] bg-white opacity-10" />
      <div className="w-[1px] bg-[rgba(4,18,40,0.6)]" />
      <div className="w-[1px] bg-white opacity-10" />
    </div>
  );

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

      <div className="absolute left-0 top-[100%] w-full h-max backdrop-blur-2xl">
        <div className="w-full h-10 bg-[rgba(255,255,255,0.15)] flex items-center px-4">
          <h2 className="font-bold text-base tracking-[0.7px]">Фильтры</h2>
        </div>
        <div className="w-full h-[100%] bg-[rgba(255,255,255,0.05)] flex gap-3">
          <div className="flex flex-col gap-3 px-10 py-6">
            <h3 className="font-bold text-base tracking-[0.5px]">Уровень</h3>
            <div className="flex flex-col gap-2">
              {uniqueLevels.map((level: number) => (
                <div
                  key={`${level}-level-checkbox`}
                  className="flex gap-2 h-8 items-center"
                >
                  <Checkbox />
                  <span>{toRoman(level)}</span>
                </div>
              ))}
            </div>
          </div>
          {divider}
          <div className="flex flex-col gap-3 px-10 py-6">
            <h3 className="font-bold text-base tracking-[0.5px]">Класс</h3>
            <div className="flex flex-col gap-2">
              {orderedTypes.map((type) => (
                <div
                  key={`${type}-type-checkbox`}
                  className="flex gap-2 items-center h-8 items-center"
                >
                  <Checkbox />
                  <Icon icon={type as IconType} />
                </div>
              ))}
            </div>
          </div>
          {divider}
          <div className="flex flex-col gap-3 px-10 py-6">
            <h3 className="font-bold text-base tracking-[0.5px]">Нация</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {uniqueFlags.map((nation) => (
                <div
                  key={`${nation}-nation-checkbox`}
                  className="flex gap-2 items-cente h-8 items-center"
                >
                  <Checkbox />
                  <Icon icon={nation as IconType} className="h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;
