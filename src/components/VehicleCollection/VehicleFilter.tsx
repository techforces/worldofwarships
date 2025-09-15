import { useState, useMemo, useEffect, useRef, useCallback, memo } from "react";
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
  const filterContainerRef = useRef(null);
  const filterButtonRef = useRef(null);
  const sortContainerRef = useRef(null);
  const sortButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    levels: [],
    types: [],
    nations: [],
  });
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "title">("default");

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

  const filteredData = useMemo(() => {
    const filtered = data.vehicles.filter((vehicle) => {
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
    });

    if (sortBy === "title") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [data.vehicles, selectedFilters, sortBy]);

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
    <div className="flex flex-col sm:flex-row self-stretch w-full sm:w-max">
      <div className="h-[1px] sm:h-full w-full sm:w-[1px] bg-white opacity-10" />
      <div className="h-[1px] sm:h-full w-full sm:w-[1px] bg-[rgba(4,18,40,0.6)]" />
      <div className="h-[1px] sm:h-full w-full sm:w-[1px] bg-white opacity-10" />
    </div>
  );

  useEffect(
    () => setFilteredData(filteredData),
    [filteredData, setFilteredData]
  );

  const closeFilter = useCallback(
    (e: MouseEvent) => {
      if (
        isOpen &&
        filterContainerRef.current &&
        !filterContainerRef.current?.contains(e.target) &&
        e.target != filterButtonRef.current
      ) {
        setIsOpen(false);
      }
    },
    [filterContainerRef, isOpen]
  );

  const closeSort = useCallback(
    (e: MouseEvent) => {
      if (
        sortIsOpen &&
        sortContainerRef.current &&
        !sortContainerRef.current?.contains(e.target) &&
        e.target != sortButtonRef.current
      ) {
        setSortIsOpen(false);
      }
    },
    [sortContainerRef, sortButtonRef, sortIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeFilter);
    document.addEventListener("mousedown", closeSort);

    return () => {
      document.removeEventListener("mousedown", closeFilter);
      document.removeEventListener("mousedown", closeSort);
    };
  }, [closeFilter, closeSort]);

  const areFiltersEmpty = useMemo(() => {
    return (
      selectedFilters.levels.length === 0 &&
      selectedFilters.types.length === 0 &&
      selectedFilters.nations.length === 0
    );
  }, [selectedFilters]);

  const resetFilters = useCallback(() => {
    setSelectedFilters({
      levels: [],
      types: [],
      nations: [],
    });
  }, [setSelectedFilters]);

  return (
    <div className="vehicle-filter relative w-full h-max flex justify-between z-1">
      <button
        ref={filterButtonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="p-[0.625rem]"
      >
        <Icon icon="filter" className="w-6 h-6 pointer-events-none" />
      </button>
      <div className="relative h-full">
        <button
          ref={sortButtonRef}
          onClick={() => setSortIsOpen(!sortIsOpen)}
          className="flex gap-2 items-center h-full"
        >
          <span className="text-base w-max font-normal opacity-75 pointer-events-none">
            {sortBy === "default" ? "По умолчанию" : "По названию"}
          </span>
          <Icon
            icon="arrow"
            className="w-6 h-6 opacity-75 pointer-events-none"
          />
        </button>
        {sortIsOpen && (
          <div
            ref={sortContainerRef}
            className="absolute right-0 top-[100%] w-40 h-max bg-[rgba(255,255,255,0.05)] backdrop-blur-2xl"
          >
            <button onClick={() => setSortBy("default")} className="px-4 py-2">
              <span className="opacity-75 hover:opacity-100 duration-200">
                По умолчанию
              </span>
            </button>
            <button onClick={() => setSortBy("title")} className="px-4 py-2">
              <span className="opacity-75 hover:opacity-100 duration-200">
                По названию
              </span>
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          ref={filterContainerRef}
          className="absolute left-0 top-[100%] w-full h-max backdrop-blur-2xl"
        >
          <div className="w-full h-10 bg-[rgba(255,255,255,0.15)] flex items-center px-5 gap-6">
            <h2 className="font-bold text-base tracking-[0.7px]">Фильтры</h2>

            {!areFiltersEmpty && (
              <button
                onClick={resetFilters}
                className="opacity-75 hover:opacity-100 duration-200"
              >
                <span>Сбросить все</span>
              </button>
            )}
          </div>
          <div className="w-full h-[100%] bg-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-3 px-5 py-4 sm:px-10 sm:py-6">
              <h3 className="font-bold text-base tracking-[0.5px]">Уровень</h3>
              <div className="flex flex-row flex-wrap gap-4 sm:flex-col sm:gap-1">
                {levels.map((level: number) => {
                  const isChecked = selectedFilters["levels"].includes(level);
                  const isDisabled = !availableOptions.levels?.has(level);

                  return (
                    <div
                      key={`${level}-level-checkbox`}
                      className={`flex gap-2 h-8 items-center ${
                        isDisabled && "opacity-40"
                      }`}
                      onClick={() => {
                        if (!isDisabled) toggleFilter("levels", level);
                      }}
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
            <div className="flex flex-col gap-3 px-5 py-4 sm:px-10 sm:py-6">
              <h3 className="font-bold text-base tracking-[0.5px]">Класс</h3>
              <div className="flex flex-row flex-wrap gap-4 sm:flex-col sm:gap-1">
                {types.map((type) => {
                  const isChecked = selectedFilters["types"].includes(type);
                  const isDisabled = !availableOptions.types?.has(type);

                  return (
                    <div
                      key={`${type}-type-checkbox`}
                      className={`flex gap-2 h-8 items-center ${
                        isDisabled && "opacity-40"
                      }`}
                      onClick={() => {
                        if (!isDisabled) toggleFilter("types", type);
                      }}
                    >
                      <Checkbox
                        checked={isChecked}
                        disabled={isDisabled}
                        readOnly
                      />
                      <Icon icon={type as IconType} />
                    </div>
                  );
                })}
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-3 px-5 py-4 sm:px-10 sm:py-6">
              <h3 className="font-bold text-base tracking-[0.5px]">Нация</h3>
              <div className="flex flex-row flex-wrap gap-4 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-1">
                {flags.map((nation) => {
                  const isChecked = selectedFilters["nations"].includes(nation);
                  const isDisabled = !availableOptions.nations?.has(nation);
                  return (
                    <div
                      key={`${nation}-nation-checkbox`}
                      className={`flex gap-2 h-8 items-center ${
                        isDisabled && "opacity-40"
                      }`}
                      onClick={() => {
                        if (!isDisabled) toggleFilter("nations", nation);
                      }}
                    >
                      <Checkbox
                        checked={isChecked}
                        disabled={isDisabled}
                        readOnly
                      />
                      <Icon icon={nation as IconType} className="h-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(VehicleFilter);
