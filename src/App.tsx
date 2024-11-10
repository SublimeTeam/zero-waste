import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <div className="grid px-8 grid-cols-[auto_400px_auto] min-h-screen bg-gray-100 pt-12 pb-20">
      <div className="grid col-start-2 w-full">
        <UserContextProvider>
          <RouterProvider router={routes} />
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
