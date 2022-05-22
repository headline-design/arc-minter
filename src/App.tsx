// @ts-nocheck
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { SessionWallet } from "algorand-session-wallet";
import Arc19Minter from "./Arc19Minter";
import ConfigModule from "./ConfigModule";
import AboutModule from "./AboutModule";
import { conf } from "./lib/algorand";
import Pipeline from "@pipeline-ui-2/pipeline";


const wallet = Pipeline.init();

function App() {
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);
  
 return (
   <div>
  <HashRouter>
  <Switch>
                <Route exact path="/">
                  <Redirect to="/mint" />
                </Route>
      <Route>
        <Route exact strict path="/mint">
        <Arc19Minter></Arc19Minter>
        </Route>
        <Route exact strict path="/config">
          <ConfigModule />
        </Route>
        <Route exact strict path="/about">
          <AboutModule />
        </Route>
      </Route>
    </Switch>
  </HashRouter>

   </div>
 )
}

export default App;
