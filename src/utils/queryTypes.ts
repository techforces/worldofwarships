interface IconsVehicle {
  __typename: "IconsVehicle";
  large: string;
  medium: string;
}

interface NationIcons {
  __typename: "NationIcons";
  large: string;
  medium: string | null;
  small: string | null;
}

interface Nation {
  __typename: "Nation";
  color: string;
  icons: NationIcons;
  name: string;
  title: string;
}

interface IconsVehicleClass {
  __typename: "IconsVehicleClass";
  default: string;
}

interface VehicleType {
  __typename: "VehicleType";
  icons: IconsVehicleClass;
  name: string;
  title: string;
}

export interface Vehicle {
  __typename: "Vehicle";
  description: string;
  icons: IconsVehicle;
  level: number;
  nation: Nation;
  title: string;
  type: VehicleType;
}

export interface VehicleList {
  vehicles: Vehicle[];
}
