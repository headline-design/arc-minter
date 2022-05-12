// @ts-nocheck

import React from "react";
import { SessionWallet } from "algorand-session-wallet";
import Arc19Minter from "./Arc19Minter";
import { conf } from "./lib/algorand";
import Pipeline from "@pipeline-ui-2/pipeline";

const wallet = Pipeline.init();

function App() {
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);
  
 return (
   <Arc19Minter></Arc19Minter>
 )
}

export default App;
