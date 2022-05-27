import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Container, Grid, Modal } from "@material-ui/core/";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import NFTViewerShell from "./NFTViewerShell";
import { SessionWallet } from "algorand-session-wallet";
import IpfsUpload from "./IpfsUpload";
import HexToAlgo from "./HexToAlgo";
import { conf } from "./lib/algorand";
import Pipeline, { sendTxns } from "@pipeline-ui-2/pipeline";
import JSONer from "./jsoner";
import CID from "cids";
import algosdk from "algosdk";
import { configClient } from "../node_modules/@pipeline-ui-2/pipeline/utils";
import NFTFetch2 from "./NFTFetch2";
import Preview from "./preview";
import NFTCard from "./NFTViewer";
import "./AccountCSS.css"

let flipped = true;


const MetaDataProps = (props) => {
  let properties = Object.keys(props.object);
  return (
    <div className="meta-card">
      {properties.map((property) => {
        return (
          <div className="card-flex">
            <label><b>{property}:  &nbsp;</b></label>
            <p>{props.object[property]}</p>
          </div>
        );
      })}
    </div>
  );
}; 


const AccountModule = (props) =>  {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalImgProps, setModalImgProps] = useState({});
  const [address, setAddress] = React.useState("");
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);

  function checkForAddress() {
    if (address !== window.pipeAddress) {
      setAddress(window.pipeAddress);
    }
  }

  const prevResponse = [{ hash: "none yet" }];

  const asaData = {
    creator: "",
    note: "Hello world",
    amount: 1,
    decimals: 0,
    assetName: "1NFT",
    unitName: "1NFT",
  };

  const [claimable, setClaimable] = React.useState(true);
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
  const [metaData, setMetaData] = React.useState("");
  const [metaData2, setMetaData2] = React.useState("");
  const [jss6, setJss6] = useState("block");

  React.useEffect(() => {
    if (Pipeline.address !== "") {
      document.getElementById("not-connected").style.display = "none";
      document.getElementById("connected").style.display = "block";
    }
  }, []);

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };

  const handleClick2 = () => {
    setIsDisabled2(!isDisabled2);
  };

  const handleClick3 = () => {
    setIsDisabled3(!isDisabled3);
  };

  const handleClick4 = () => {
    setIsDisabled4(!isDisabled4);
  };

  const handleClick5 = () => {
    setIsDisabled5(!isDisabled5);
  };

  const handleClick6 = () => {
    setIsDisabled6(!isDisabled6);
  };

  useEffect(() => {
    setClaimable(secret !== null && addr !== null && escrow !== null);
  }, [escrow, addr, secret]);

  useEffect(() => {
    window.response1234 = [{ hash: "none yet" }];
    setInterval(checkforResponse, 300);
  }, []);

  function toggle() {
    if (advancedOptions === "none") {
      setAdvancedOptions("block");
    } else {
      setAdvancedOptions("none");
    }
  }

  function checkforResponse() {
    let length = window.response1234.length - 1;
    if (prevResponse[0].hash !== window.response1234[length].hash) {
      prevResponse[0].hash = window.response1234[length].hash;
      setUrlHash(window.response1234[0].hash);
      let cidWorking = new CID(window.response1234[0].hash).toV1();
      let cidConverted = "sha256-" + cidWorking.toString("base16").substring(9);
      window.defaultJSON["image_integrity"] = cidConverted;
      document.getElementById("preview").innerText = JSON.stringify(
        window.defaultJSON
      );
      let thisHash = window.response1234[length].hash;
      setHash(thisHash);
    }
    checkForAddress();
  }

  function updateJSON(event) {
    let value = event.target.value;
    let key = event.target.id;
    switch (key) {
      case "name":
        if (value.length <= 32) {
          proceed();
        } else {
          failed("Asset Name Max size is 32 characters");
        }
        break;
      case "unitName":
        if (value.length <= 8) {
          proceed();
        } else {
          failed("Asset Unit Name can not exceed 8 letters");
        }
        break;
      case "decimals":
        if (value <= 19) {
          proceed();
        } else {
          failed("Asset decimals can not exceed 19");
        }
        break;
      default:
        break;
    }
    function proceed() {
      window.defaultJSON[key] = value;
      document.getElementById("preview").innerText = JSON.stringify(
        window.defaultJSON
      );
    }
    function failed(message) {
      let former = document.getElementById("miniMessage");
      if (former != null) {
        former.remove();
      }
      miniAlerts(event.target, message);
      event.target.value = "";
    }
  }

  function miniAlerts(parent, miniMessage) {
    //let Alert = document.createElement("p")
    //Alert = miniMessage
    parent.insertAdjacentHTML(
      "afterend",
      '<div id="miniMessage">' + miniMessage + "</div>"
    );
  }

  async function createAsa() {
    asaData.amount = parseInt(document.getElementById("input-amount").value);
    asaData.assetName = document.getElementById("name").value;
    asaData.creator = document.getElementById("input-manager").value;
    asaData.decimals = parseInt(document.getElementById("decimals").value);
    asaData.note = document.getElementById("input-note").value;
    asaData.assetURL = document.getElementById("input-asset-url").value;
    asaData.unitName = document.getElementById("unitName").value;
    asaData.reserve = document.getElementById("input-reserve").value;
    asaData.manager = document.getElementById("input-manager").value;
    // asaData.clawback = document.getElementById("input-clawback").value
    // asaData.freeze = document.getElementById("input-freeze").value
    asaData.assetMetadataHash = document.getElementById(
      "input-assetMetadataHash"
    ).value;

    let params = await Pipeline.getParams();

    let txn = algosdk.makeAssetConfigTxn(
      Pipeline.address,
      1000,
      params.firstRound,
      params.lastRound,
      new Uint8Array(Buffer.from(asaData.note)),
      params.genesisHash,
      params.genesisID,
      parseInt(document.getElementById("assetIndex").value),
      asaData.manager,
      asaData.reserve,
      undefined,
      undefined,
      false
    );
    txn.fee = 1000;

    let signedTxn = await Pipeline.sign(txn);

    let clientb = await configClient(
      Pipeline.main,
      Pipeline.EnableDeveloperAPI,
      Pipeline
    );
    let transServer = clientb.tranServer;

    try {
      let response = await sendTxns(
        signedTxn,
        transServer,
        Pipeline.EnableDeveloperAPI,
        Pipeline.token,
        Pipeline.alerts
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  function toggle19() {
    if (flipped) {
      setJss6("none");
      document.getElementById("fetchButton").style.display = "none";
    } else {
      setJss6("block");
      document.getElementById("fetchButton").style.display = "block";
    }
    flipped = !flipped;
  }

  function checkForAddress() {
    if (address !== window.pipeAddress) {
      setAddress(window.pipeAddress);
    }
  }

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <main className="jss65" >
      <div className="MuiContainer-root jss57 MuiContainer-maxWidthLg">
        <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
            <h1 id="connected" className="jss66">My account</h1>
            <div id="not-connected"></div>
          </div>
          <Grid item xs={12} sm={4} md={3}>
          <NFTFetch2></NFTFetch2>
       
    
         

            
        </Grid>
        <NFTCard
                setModalState={setModalState}
                setModalImgProps={setModalImgProps}
              />
        </div>
      </div>
    </main>
  );
};


const useStyles = makeStyles((theme) => ({
  
  ...theme.overrides.mui,
  ...theme.overrides.modalStyle,
  main: {
    backgroundColor: "white",
    marginTop: "12px",
    paddingBottom: "70px",
    minHeight: "430px",
  },
  title: {
    fontWeight: "bold",
    margin: "30px 0 10px",
  },
  img: {
    borderRadius: "5px",
  },
  portrait: {
    "& .modal": {
      width: 'auto',
      height: '90%',

      "& img": {
        width: 'auto',
        height: '100%',
      }
    }
  }
}));


export default AccountModule;
