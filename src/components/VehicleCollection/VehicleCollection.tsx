import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import VehicleItem from "./VehicleItem";

interface VehicleCollectionProps {
  data: VehicleList;
  setItemIndex: (index: number) => void;
}

const VehicleCollection = ({ data, setItemIndex }: VehicleCollectionProps) => {
  return (
    <div className="w-full h-full box-border px-[4rem] py-[1.5rem] grid grid-cols-3 gap-5 overflow-y-scroll">
      {data.vehicles.map((vehicle: Vehicle, index: number) => (
        <VehicleItem
          key={`vehicle-item-${index}`}
          index={index}
          data={vehicle}
          setItemIndex={setItemIndex}
        />
      ))}
    </div>
  );
};

export default VehicleCollection;
