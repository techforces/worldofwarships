import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";

import { GET_WARSHIPS } from "./utils/query";
import type { Vehicle } from "./utils/queryTypes";

import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Sidebar/Sidebar";
import VehicleCollection from "./components/VehicleCollection/VehicleCollection";
import VehicleView from "./components/VehicleCollection/VehicleView";
import Loader from "./components/Loader/Loader";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import "./App.css";

function App() {
  const { data, loading, error } = useQuery(GET_WARSHIPS);
  const [itemIndex, setItemIndex] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<Vehicle[] | null>(null);

  useEffect(() => setFilteredData(data?.vehicles as Vehicle[]), [data]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <>
      <div className="background w-full h-[100vh] flex flex-col">
        {data && <Navigation data={data} setItemIndex={setItemIndex} />}
        <div className="flex h-full min-h-0 w-full bg-[rgba(0,0,0,0.2)]">
          <Sidebar />
          {data && filteredData && (
            <VehicleCollection
              data={data}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setItemIndex={setItemIndex}
            />
          )}
        </div>

        {itemIndex != null && filteredData && (
          <VehicleView
            data={filteredData[itemIndex]}
            setItemIndex={setItemIndex}
          />
        )}
      </div>
    </>
  );
}

export default App;
