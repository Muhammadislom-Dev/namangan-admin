import "./App.css";
import { Route, Switch } from "react-router-dom";
import { SignIn } from "./components/signin";
import { ToastContainer } from "react-toastify";
import MiniDrawer from "./components/sidebar";
import PrivateRoute from "./components/layout/PrivateRoute";
import CompanyTable from "./components/company/CompanyTable";
import ProductTable from "./components/products/ProductTable";
import ServicesTable from "./components/services/ServicesTable";

function App() {
  return (
    <>
      <Switch>
        <Route component={SignIn} path={"/login"} />
        <div>
          <MiniDrawer>
            <PrivateRoute component={CompanyTable} exact />
            <PrivateRoute component={ProductTable} path="/products" exact />
            <PrivateRoute component={ServicesTable} path="/services" exact />
          </MiniDrawer>
        </div>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
