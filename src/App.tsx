// @ts-nocheck

import React, { useEffect } from "react";
import { SessionWallet } from "algorand-session-wallet";
import AlgorandWalletConnector from "./AlgorandWalletConnector";
import Arc19Minter from "./Arc19Minter";
import {
  Alignment,
  AnchorButton,
  Button,
  Card,
  Elevation,
  Navbar,
  ProgressBar,
} from "@blueprintjs/core";
import { conf, collect, sendWait, getAsaId, getNFT } from "./lib/algorand";
import { Classes, Dialog } from "@blueprintjs/core";
import {
  BrowserView,
  MobileView,
  isIOS,
} from "react-device-detect";
import Pipeline from "@pipeline-ui-2/pipeline";
import getNFTInfo from "./lib/getnft";

const wallet = Pipeline.init();

function App() {
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);

  const [nft, setNFT] = React.useState({
    id: 0,
    url: "pixel-astro.png",
    name: "TBD",
  });
 return (
   <Arc19Minter></Arc19Minter>
 )
}

export default App;
