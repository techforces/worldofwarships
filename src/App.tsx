import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_WARSHIPS } from "./utils/query";
import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Sidebar/Sidebar";
import VehicleCollection from "./components/VehicleCollection/VehicleCollection";
import VehicleView from "./components/VehicleCollection/VehicleView";
import "./App.css";

function App() {
  const [itemIndex, setItemIndex] = useState<number | null>(null);
  const { data, loading, error } = useQuery(GET_WARSHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="background w-full h-[100vh] flex flex-col">
        <Navigation />
        <div className="flex h-full min-h-0 w-full bg-[rgba(0,0,0,0.2)]">
          <Sidebar />
          {data && (
            <VehicleCollection data={data} setItemIndex={setItemIndex} />
          )}
        </div>

        {itemIndex != null && data && (
          <VehicleView
            data={data.vehicles[itemIndex]}
            setItemIndex={setItemIndex}
          />
        )}
      </div>
    </>
  );
}

export default App;
