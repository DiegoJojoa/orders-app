import { BrowserRouter, useRoutes } from "react-router-dom";
import AccumulatedSalesByDepartment from "./components/AccumulatedSalesByDepartment";
import SellerCommision from "./components/SellerCommision";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import CreateOrder from './components/CreateOrder';

const AppRoutes = () => {
  const routes = useRoutes([
    { element: <Home />, path: "/" },
    {
      element: <AccumulatedSalesByDepartment />,
      path: "/accumulated-sales-by-department",
    },
    { element: <SellerCommision />, path: "/seller-commision" },
    { element: <CreateOrder />, path: "/create-order" },
    // { element: <SignIn />, path: "/sign-in" },
    { element: <NotFound />, path: "*" },
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
