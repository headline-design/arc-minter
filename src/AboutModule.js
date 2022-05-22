// @ts-nocheck

import React, { useEffect, useState } from "react";
import { SessionWallet } from "algorand-session-wallet";
import AlgorandWalletConnector from "./AlgorandWalletConnector";
import { Logo } from "./logo";
import IpfsUpload from "./IpfsUpload";
import HexToAlgo from "./HexToAlgo";
import { AnchorButton, ProgressBar } from "@blueprintjs/core";
import { conf, collect, sendWait, getAsaId, getNFT } from "./lib/algorand";
import { Classes, Dialog } from "@blueprintjs/core";
import { BrowserView, MobileView, isIOS } from "react-device-detect";
import Pipeline from "@pipeline-ui-2/pipeline";
import getNFTInfo from "./lib/getnft";
import JSONer from "./jsoner";
import CID from "cids";

import Preview from "./preview";

const prevResponse = [{ hash: "none yet" }];

var cid = "";

const asaData = {
  creator: "",
  note: "Hello world",
  amount: 1,
  decimals: 0,
  assetName: "1NFT",
  unitName: "1NFT",
};

const wallet = Pipeline.init();

const MetaDataProps = (props) => {
  let properties = Object.keys(props.object);
  return (
    <div className="meta-card">
      {properties.map((property) => {
        return (
          <div className="card-flex">
            <label>
              <b>{property}: &nbsp;</b>
            </label>
            <p>{props.object[property]}</p>
          </div>
        );
      })}
    </div>
  );
};

const myJSON = {
  Logo: "NFDomains",
  Background: "Code",
};

window.defaultJSON = {
  name: "Astro #220",
  description: "Algo Astros, An NFT Collection from the HEADLINE Team.",
  image: "ipfs://QmPntG5UdzPifpDaxMAwi1Fdh4e9Nr6jeeHApLSsrV7LJo",
  decimals: 0,
  unitName: "ASTRO220",
  image_integrity:
    "(sha256-18C15D17D33E6AA1C8579F740F9684C069F56C5F8750745C157F79FA528AC997",
  image_mimetype: "image/jpeg",
  properties: undefined,
};

function AboutModule() { 
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);

  function checkForAddress() {
    if (address !== window.pipeAddress) {
      setAddress(window.pipeAddress);
    }
  }

  const [nft, setNFT] = React.useState({
    id: 0,
    url: "pixel-astro.png",
    name: "TBD",
  });
  const [accts] = React.useState(sw.accountList());
  const [connected, setConnected] = React.useState(sw.connected());
  const [claimable, setClaimable] = React.useState(true);
  const [claimed, setClaimed] = React.useState(false);
  const [address, setAddress] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [metaData, setMetaData] = React.useState("");
  const [metaData2, setMetaData2] = React.useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [advancedOptions, setAdvancedOptions] = useState("none");

  const params = new URLSearchParams(window.location.search);
  const escrow = params.get("escrow");
  const addr = params.get("addr");
  const secret = params.get("secret");
  const [hash, setHash] = React.useState("");
  const [asa, setAsa] = React.useState("");
  const [asaId, setAsaId] = React.useState("");
  const [urlHash, setUrlHash] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);
  const [isDisabled3, setIsDisabled3] = useState(true);
  const [isDisabled4, setIsDisabled4] = useState(true);
  const [isDisabled5, setIsDisabled5] = useState(true);
  const [isDisabled6, setIsDisabled6] = useState(true);

  const [initial, setInitial] = React.useState(true);

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div className="App" style={{ background: "#000" }}>
      </div>
  );
}

export default AboutModule;
