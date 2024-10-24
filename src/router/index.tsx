import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import Dashboard from "~/pages/Dashboard";
import RegisterAdmission from "~/pages/RegisterAdmission";

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <HashRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={Dashboard} />
          <Route exact path={routes.registerAdmission} component={RegisterAdmission} />
          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Router;
