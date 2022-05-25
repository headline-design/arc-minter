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
import Pipeline, {sendTxns} from "@pipeline-ui-2/pipeline";
import JSONer from "./jsoner";
import CID from "cids";
import algosdk from "algosdk";
import {configClient} from "@pipeline-ui-2/pipeline/utils"

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
  const [address, setAddress] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [advancedOptions, setAdvancedOptions] = useState("none");

  const params = new URLSearchParams(window.location.search);
  const escrow = params.get("escrow");
  const addr = params.get("addr");
  const secret = params.get("secret");
  const [hash, setHash] = React.useState("");
  const [asa, setAsa] = React.useState("");
  const [asaId, setAsaId] = React.useState("");
  const [urlHash, setUrlHash] = React.useState("");
  const [jss6, setJss6] = useState("block");
  const [jss7, setJss7] = useState("none");

  let toggler = true;

  function refetch() {
    if (toggler) {
      setAsa("https://www.nftexplorer.app/asset/" + asaId);
    } else {
      setAsa("https://www.nftexplorer.app/asset/");
    }
    toggler = !toggler;
  }

  useEffect(() => {
    setClaimable(secret !== null && addr !== null && escrow !== null);
  }, [escrow, addr, secret]);

  useEffect(() => {
    window.response1234 = [{ hash: "none yet" }];
    setInterval(checkforResponse, 300);
  }, []);

  function toggle19() {
    if (jss7 === "block") {
      setJss7("none");
      setJss6("block");

    } else {
      setJss6("none");
      setJss7("block");
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
    let key = event.target.id;
    let value = event.target.value;
    window.defaultJSON[key] = value;
    document.getElementById("preview").innerText = JSON.stringify(
      window.defaultJSON
    );
  }

  function updateWallet(address) {
    setAddress(address);
    setConnected(true);
    setAddress(true);
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


    let params = await Pipeline.getParams()
    
    let txn = algosdk.makeAssetConfigTxn(
      Pipeline.address,
      1000,
      params.firstRound,
      params.lastRound,
      undefined,
      params.genesisHash,
      params.genesisID,
      parseInt(document.getElementById("assetIndex").value),
      asaData.manager,
      asaData.reserve,
      undefined,
      undefined,
      false
      )
      txn.fee = 1000

      let signedTxn = await Pipeline.sign(txn);

      let clientb = await configClient(Pipeline.main, Pipeline.EnableDeveloperAPI, Pipeline)
      let transServer = clientb.tranServer

      try {
          let response = await sendTxns(signedTxn, transServer, Pipeline.EnableDeveloperAPI, Pipeline.token, Pipeline.alerts)
          console.log(response)
          return response
      }
      catch (error) { console.log(error) }
  }

  function triggerHelp() {
    setOpen(false);
    document.getElementById("help-text")?.click();
  }

  async function handleDownload() {
    var a = document.createElement("a");
    const image = await fetch(nft.url);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    a.href = imageURL;
    a.download = nft.name;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  return (
    <div className="App" style={{ background: "#000" }}>
      <div className="container body-1">
        <div id="__next">
      <div className="jss9">
            <div className="MuiContainer-root jss8 MuiContainer-maxWidthLg">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                <div
                  className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8"
                  style={{ alignItems: "center" }}
                >
                  <h1 className="MuiTypography-root jss10 MuiTypography-h1">
                    <span>Documentation</span>
                  </h1>
                  <h6 className="MuiTypography-root jss11 MuiTypography-subtitle1">
                   Learn how to mint ARC NFTs today!
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="jss25">
          <div className="MuiContainer-root jss14 MuiContainer-maxWidthLg">
    <div className="jss15">
      <div className="form-title">
        <h3>Read the docs</h3>
      </div>
      <div className="jss26">
        <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12" />
            <div spacing={2} />
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12" />
    <div spacing={2} />
    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
      
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"
        style={{ display: "none" }}
      >
        <div className="jss16">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="input-amount"
            name="assetTotal"
            className="custom-input-size form-control  "
            placeholder={1}
            type="text"
            inputMode="numeric"
            defaultValue={1}
          />
        </div>
      </div>
    </div>
    <p className="jss83">What is an ARC NFT?</p>
    <p className="jss36">
      ARC NFTs are NFTs minted on Algorand that adhere to a standard that is submitted as an Algorand Request for Comment to the community.
      The goal of these conventions is to make it simpler for block explorers, wallets, exchanges, marketplaces, and more generally, client software to display the properties of a given ASA.
      <br></br><br></br>
      Below you will find instructions for minting ARC19 and ARC69 NFTs.
      <br />
    </p>
  </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-12">
                <p className="jss83">NFT Type</p>
                <input
                  type="checkbox"
                  
                  id="checkedA"
                  hidden=""
                  className="jss35"
                />
                <label htmlFor="checkedA" className="jss84">
                  <div onClick={toggle19}>ARC19</div>
                  <div onClick={toggle19}>ARC69</div>
                </label> 
              </div>
              <div
                className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"
                style={{ display: "none" }}
              >
              </div>
            </div>
            <p id="arc19-1" className="jss36" style={{display: jss6}}>
              <p>ARC19 Docs</p>
              ARC19 NFTs allow anyone to mint NFTs and update the image at a later date via asset config transaction.
              This is "a proposal to allow a templating mechanism of the URL so that changeable data in an asset can be substituted by a client, providing a mutable URL".
              <br />
              <br />
              You agree that any information uploaded to ARC Minter will not
              contain material subject to copyright or other proprietary rights,
              unless you have necessary permission or are otherwise legally
              entitled to post the material.
            </p>
            <p id="arc69-1" className="jss36" style={{display: jss7}}>
            <p>ARC69 Docs</p>
              ARC69 NFTs allow anyone to mint NFTs and update the metadata at a later date via asset config transaction.
              "The goal of these conventions is to make it simpler to display the properties of a given ASA. This ARC differs from ARC3 by focusing on optimization for fetching of digital media, as well as the use of onchain metadata. Furthermore, since asset configuration transactions are used to store the metadata, this ARC can be applied to existing ASAs."
              <br />
              <br />
              You agree that any information uploaded to ARC Minter will not
              contain material subject to copyright or other proprietary rights,
              unless you have necessary permission or are otherwise legally
              entitled to post the material.
            </p>
          </div>
          
          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12" />
            <div spacing={2} />
            <p id="arc19-2" className="jss36" style={{display: jss6}}>
              Once your NFT is minted on the Algorand blockchain, you will not
              be able to edit or update any of its information unless you minted
              the NFT wtih ARC19. If you minted the NFT with ARC19, you may
              update the NFT's information with an "asset config" transaction.
              <br />
              <br />
              You agree that any information uploaded to ARC Minter will not
              contain material subject to copyright or other proprietary rights,
              unless you have necessary permission or are otherwise legally
              entitled to post the material.
            </p>
            <p id="arc69-2" className="jss36" style={{display: jss7}}>
              Once your NFT is minted on the Algorand blockchain, you will not
              be able to edit or update any of its information unless you minted
              the NFT wtih ARC19. If you minted the NFT with ARC19, you may
              update the NFT's information with an "asset config" transaction.
              <br />
              <br />
              You agree that any information uploaded to ARC Minter will not
              contain material subject to copyright or other proprietary rights,
              unless you have necessary permission or are otherwise legally
              entitled to post the material.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
          </div>

          <footer className="jss48">
            <footer>
              <ul className="foot-menu"></ul>
            </footer>
            <div className="MuiContainer-root jss47 MuiContainer-maxWidthLg">
              <div
                className="MuiGrid-root MuiGrid-container"
                style={{ position: "relative", zIndex: 2 }}
              >
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
                  <div className="footer-flex">
                <div className="footer-left">
                  <img src="algologo.svg" alt="banner" className="footer-img" />

                  <p className="jss50">
                    Algorand is the #1 carbon-negative blockchain. <br></br> 
                    Sustainable, scalable, and built to last.
                  </p>
                  </div>
                  <div className="footer-right">
                  <a
                      href="https://twitter.com/headline_crypto"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="jss51">
                        <svg
                          className="MuiSvgIcon-root"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          style={{ fontSize: 26 }}
                        >
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                        </svg>
                      </div>
                    </a>
                    <a
                      href="https://discord.gg/headline_crypto"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="jss51">
                        <svg
                          fill="#000000"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          width="100px"
                          height="100px"
                        >
                          <path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z" />
                        </svg>
                      </div>
                    </a>
                    </div>
                    </div>
                </div>

              </div>
            </div>
          </footer>
        </div>
        <next-route-announcer>
          <p
            aria-live="assertive"
            id="__next-route-announcer__"
            role="alert"
            style={{
              border: 0,
              clip: "rect(0px, 0px, 0px, 0px)",
              height: 1,
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: 1,
              whiteSpace: "nowrap",
              overflowWrap: "normal",
            }}
          >
            ARC19 NFT Minter
          </p>
        </next-route-announcer>
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
        <div id="WEB3_CONNECT_MODAL_ID" />
      </div>

      <div className="container body-2"></div>
    </div>
  );
}

interface ClaimDialogProps {
  open: boolean;
  signed: boolean;
  triggerHelp(): void;
}

function ClaimDialog(props: ClaimDialogProps) {
  const [isOpen, setIsOpen] = React.useState(props.open);
  const [signed, setSigned] = React.useState(props.signed);
  const [progress, setProgress] = React.useState(0);

  const handleClose = React.useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setIsOpen(props.open);
    setSigned(props.signed);
  }, [props]);

  useEffect(() => {
    let p = 0;
    if (!signed || progress > 0 || progress >= 1.0) return;

    // "fake" timer just to give enough time to submit txn and
    // have it confirmed on the network, then load the NFT details
    const step = 100 / (6 * 1000);
    const interval = setInterval(() => {
      p += step;
      if (p > 1.0) {
        clearInterval(interval);
        setProgress(1.0);
        return;
      }
      setProgress(p);
    }, 100);
  }, [signed, progress]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      style={{ background: "lightgray" }}
    >
      <div
        className={Classes.DIALOG_BODY}
        style={{
          backgroundColor: "#171717",
          boxShadow:
            "rgb(0 0 0 / 50%) 0px 20px 25px -5px, rgb(0 0 0 / 25%) 0px 10px 10px -5px, rgb(255 255 255 / 10%) 0px 0px 0px 1px inset",
          borderRadius: "11px",
        }}
      >
        {!signed ? (
          <div className="container">
            <div className="container">
              <p>
                <b style={{ color: "#f0f0f0" }}>
                  Please Approve the transaction in your Algo wallet.{" "}
                </b>
              </p>
              <MobileView>
                <AnchorButton
                  style={{ borderRadius: "8px", margin: "20px 0px -30px" }}
                  text="Take me there"
                  href={
                    isIOS
                      ? "algorand-wc://wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1"
                      : "wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1"
                  }
                  intent="success"
                  large={true}
                  minimal={true}
                  outlined={true}
                  rightIcon="double-chevron-right"
                />
              </MobileView>
            </div>
            <div className="container">
              <button
                style={{ borderRadius: "4px" }}
                className="warning-btn"
                minimal={true}
                outlined={true}
                onClick={props.triggerHelp}
                intent="warning"
                text="Having Issues?"
              />
            </div>
          </div>
        ) : (
          <ProgressBar animate={true} intent="success" value={progress} />
        )}
      </div>
    </Dialog>
  );
}

export default AboutModule;

