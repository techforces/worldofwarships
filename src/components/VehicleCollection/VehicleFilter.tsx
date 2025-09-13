import { useState, useMemo, useEffect } from "react";
import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import Icon, { type IconType } from "../Icon/Icon";
import Checkbox from "../Checkbox/Checkbox";
import { toRoman } from "../../utils/utils";
import "./vehicleFilter.css";

interface VehicleFilterProps {
  data: VehicleList;
  setFilteredData: (newData: Vehicle[]) => void;
}

const VehicleFilter = ({ data, setFilteredData }: VehicleFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    levels: [],
    types: [],
    nations: [],
  });

  const toggleFilter = (
    key: keyof typeof selectedFilters,
    value: string | number
  ) => {
    const isSelected = selectedFilters[key].includes(value);
    setSelectedFilters((prev) => {
      return {
        ...prev,
        [key]: isSelected
          ? selectedFilters[key].filter((v) => v != value)
          : [...selectedFilters[key], value],
      };
    });
  };

  const filteredData = useMemo(
    () =>
      data.vehicles.filter((vehicle) => {
        const matchesLevel =
          selectedFilters.levels.length === 0 ||
          selectedFilters["levels"].includes(vehicle.level);
        const matchesType =
          selectedFilters.types.length === 0 ||
          selectedFilters["types"].includes(vehicle.type.name);
        const matchesNation =
          selectedFilters.nations.length === 0 ||
          selectedFilters["nations"].includes(vehicle.nation.name);

        return matchesLevel && matchesType && matchesNation;
      }),
    [data.vehicles, selectedFilters]
  );

  const availableOptions = useMemo(() => {
    const result = {
      levels: new Set<number>(),
      types: new Set<string>(),
      nations: new Set<string>(),
    };

    data.vehicles.forEach((vehicle) => {
      const matchesLevel =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(vehicle.level);
      const matchesType =
        selectedFilters.types.length === 0 ||
        selectedFilters.types.includes(vehicle.type.name);
      const matchesNation =
        selectedFilters.nations.length === 0 ||
        selectedFilters.nations.includes(vehicle.nation.name);

      if (matchesType && matchesNation) result.levels.add(vehicle.level);
      if (matchesLevel && matchesNation) result.types.add(vehicle.type.name);
      if (matchesLevel && matchesType) result.nations.add(vehicle.nation.name);
    });

    return result;
  }, [data.vehicles, selectedFilters]);

  const levels = useMemo(
    () => [
      ...new Set(
        data.vehicles.map((vehicle) => vehicle.level).sort((a, b) => a - b)
      ),
    ],
    [data.vehicles]
  );

  const types = useMemo(() => {
    const typeOrder = {
      submarine: 1,
      destroyer: 2,
      cruiser: 3,
      battleship: 4,
      aircarrier: 5,
      default: Number.MAX_VALUE,
    };

    return [...new Set(data.vehicles.map((vehicle) => vehicle.type.name))].sort(
      (a, b) =>
        ((typeOrder as Record<string, number>)[a] || typeOrder.default) -
        ((typeOrder as Record<string, number>)[b] || typeOrder.default)
          ? 1
          : 0
    );
  }, [data.vehicles]);

  const flags = useMemo(
    () => [...new Set(data.vehicles.map((vehicle) => vehicle.nation.name))],
    [data.vehicles]
  );

  const Divider = () => (
    <div className="flex self-stretch w-max">
      <div className="w-[1px] bg-white opacity-10" />
      <div className="w-[1px] bg-[rgba(4,18,40,0.6)]" />
      <div className="w-[1px] bg-white opacity-10" />
    </div>
  );

  useEffect(() => setFilteredData(filteredData), [filteredData]);

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
            <div className="flex flex-col gap-1">
              {levels.map((level: number) => {
                const isChecked = selectedFilters["levels"].includes(level);
                const isDisabled = !availableOptions.levels?.has(level);

                return (
                  <div
                    key={`${level}-level-checkbox`}
                    className={`flex gap-2 h-8 items-center ${
                      isDisabled && "opacity-40"
                    }`}
                    onClick={() => toggleFilter("levels", level)}
                  >
                    <Checkbox
                      checked={isChecked}
                      disabled={isDisabled}
                      readOnly
                    />
                    <span>{toRoman(level)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-3 px-10 py-6">
            <h3 className="font-bold text-base tracking-[0.5px]">Класс</h3>
            <div className="flex flex-col gap-1">
              {types.map((type) => {
                const isChecked = selectedFilters["types"].includes(type);
                const isDisabled = !availableOptions.types?.has(type);

                return (
                  <div
                    key={`${type}-type-checkbox`}
                    className={`flex gap-2 h-8 items-center ${
                      isDisabled && "opacity-40"
                    }`}
                    onClick={() => toggleFilter("types", type)}
                  >
                    <Checkbox checked={isChecked} readOnly />
                    <Icon icon={type as IconType} />
                  </div>
                );
              })}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-3 px-10 py-6">
            <h3 className="font-bold text-base tracking-[0.5px]">Нация</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {flags.map((nation) => {
                const isChecked = selectedFilters["nations"].includes(nation);
                const isDisabled = !availableOptions.nations?.has(nation);
                return (
                  <div
                    key={`${nation}-nation-checkbox`}
                    className={`flex gap-2 h-8 items-center ${
                      isDisabled && "opacity-40"
                    }`}
                    onClick={() => toggleFilter("nations", nation)}
                  >
                    <Checkbox checked={isChecked} readOnly />
                    <Icon icon={nation as IconType} className="h-4" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;
