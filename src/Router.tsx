import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
interface IRouterProps {}
function Router({}: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact>
          <Coins />
        </Route>
        <Route path="/:coinId">
          <Coin></Coin>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
