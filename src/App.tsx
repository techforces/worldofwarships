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
import Cursor from "./components/Cursor/Cursor";

function App() {
  const { data, loading, error } = useQuery(GET_WARSHIPS);
  const [itemIndex, setItemIndex] = useState<number | null>(null);
  const [searchIndex, setSarchIndex] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<Vehicle[] | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => setFilteredData(data?.vehicles as Vehicle[]), [data]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <>
      <div className="background w-full h-[100vh] flex flex-col items-center bg-[rgba(0,0,0,0.2)] relative overflow-hidden">
        <Cursor />
        {data && (
          <Navigation
            data={data}
            setItemIndex={setSarchIndex}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
        )}
        <div className="flex h-full min-h-0 w-full max-w-[120rem] ">
          <div className="flex w-full ">
            <Sidebar isOpen={mobileSidebarOpen} />
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
          {searchIndex != null && data?.vehicles && (
            <VehicleView
              data={data.vehicles[searchIndex]}
              setItemIndex={setSarchIndex}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
