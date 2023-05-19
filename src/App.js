import "./App.css";
import { Route, Switch } from "react-router-dom";
import { SignIn } from "./components/signin";
import { ToastContainer } from "react-toastify";
import MiniDrawer from "./components/sidebar";
import PrivateRoute from "./components/layout/PrivateRoute";
import CompanyTable from "./components/company/CompanyTable";
import ProductTable from "./components/products/ProductTable";
import ServicesTable from "./components/services/ServicesTable";
import NewsTable from "./components/news/NewsTable";
import StatisticsTable from "./components/statistics/StatisticsTable";
import WorkersTable from "./components/workers/WorkersTable";
import AboutTable from "./components/about/AboutTable";

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
            <PrivateRoute component={NewsTable} path="/news" exact />
            <PrivateRoute component={StatisticsTable} path="/arxiv" exact />
            <PrivateRoute component={WorkersTable} path="/actions" exact />
            <PrivateRoute component={AboutTable} path="/about" exact />
          </MiniDrawer>
        </div>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
