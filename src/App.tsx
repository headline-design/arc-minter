// @ts-nocheck
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
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
  const [HeaderPromo, setHeaderPromo] = useState("true");

  function toggle() {
    if (HeaderPromo === "none") {
      setHeaderPromo("flex");
    } else {
      setHeaderPromo("none");
    }
  }
  
 return (
   <div>
       <div className="bg-primary-500 text-white w-full py-4 flex justify-center sm:justify-between sm:px-5 items-center relative" style={{ display: HeaderPromo }}>
    <div className="label-md mr-10 sm:mr-0 sm:max-w-[60%]">
      Built by HEADLINE
    </div>
    <a
      href="https://www.pipeline-ui.com"
      target="_blank"
      rel="noreferrer"
      className="p-2 px-4 bg-white text-black label-sm rounded-full"
    >
      Learn More
    </a>
    <button
    type="button"
    onClick={toggle}
    aria-label="Close"
    className="absolute bp3-button bp3-minimal bp3-dialog-close-button"
  >
    <span
      icon="small-cross"
      aria-hidden="true"
      className="bp3-icon bp3-icon-small-cross"
    >
      <svg data-icon="small-cross" width={20} height={20} viewBox="0 0 20 20">
        <path
          d="M11.41 10l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"
          fillRule="evenodd"
        />
      </svg>
    </span>
  </button>
  </div>
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
