import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import VehicleItem from "./VehicleItem";

interface VehicleCollectionProps {
  data: VehicleList;
  setItemIndex: (index: number) => void;
}

const VehicleCollection = ({ data, setItemIndex }: VehicleCollectionProps) => {
  return (
    <div className="flex flex-col w-full h-full pl-[4rem] pt-[1.5rem]">
      <h1 className="tracking-[1.4px] text-3xl uppercase font-bold">Корабли</h1>

      <div className="w-full h-full box-border  grid grid-cols-3 gap-5 overflow-y-scroll">
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
