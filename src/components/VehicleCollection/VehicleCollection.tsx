import type { Vehicle, VehicleList } from "../../utils/queryTypes";
import VehicleItem from "./VehicleItem";

interface VehicleCollectionProps {
  data: VehicleList;
}

const VehicleCollection = ({ data }: VehicleCollectionProps) => {
  console.log(data.vehicles);

  return (
    <div className="w-full h-full box-border px-[4rem] py-[1.5rem] grid grid-cols-3 gap-5 overflow-y-scroll">
      {data.vehicles.map((vehicle: Vehicle, index: number) => (
        <VehicleItem key={`vehicle-item-${index}`} data={vehicle} />
      ))}
    </div>
  );
};

export default VehicleCollection;
