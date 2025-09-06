import { useQuery } from "@apollo/client/react";
import { GET_WARSHIPS } from "./definitions/query";
import "./App.css";

function App() {
  const { data, loading, error } = useQuery(GET_WARSHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
