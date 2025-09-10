import { useQuery } from "@apollo/client/react";
import { GET_WARSHIPS } from "./utils/query";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Sidebar/Sidebar";
import VehicleCollection from "./components/VehicleCollection/VehicleCollection";

function App() {
  const { data, loading, error } = useQuery(GET_WARSHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="background w-full h-[100vh] flex flex-col">
        {/* <pre>{JSON.stringify(data?.vehicles[200], null, 2)}</pre> */}

        <Navigation />
        <div className="flex h-full min-h-0 w-full bg-[rgba(0,0,0,0.2)]">
          <Sidebar />
          {data && <VehicleCollection data={data} />}
        </div>
      </div>
    </>
  );
}

export default App;
