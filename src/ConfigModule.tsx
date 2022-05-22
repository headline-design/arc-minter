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
import { MintingUtils } from "./mintingUtils";
import Accordion from "./Accordion";
import SaveToJson from "./SaveToJson";
import DynamicJSON from "./DynamicJSON";
import JSONer from "./jsoner";
import CID from "cids";

import Preview from "./preview";
import { setSendTransactionHeaders } from "algosdk/dist/types/src/client/v2/algod/sendRawTransaction";

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

function ConfigModule() {
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

    let asaId = await Pipeline.createAsa(asaData);
    return asaId;
  }

  function triggerHelp() {
    setOpen(false);
    setLoading(false);
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

  async function handleCollect() {
    if (secret === null || addr === null || escrow === null) {
      return;
    }

    setLoading(true);
    setOpen(true);

    try {
      const asaId = await getAsaId(escrow);
      const txn_group = await collect(sw, asaId, escrow, addr, secret);

      setSigned(true);

      getNFT(asaId).then((nft) => {
        setNFT(nft);
      });

      let metadata = await getNFTInfo(asaId);
      setMetaData(metadata.properties.flavor);
      setMetaData2(metadata.properties);

      await sendWait(txn_group);

      setClaimable(false);
      setClaimed(true);
      setInitial(false);
    } catch (error) {
      const e = error as Error;
      if (e.message.includes("overspend")) {
        alert(
          "This account doe not have enough Algos to claim. If needed, contact admin@headline-inc.com"
        );
      } else {
        alert("Something went wrong: " + error);
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  let message = (
    <div>
      <h3> Welcome Collectors!</h3>
      <p>Connect your wallet and collect your HashLock NFT</p>
    </div>
  );

  let buttons = (
    <button
      style={{
        backgroundColor: "#7b78ff",
        color: "#000",
        borderColor: "#7b78ff",
        borderRadius: "8px",
        width: "100%",
        marginTop: "8px",
      }}
      minimal={true}
      outlined={true}
      intent="success"
      large={true}
      icon="circle"
      text="Collect"
      onClick={handleCollect}
      disabled={!connected || !claimable}
      loading={loading}
    />
  );

  if (nft.id !== 0 && claimed === true) {
    buttons = (
      <div>
        <button
          style={{
            color: "#7b78ff",
            borderColor: "#7b78ff",
            borderRadius: "8px",
            margin: "8px",
          }}
          minimal={true}
          outlined={true}
          intent="success"
          large={true}
          icon="download"
          text="Download"
          onClick={handleDownload}
        />
        <AnchorButton
          style={{
            color: "white",
            borderColor: "white",
            borderRadius: "8px",
            margin: "8px",
          }}
          minimal={true}
          outlined={true}
          large={true}
          intent="success"
          href={"https://www.nftexplorer.app/asset/" + nft.id}
          target="_blank"
        >
          <img
            style={{ width: "20px", float: "left", marginRight: "8px" }}
            alt="nft explorer icon"
            src="/nftexplorer.ico"
          />
          NFT Explorer
        </AnchorButton>
      </div>
    );

    if (nft.id < 420800534) {
      message = (
        <div>
          <h3> Congrats on successfully minting your Algorand NFT!</h3>
          <p>
            Please make sure the NFT is live on Algorand mainnet and all content 
            has been uploaded to IPFS.
          </p>
          <p>
            <b>Note: </b>If the asset information for your NFT isn't appearing on NFTExplorer yet, give
            it up to 24 hours, it might be shy.
          </p>
        </div>
      );
    } else {
      message = (
        <div>
          <h3> Congrats on successfully collecting your HashLock NFT! </h3>
          <p>
            <MetaDataProps object={metaData2}></MetaDataProps>
            <p> {metaData}</p>
          </p>
          <p></p>
          <p>
            Treasure it as an ultra-rare HashLock NFT that you've earned by
            being a valuable part of the HEADLINE community. See you on Discord
            in the exclusive{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/xRBEZB5j"
            >
              HashLocks{" "}
            </a>
            channel!
          </p>
          <p>
            <b>Note: </b>If the image of your HashLock isn't appearing yet, give
            it a moment, it might be shy
          </p>
        </div>
      );
    }
  }

  return (
    <div className="App" style={{ background: "#000" }}>
      <div className="container body-1">
        <div id="__next">
          <header className="MuiPaper-root MuiAppBar-root jss2 MuiAppBar-positionStatic MuiAppBar-colorPrimary MuiPaper-elevation4">
            <div className="MuiContainer-root jss1 MuiContainer-maxWidthLg">
              <div className="jss3">
                <a className="logo-nav" href="/">
                  <Logo></Logo>
                </a>
                <div className="jss5">
                <div className="jss6">
    <a className="menuItem active" href="/">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className="MuiSvgIcon-root menuItemIcon"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0S128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80s192-35.8 192-80s-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8c29.5 14.3 51.2 33.5 60 57.2z"
    />
  </svg>
      Mint
    </a>
    <a className="menuItem" href="#config">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" className="MuiSvgIcon-root menuItemIcon"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"></path></svg>
		
		
      Config
    </a>
    <a className="menuItem" href="#about">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={16}
    className="MuiSvgIcon-root menuItemIcon"
  >
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
  </svg>
      About
    </a>
  </div>
                <div className="buttons">
                  <AlgorandWalletConnector
                    darkMode={true}
                    address={address}
                    sessionWallet={sessionWallet}
                    accts={accts}
                    connected={connected}
                    onChange={updateWallet}
                  />
                </div>
                </div>
              </div>
            </div>
          </header>

          <div className="jss9">
            <div className="MuiContainer-root jss8 MuiContainer-maxWidthLg">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                <div
                  className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8"
                  style={{ alignItems: "center" }}
                >
                  <h1 className="MuiTypography-root jss10 MuiTypography-h1">
                    <span>ARC</span> Minter
                  </h1>
                  <h6 className="MuiTypography-root jss11 MuiTypography-subtitle1">
                    Mint ARC19 and ARC69 NFTs on Algorand at supersonic speed!
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="jss25">
            <div className="MuiContainer-root jss14 MuiContainer-maxWidthLg">
              <div className="jss15">
                <div className="form-title">
                  <h3>Mint your NFT</h3>
                </div>
                <div className="jss26">
                  <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                      <div className="jss27">
                        <label className="jss17" htmlFor="upload-file">
                          Upload
                        </label>
                        <IpfsUpload />
                        <div>
                          <input
                            type="file"
                            accept="audio/*, video/*, image/*, .html, .pdf"
                            id="upload-file"
                            hidden={true}
                          />

                          <br />
                          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                            <div className="jss16">
                              <label htmlFor="name">Asset Name</label>
                              <input
                                type="text"
                                defaultValue=""
                                id="name"
                                onChange={updateJSON}
                                required={true}
                              />
                              <p className="jss32" style={{ display: "none" }}>
                                Name cannot be empty
                              </p>
                            </div>
                          </div>
                          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                            <div className="jss16">
                              <label htmlFor="description">Description</label>
                              <textarea
                                type="text"
                                style={{ minHeight: 100 }}
                                id="description"
                                spellCheck="false"
                                onChange={updateJSON}
                                required={true}
                                defaultValue={""}
                              />
                              <p style={{ display: "none" }} className="jss32">
                                Add description for your token
                              </p>
                            </div>
                          </div>
                          <div container spacing={2}></div>

                          <div className="jss16">
                            <div className="total-supply-label-container">
                              
                            <label
                                htmlFor="input-amount-decimals"
                                className=""
                              >
                                Decimals
                              </label>
                             
                          <div className="label-switch">
                          <label htmlFor="ImageMimetype" className="" style={{marginRight: ".5rem"}}>
                                  Image Mimetype
                                </label>
                          <div className="big-switch custom-switch custom-control">
                                <input
                                  type="checkbox"
                                  id="toggleImageMimetypeSwitch"
                                  name="toggleInputAssetURL"
                                  onClick={handleClick6}
                                  className="custom-control-input"
                                  defaultChecked=""
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="toggleImageMimetypeSwitch"
                                />
                              </div>
                                           
                             
                     
                                
                              </div>
                              
                            </div>
                            <div className="total-supply-container">
                              
                              <input
                                type="number"
                                placeholder="0"
                                defaultValue=""
                                onChange={updateJSON}
                                pattern=""
                                id="decimals"
                              />
                              <input
                                type="text"
                                placeholder="image/jpeg"
                                defaultValue=""
                                onChange={updateJSON}
                                pattern=""
                                id="image_mimetype"
                                disabled={isDisabled6}
                              />
                            </div>

                            <div className="error-total-supply invalid-feedback">
                              Total asset supply must be a positive number and
                              smaller than 18,446,744,073,709,552,000
                            </div>
                          </div>
                        </div>
                        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                            <div className="jss16">
                              <label htmlFor="input-unit-name" className="">
                                <span className="unit-name-label">
                                  Unit Name{" "}
                                </span>
                                <small className="asset-description">
                                  What Unit is associated with your asset?
                                </small>
                              </label>
                              <input
                                type="text"
                                placeholder="NFT1"
                                defaultValue=""
                                pattern=""
                                onChange={updateJSON}
                                id="unitName"
                              />
                            </div>
                          </div>
                          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                            <div className="jss16">
                              <HexToAlgo hash={hash}></HexToAlgo>
                              <JSONer
                                callBack={function (data) {
                                  window.defaultJSON.properties = data;
                                  document.getElementById("preview").innerText =
                                    JSON.stringify(window.defaultJSON);
                                }}
                                object={myJSON}
                              ></JSONer>
                            </div>
                            <div className="jss16">
                              <p id="preview" className="metadata-object">
                                {JSON.stringify(window.defaultJSON)}
                              </p>
                              <div>
                                <button
                                  className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
                                  tabIndex={-1}
                                  id="JSONuploader"
                                  style={{ marginBottom: 30 }}
                                >
                                  <span className="MuiButton-label">
                                    Upload JSON
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                        <div className="jss16">
                          <div className="label-switch">
                            <label className="">Asset URL</label>
                            <div className="permitted">
                              <div className="big-switch custom-switch custom-control">
                                <input
                                  type="checkbox"
                                  id="toggleInputAssetURLSwitch"
                                  name="toggleInputAssetURL"
                                  onClick={handleClick5}
                                  className="custom-control-input"
                                  defaultChecked=""
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="toggleInputAssetURLSwitch"
                                />
                              </div>
                            </div>
                          </div>
                          <input
                            id="input-asset-url"
                            name="assetURL"
                            placeholder="template-ipfs://{ipfscid:0:dag-pb:reserve:sha2-256}"
                            type="text"
                            className="custom-input-size form-control"
                            aria-invalid="false"
                            defaultValue="template-ipfs://{ipfscid:0:dag-pb:reserve:sha2-256}"
                            disabled={isDisabled5}
                          />
                          <div className="invalid-feedback">
                            Asset Url Max size is 96 bytes.
                          </div>
                        </div>
                        <div className="jss16">
                          <div className="label-switch">
                            <label className="">Reserve Address:</label>
                            <div className="permitted">
                              <div className="big-switch custom-switch custom-control">
                                <input
                                  type="checkbox"
                                  id="toggleInputReserveSwitch"
                                  name="toggleReserve"
                                  onClick={handleClick4}
                                  className="custom-control-input"
                                  defaultChecked=""
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="toggleInputReserveSwitch"
                                />
                              </div>
                            </div>
                          </div>
                          <input
                            name="assetReserve"
                            placeholder="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
                            type="text"
                            id="input-reserve"
                            disabled={isDisabled4}
                            className="custom-input-size form-control"
                            aria-invalid="false"
                            defaultValue="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
                          />
                          <div className="invalid-feedback">
                            Reserve Address is invalid
                          </div>
                        </div>
                        <div className="accordion">
                          <div className="accordion-header">
                            <div className="jss16">
                              <label
                                className="advanced-options "
                                onClick={toggle}
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="angle-down"
                                  className="svg-inline--fa fa-angle-down fa-w-10 mr-2"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 320 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                                  />
                                </svg>
                                Advanced Options
                                <hr />
                              </label>
                            </div>

                            <div>
                              <div
                                className="asset-form-block collapse show"
                                style={{ display: advancedOptions }}
                              >
                                <div className="jss16">
                                  <label
                                    htmlFor="assetMetadataHash"
                                    className=""
                                  >
                                    Metadata Hash
                                  </label>
                                  <input
                                    id="input-assetMetadataHash"
                                    name="assetMetadataHash"
                                    placeholder="32 characters | 32 base64 characters | 64 Hex characters"
                                    type="text"
                                    className="custom-input-size form-control"
                                    aria-invalid="false"
                                    defaultValue=""
                                  />
                                  <div className="invalid-feedback">
                                    Asset Metadata Hash size should be 32
                                    characters, 32 base64 characters or 64 Hex
                                    characters
                                  </div>
                                </div>
                                <div className="jss16">
                                  <div className="label-switch">
                                    <label className="">Manager Address:</label>
                                    <div className="permitted">
                                      <div className="big-switch custom-switch custom-control">
                                        <input
                                          type="checkbox"
                                          id="toggleInputManagerSwitch"
                                          name="toggleManager"
                                          onClick={handleClick3}
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="toggleInputManagerSwitch"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <input
                                    name="assetManager"
                                    value={address}
                                    placeholder="Manager address"
                                    id="input-manager"
                                    type="text"
                                    className="custom-input-size form-control"
                                    aria-invalid="false"
                                    disabled={isDisabled3}
                                  />
                                  <div className="invalid-feedback">
                                    Manager Address is invalid
                                  </div>
                                </div>
                                <div className="jss16">
                                  <div className="label-switch">
                                    <label className="">Freeze Address:</label>
                                    <div className="permitted">
                                      <div className="big-switch custom-switch custom-control">
                                        <input
                                          type="checkbox"
                                          id="toggleFreezeSwitch"
                                          name="toggleFreeze"
                                          onClick={handleClick2}
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="toggleFreezeSwitch"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <input
                                    name="assetFreeze"
                                    value={address}
                                    placeholder="Freeze Address"
                                    type="text"
                                    className="custom-input-size form-control"
                                    aria-invalid="false"
                                    disabled={isDisabled2}
                                  />
                                  <div className="invalid-feedback">
                                    Freeze Address is invalid
                                  </div>
                                </div>
                                <div className="jss16">
                                  <div className="label-switch">
                                    <label className="">
                                      Clawback Address:
                                    </label>
                                    <div className="permitted">
                                      <div className="big-switch custom-switch custom-control">
                                        <input
                                          type="checkbox"
                                          id="toggleClawbackSwitch"
                                          name="toggleClawback"
                                          onClick={handleClick}
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="toggleClawbackSwitch"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <input
                                    name="assetClawback"
                                    id="assetClawback"
                                    value={address}
                                    type="text"
                                    className="custom-input-size form-control"
                                    placeholder="Clawback address"
                                    aria-invalid="false"
                                    disabled={isDisabled}
                                  />
                                  <div className="invalid-feedback">
                                    Clawback Address is invalid
                                  </div>
                                </div>
                                <div className="jss16">
                                  <div className="label-switch">
                                    <label
                                      htmlFor="frozen-dropdown"
                                      className=""
                                    >
                                      Note
                                    </label>
                                    <label className="">1000 bytes left</label>
                                  </div>
                                  <textarea
                                    name="note"
                                    className="note-input-field form-control"
                                    aria-invalid="false"
                                    id="input-note"
                                    defaultValue={""}
                                  />
                                  <div className="invalid-feedback">
                                    Note can not exceed 1000 bytes.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div container spacing={2}></div>
                      <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-12">
                          <p className="jss83">NFT Type</p>
                          <input
                            type="checkbox"
                            id="checkedA"
                            hidden
                            className="jss35"
                          />
                          <label htmlFor="checkedA" className="jss84">
                            <div>ARC19</div>
                            <div>ARC69</div>
                          </label>
                        </div>
                        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
                          <div className="jss16">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                              id="input-amount"
                              name="assetTotal"
                              className="custom-input-size form-control  "
                              placeholder={1}
                              type="text"
                              defaultValue={1}
                              inputMode="numeric"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="jss36">
                        Once your NFT is minted on the Algorand blockchain, you
                        will not be able to edit or update any of its
                        information unless you minted the NFT wtih ARC19. If you minted
                        the NFT with ARC19, you may update the NFT's information with an "asset config"
                        transaction.
                        <br />
                        <br />
                        You agree that any information uploaded to
                        ARC Minter will not contain material subject
                        to copyright or other proprietary rights, unless you
                        have necessary permission or are otherwise legally
                        entitled to post the material.
                      </p>
                      <button
                        className=" Mui-not-btn MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false Mui-disabled Mui-disabled"
                        tabIndex={-1}
                        id="not-connected"
                        type="submit"
                        disabled=""
                        style={{ marginBottom: 30 }}
                      >
                        <span className="MuiButton-label">
                          Wallet not connected
                        </span>
                      </button>
                      <div id="connected" style={{ display: "none" }}>
                        <button
                          hidden={true}
                          onClick={async () => {
                            let asaId = await createAsa();
                            alert(asaId);
                            setAsa(
                              "https://www.nftexplorer.app/asset/" + asaId
                            );
                            let prevHash = urlHash;
                            setUrlHash("https://ipfs.io/ipfs/" + prevHash);
                            setAsaId(asaId);
                          }}
                          className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
                          tabIndex={-1}
                          style={{ marginBottom: 30 }}
                        >
                          <span className="MuiButton-label">Mint NFT</span>
                        </button>
                        <Preview name={asa} url={asa} imgUrl={urlHash} />
                      </div>
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

export default ConfigModule;
