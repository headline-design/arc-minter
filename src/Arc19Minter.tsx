// @ts-nocheck

import React, { useEffect } from "react";
import { SessionWallet } from "algorand-session-wallet";
import AlgorandWalletConnector from "./AlgorandWalletConnector";
import { Logo } from "./logo";
import { FileViewer } from "./FileViewer";
import IpfsUpload from "./IpfsUpload"
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

function Arc19Minter() {
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);

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

  const params = new URLSearchParams(window.location.search);
  const escrow = params.get("escrow");
  const addr = params.get("addr");
  const secret = params.get("secret");

  const [initial,setInitial] = React.useState(true)

  useEffect(() => {
    setClaimable(secret !== null && addr !== null && escrow !== null);
  }, [escrow, addr, secret]);

  function updateWallet(address) {
    setAddress(address);
    setConnected(true);
    setAddress(true);
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
      setInitial(false)
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
    <Button
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
        <Button
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
          <h3> Congrats on successfully collecting your HashLock NFT!</h3>
          <p>
            Please make sure the asset is in your Algorand Mobile Wallet and
            ready to be presented when you arrive at the venue. See you on the
            Moon!
          </p>
          <p>
            <b>Note: </b>If the image of your HashLock isn't appearing yet,
            give it a moment, it might be shy
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
            Treasure it as an ultra-rare HashLock NFT that you've earned by being a
            valuable part of the HEADLINE community. See you on Discord in the
            exclusive{" "}
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
            <b>Note: </b>If the image of your HashLock isn't appearing yet,
            give it a moment, it might be shy
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
            <a href="/">
              {" "}
              <Logo></Logo>
            </a>
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
      </header>
      <div className="jss9">
        <div className="MuiContainer-root jss8 MuiContainer-maxWidthLg">
          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
            <div
              className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8"
              style={{ alignItems: "center" }}
            >
              <h1 className="MuiTypography-root jss10 MuiTypography-h1">
                <span>ARC 19 NFT</span> Minter
              </h1>
              <h6 className="MuiTypography-root jss11 MuiTypography-subtitle1">
                Mint ARC19 NFTs on Algorand at the speed of light!
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
            <form noValidate="" autoComplete="off" className="jss26">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                  <div className="jss27">
                    <label className="jss17" htmlFor="upload-file">
                      Upload
                    </label>
                    <div className="jss28">
                      <input
                        type="file"
                        accept="audio/*, video/*, image/*, .html, .pdf"
                        id="upload-file"
                        hidden={true}
                      />
                      <IpfsUpload/>
                      <p>
                        <label htmlFor="upload-file">Browse file</label>
                      </p>
                      <br />
                      <p>
                        Supports JPG, PNG and MP4 videos. Max file size : 10MB.
                      </p>
                    </div>
                    <FileViewer></FileViewer>
                  </div>
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                    <div className="jss16">
                      <label htmlFor="name">Title</label>
                      <input
                        type="text"
                        defaultValue=""
                        id="name"
                        required={true}
                      />
                      <p className="jss32" style={{display:"none"}}>Name cannot be empty</p>
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
                        required={true}
                        defaultValue={""}
                      />
                      <p style={{display:"none"}} className="jss32">Add description for your token</p>
                    </div>
                  </div>
                  <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
                      <p className="jss17">NFT Type</p>
                      <div className="jss30">
                        <button
                          className="MuiButtonBase-root MuiButton-root MuiButton-text jss31 Mui-disabled Mui-disabled"
                          tabIndex={-1}
                          type="button"
                          disabled={true}
                        >
                          <span className="MuiButton-label">ARC19</span>
                        </button>
                        <button
    className="MuiButtonBase-root MuiButton-root MuiButton-text jss31"
    tabIndex={-1}
    type="button"
    disabled={false}
  >
    <span className="MuiButton-label">ARC69</span>
  </button>
                      </div>
                    </div>
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
                      <div className="jss16">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="number"
                          placeholder={1}
                          disabled=""
                          defaultValue={1}
                          id="quantity"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                    <div className="jss16">
                      <label htmlFor="sm-url">
                        Social Media URL <span>(optional)</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://twitter.com/example"
                        defaultValue=""
                        pattern="https?://.+"
                        id="sm-url"
                      />
                    </div>
                  </div>
                  <p className="jss36">
                    Once your NFT is minted on the Algorand blockchain, you will
                    not be able to edit or update any of its information.
                    <br />
                    <br />
                    You agree that any information uploaded to the Algorand's NFT
                    Minter will not contain material subject to copyright or
                    other proprietary rights, unless you have necessary
                    permission or are otherwise legally entitled to post the
                    material.
                  </p>
                  <button
    className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false Mui-disabled Mui-disabled"
    tabIndex={-1}
    type="submit"
    disabled=""
    style={{ marginBottom: 30 }}
  >
    <span className="MuiButton-label">Wallet not connected</span>
  </button>
  <div style={{display:"none"}}>
                  <button
                  hidden={true}
                    className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false Mui-disabled Mui-disabled"
                    tabIndex={-1}
                    type="submit"
                    disabled=""
                    style={{ marginBottom: 30 }}
                  >
                    <span className="MuiButton-label">Mint NFT</span>
                  </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="jss48">
        <div className="MuiContainer-root jss47 MuiContainer-maxWidthLg">
          <div
            className="MuiGrid-root MuiGrid-container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
              <p className="jss50">
              Algorand is a carbon-negative, pure proof-of-stake blockchain network built to last. 
              </p>
            </div>
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
              <div className="jss52">
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
          overflowWrap: "normal"
        }}
      >
        ARC19 NFT Minter
      </p>
    </next-route-announcer>
    <div id="WEB3_CONNECT_MODAL_ID">
      <div
        className="sc-jSFkmK kRmdPb web3modal-modal-lightbox"
        offset={0}
        opacity="0.4"
      >
        <div className="sc-gKAblj fVQpCb web3modal-modal-container">
          <div className="sc-iCoHVE knnrxv web3modal-modal-hitbox" />
          <div className="sc-fujyUd hCtqhh web3modal-modal-card">
            <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
              <div className="sc-hKFyIo jcNZzC web3modal-provider-container">
                <div className="sc-bdnylx jMhaxE web3modal-provider-icon">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjM1NSIgdmlld0JveD0iMCAwIDM5NyAzNTUiIHdpZHRoPSIzOTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMSkiPjxwYXRoIGQ9Im0xMTQuNjIyNjQ0IDMyNy4xOTU0NzIgNTIuMDA0NzE3IDEzLjgxMDE5OHYtMTguMDU5NDlsNC4yNDUyODMtNC4yNDkyOTJoMjkuNzE2OTgydjIxLjI0NjQ1OSAxNC44NzI1MjNoLTMxLjgzOTYyNGwtMzkuMjY4ODY4LTE2Ljk5NzE2OXoiIGZpbGw9IiNjZGJkYjIiLz48cGF0aCBkPSJtMTk5LjUyODMwNSAzMjcuMTk1NDcyIDUwLjk0MzM5NyAxMy44MTAxOTh2LTE4LjA1OTQ5bDQuMjQ1MjgzLTQuMjQ5MjkyaDI5LjcxNjk4MXYyMS4yNDY0NTkgMTQuODcyNTIzaC0zMS44Mzk2MjNsLTM5LjI2ODg2OC0xNi45OTcxNjl6IiBmaWxsPSIjY2RiZGIyIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA0ODMuOTYyMjcgMCkiLz48cGF0aCBkPSJtMTcwLjg3MjY0NCAyODcuODg5NTIzLTQuMjQ1MjgzIDM1LjA1NjY1NyA1LjMwNjYwNC00LjI0OTI5Mmg1NS4xODg2OGw2LjM2NzkyNSA0LjI0OTI5Mi00LjI0NTI4NC0zNS4wNTY2NTctOC40OTA1NjUtNS4zMTE2MTUtNDIuNDUyODMyIDEuMDYyMzIzeiIgZmlsbD0iIzM5MzkzOSIvPjxwYXRoIGQ9Im0xNDIuMjE2OTg0IDUwLjk5MTUwMjIgMjUuNDcxNjk4IDU5LjQ5MDA4NTggMTEuNjc0NTI4IDE3My4xNTg2NDNoNDEuMzkxNTExbDEyLjczNTg0OS0xNzMuMTU4NjQzIDIzLjM0OTA1Ni01OS40OTAwODU4eiIgZmlsbD0iI2Y4OWMzNSIvPjxwYXRoIGQ9Im0zMC43NzgzMDIzIDE4MS42NTcyMjYtMjkuNzE2OTgxNTMgODYuMDQ4MTYxIDc0LjI5MjQ1MzkzLTQuMjQ5MjkzaDQ3Ljc1OTQzNDN2LTM3LjE4MTMwM2wtMi4xMjI2NDEtNzYuNDg3MjUzLTEwLjYxMzIwOCA4LjQ5ODU4M3oiIGZpbGw9IiNmODlkMzUiLz48cGF0aCBkPSJtODcuMDI4MzAzMiAxOTEuMjE4MTM0IDg3LjAyODMwMjggMi4xMjQ2NDYtOS41NTE4ODYgNDQuNjE3NTYzLTQxLjM5MTUxMS0xMC42MjMyMjl6IiBmaWxsPSIjZDg3YzMwIi8+PHBhdGggZD0ibTg3LjAyODMwMzIgMTkyLjI4MDQ1NyAzNi4wODQ5MDU4IDMzLjk5NDMzNHYzMy45OTQzMzR6IiBmaWxsPSIjZWE4ZDNhIi8+PHBhdGggZD0ibTEyMy4xMTMyMDkgMjI3LjMzNzExNCA0Mi40NTI4MzEgMTAuNjIzMjI5IDEzLjc5NzE3IDQ1LjY3OTg4OC05LjU1MTg4NiA1LjMxMTYxNS00Ni42OTgxMTUtMjcuNjIwMzk4eiIgZmlsbD0iI2Y4OWQzNSIvPjxwYXRoIGQ9Im0xMjMuMTEzMjA5IDI2MS4zMzE0NDgtOC40OTA1NjUgNjUuODY0MDI0IDU2LjI1LTM5LjMwNTk0OXoiIGZpbGw9IiNlYjhmMzUiLz48cGF0aCBkPSJtMTc0LjA1NjYwNiAxOTMuMzQyNzggNS4zMDY2MDQgOTAuMjk3NDUxLTE1LjkxOTgxMi00Ni4yMTEwNDl6IiBmaWxsPSIjZWE4ZTNhIi8+PHBhdGggZD0ibTc0LjI5MjQ1MzkgMjYyLjM5Mzc3MSA0OC44MjA3NTUxLTEuMDYyMzIzLTguNDkwNTY1IDY1Ljg2NDAyNHoiIGZpbGw9IiNkODdjMzAiLz48cGF0aCBkPSJtMjQuNDEwMzc3NyAzNTUuODc4MTkzIDkwLjIxMjI2NjMtMjguNjgyNzIxLTQwLjMzMDE5MDEtNjQuODAxNzAxLTczLjIzMTEzMzEzIDUuMzExNjE2eiIgZmlsbD0iI2ViOGYzNSIvPjxwYXRoIGQ9Im0xNjcuNjg4NjgyIDExMC40ODE1ODgtNDUuNjM2NzkzIDM4LjI0MzYyNy0zNS4wMjM1ODU4IDQyLjQ5MjkxOSA4Ny4wMjgzMDI4IDMuMTg2OTY5eiIgZmlsbD0iI2U4ODIxZSIvPjxwYXRoIGQ9Im0xMTQuNjIyNjQ0IDMyNy4xOTU0NzIgNTYuMjUtMzkuMzA1OTQ5LTQuMjQ1MjgzIDMzLjk5NDMzNHYxOS4xMjE4MTNsLTM4LjIwNzU0OC03LjQzNjI2eiIgZmlsbD0iI2RmY2VjMyIvPjxwYXRoIGQ9Im0yMjkuMjQ1Mjg2IDMyNy4xOTU0NzIgNTUuMTg4NjgtMzkuMzA1OTQ5LTQuMjQ1MjgzIDMzLjk5NDMzNHYxOS4xMjE4MTNsLTM4LjIwNzU0OC03LjQzNjI2eiIgZmlsbD0iI2RmY2VjMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNTEzLjY3OTI1MiAwKSIvPjxwYXRoIGQ9Im0xMzIuNjY1MDk2IDIxMi40NjQ1OTMtMTEuNjc0NTI4IDI0LjQzMzQyNyA0MS4zOTE1MS0xMC42MjMyMjl6IiBmaWxsPSIjMzkzOTM5IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyODMuMzcyNjQ2IDApIi8+PHBhdGggZD0ibTIzLjM0OTA1NyAxLjA2MjMyMjk2IDE0NC4zMzk2MjUgMTA5LjQxOTI2NTA0LTI0LjQxMDM3OC01OS40OTAwODU4eiIgZmlsbD0iI2U4OGYzNSIvPjxwYXRoIGQ9Im0yMy4zNDkwNTcgMS4wNjIzMjI5Ni0xOS4xMDM3NzM5MiA1OC40Mjc3NjI5NCAxMC42MTMyMDc3MiA2My43MzkzNzgxLTcuNDI5MjQ1NDEgNC4yNDkyOTIgMTAuNjEzMjA3NzEgOS41NjA5MDYtOC40OTA1NjYxNyA3LjQzNjI2MSAxMS42NzQ1Mjg0NyAxMC42MjMyMjktNy40MjkyNDU0IDYuMzczOTM4IDE2Ljk4MTEzMjMgMjEuMjQ2NDU5IDc5LjU5OTA1NzctMjQuNDMzNDI4YzM4LjkxNTA5Ni0zMS4xNjE0NzMgNTguMDE4ODY5LTQ3LjA5NjMxOCA1Ny4zMTEzMjItNDcuODA0NTMzLS43MDc1NDgtLjcwODIxNS00OC44MjA3NTYtMzcuMTgxMzAzNi0xNDQuMzM5NjI1LTEwOS40MTkyNjUwNHoiIGZpbGw9IiM4ZTVhMzAiLz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAzOTkuMDU2NjExIDApIj48cGF0aCBkPSJtMzAuNzc4MzAyMyAxODEuNjU3MjI2LTI5LjcxNjk4MTUzIDg2LjA0ODE2MSA3NC4yOTI0NTM5My00LjI0OTI5M2g0Ny43NTk0MzQzdi0zNy4xODEzMDNsLTIuMTIyNjQxLTc2LjQ4NzI1My0xMC42MTMyMDggOC40OTg1ODN6IiBmaWxsPSIjZjg5ZDM1Ii8+PHBhdGggZD0ibTg3LjAyODMwMzIgMTkxLjIxODEzNCA4Ny4wMjgzMDI4IDIuMTI0NjQ2LTkuNTUxODg2IDQ0LjYxNzU2My00MS4zOTE1MTEtMTAuNjIzMjI5eiIgZmlsbD0iI2Q4N2MzMCIvPjxwYXRoIGQ9Im04Ny4wMjgzMDMyIDE5Mi4yODA0NTcgMzYuMDg0OTA1OCAzMy45OTQzMzR2MzMuOTk0MzM0eiIgZmlsbD0iI2VhOGQzYSIvPjxwYXRoIGQ9Im0xMjMuMTEzMjA5IDIyNy4zMzcxMTQgNDIuNDUyODMxIDEwLjYyMzIyOSAxMy43OTcxNyA0NS42Nzk4ODgtOS41NTE4ODYgNS4zMTE2MTUtNDYuNjk4MTE1LTI3LjYyMDM5OHoiIGZpbGw9IiNmODlkMzUiLz48cGF0aCBkPSJtMTIzLjExMzIwOSAyNjEuMzMxNDQ4LTguNDkwNTY1IDY1Ljg2NDAyNCA1NS4xODg2OC0zOC4yNDM2MjZ6IiBmaWxsPSIjZWI4ZjM1Ii8+PHBhdGggZD0ibTE3NC4wNTY2MDYgMTkzLjM0Mjc4IDUuMzA2NjA0IDkwLjI5NzQ1MS0xNS45MTk4MTItNDYuMjExMDQ5eiIgZmlsbD0iI2VhOGUzYSIvPjxwYXRoIGQ9Im03NC4yOTI0NTM5IDI2Mi4zOTM3NzEgNDguODIwNzU1MS0xLjA2MjMyMy04LjQ5MDU2NSA2NS44NjQwMjR6IiBmaWxsPSIjZDg3YzMwIi8+PHBhdGggZD0ibTI0LjQxMDM3NzcgMzU1Ljg3ODE5MyA5MC4yMTIyNjYzLTI4LjY4MjcyMS00MC4zMzAxOTAxLTY0LjgwMTcwMS03My4yMzExMzMxMyA1LjMxMTYxNnoiIGZpbGw9IiNlYjhmMzUiLz48cGF0aCBkPSJtMTY3LjY4ODY4MiAxMTAuNDgxNTg4LTQ1LjYzNjc5MyAzOC4yNDM2MjctMzUuMDIzNTg1OCA0Mi40OTI5MTkgODcuMDI4MzAyOCAzLjE4Njk2OXoiIGZpbGw9IiNlODgyMWUiLz48cGF0aCBkPSJtMTMyLjY2NTA5NiAyMTIuNDY0NTkzLTExLjY3NDUyOCAyNC40MzM0MjcgNDEuMzkxNTEtMTAuNjIzMjI5eiIgZmlsbD0iIzM5MzkzOSIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMjgzLjM3MjY0NiAwKSIvPjxwYXRoIGQ9Im0yMy4zNDkwNTcgMS4wNjIzMjI5NiAxNDQuMzM5NjI1IDEwOS40MTkyNjUwNC0yNC40MTAzNzgtNTkuNDkwMDg1OHoiIGZpbGw9IiNlODhmMzUiLz48cGF0aCBkPSJtMjMuMzQ5MDU3IDEuMDYyMzIyOTYtMTkuMTAzNzczOTIgNTguNDI3NzYyOTQgMTAuNjEzMjA3NzIgNjMuNzM5Mzc4MS03LjQyOTI0NTQxIDQuMjQ5MjkyIDEwLjYxMzIwNzcxIDkuNTYwOTA2LTguNDkwNTY2MTcgNy40MzYyNjEgMTEuNjc0NTI4NDcgMTAuNjIzMjI5LTcuNDI5MjQ1NCA2LjM3MzkzOCAxNi45ODExMzIzIDIxLjI0NjQ1OSA3OS41OTkwNTc3LTI0LjQzMzQyOGMzOC45MTUwOTYtMzEuMTYxNDczIDU4LjAxODg2OS00Ny4wOTYzMTggNTcuMzExMzIyLTQ3LjgwNDUzMy0uNzA3NTQ4LS43MDgyMTUtNDguODIwNzU2LTM3LjE4MTMwMzYtMTQ0LjMzOTYyNS0xMDkuNDE5MjY1MDR6IiBmaWxsPSIjOGU1YTMwIi8+PC9nPjwvZz48L3N2Zz4="
                    alt="MetaMask"
                  />
                </div>
                <div className="sc-gtssRu bktcUM web3modal-provider-name">
                  MetaMask
                </div>
                <div className="sc-dlnjPT eFHlqH web3modal-provider-description">
                  Connect to your MetaMask Wallet
                </div>
              </div>
            </div>
            <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
              <div className="sc-hKFyIo jcNZzC web3modal-provider-container">
                <div className="sc-bdnylx jMhaxE web3modal-provider-icon">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjAlIiBjeT0iNTAlIiByPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1ZDlkZjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDZmZmYiLz48L3JhZGlhbEdyYWRpZW50PjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0ibTI1NiAwYzE0MS4zODQ4OTYgMCAyNTYgMTE0LjYxNTEwNCAyNTYgMjU2cy0xMTQuNjE1MTA0IDI1Ni0yNTYgMjU2LTI1Ni0xMTQuNjE1MTA0LTI1Ni0yNTYgMTE0LjYxNTEwNC0yNTYgMjU2LTI1NnoiIGZpbGw9InVybCgjYSkiLz48cGF0aCBkPSJtNjQuNjkxNzU1OCAzNy43MDg4Mjk4YzUxLjUzMjgwNzItNTAuMjc4NDM5NyAxMzUuMDgzOTk0Mi01MC4yNzg0Mzk3IDE4Ni42MTY3OTkyIDBsNi4yMDIwNTcgNi4wNTEwOTA2YzIuNTc2NjQgMi41MTM5MjE4IDIuNTc2NjQgNi41ODk3OTQ4IDAgOS4xMDM3MTc3bC0yMS4yMTU5OTggMjAuNjk5NTc1OWMtMS4yODgzMjEgMS4yNTY5NjE5LTMuMzc3MSAxLjI1Njk2MTktNC42NjU0MjEgMGwtOC41MzQ3NjYtOC4zMjcwMjA1Yy0zNS45NTA1NzMtMzUuMDc1NDk2Mi05NC4yMzc5NjktMzUuMDc1NDk2Mi0xMzAuMTg4NTQ0IDBsLTkuMTQwMDI4MiA4LjkxNzU1MTljLTEuMjg4MzIxNyAxLjI1Njk2MDktMy4zNzcxMDE2IDEuMjU2OTYwOS00LjY2NTQyMDggMGwtMjEuMjE1OTk3My0yMC42OTk1NzU5Yy0yLjU3NjY0MDMtMi41MTM5MjI5LTIuNTc2NjQwMy02LjU4OTc5NTggMC05LjEwMzcxNzd6bTIzMC40OTM0ODUyIDQyLjgwODkxMTcgMTguODgyMjc5IDE4LjQyMjcyNjJjMi41NzY2MjcgMi41MTM5MTAzIDIuNTc2NjQyIDYuNTg5NzU5My4wMDAwMzIgOS4xMDM2ODYzbC04NS4xNDE0OTggODMuMDcwMzU4Yy0yLjU3NjYyMyAyLjUxMzk0MS02Ljc1NDE4MiAyLjUxMzk2OS05LjMzMDg0LjAwMDA2Ni0uMDAwMDEtLjAwMDAxLS4wMDAwMjMtLjAwMDAyMy0uMDAwMDMzLS4wMDAwMzRsLTYwLjQyODI1Ni01OC45NTc0NTFjLS42NDQxNi0uNjI4NDgxLTEuNjg4NTUtLjYyODQ4MS0yLjMzMjcxIDAtLjAwMDAwNC4wMDAwMDQtLjAwMDAwOC4wMDAwMDctLjAwMDAxMi4wMDAwMTFsLTYwLjQyNjk2ODMgNTguOTU3NDA4Yy0yLjU3NjYxNDEgMi41MTM5NDctNi43NTQxNzQ2IDIuNTEzOTktOS4zMzA4NDA4LjAwMDA5Mi0uMDAwMDE1MS0uMDAwMDE0LS4wMDAwMzA5LS4wMDAwMjktLjAwMDA0NjctLjAwMDA0NmwtODUuMTQzODY3NzQtODMuMDcxNDYzYy0yLjU3NjYzOTI4LTIuNTEzOTIxLTIuNTc2NjM5MjgtNi41ODk3OTUgMC05LjEwMzcxNjNsMTguODgyMzEyNjQtMTguNDIyNjk1NWMyLjU3NjYzOTMtMi41MTM5MjIyIDYuNzU0MTk5My0yLjUxMzkyMjIgOS4zMzA4Mzk3IDBsNjAuNDI5MTM0NyA1OC45NTgyNzU4Yy42NDQxNjA4LjYyODQ4IDEuNjg4NTQ5NS42Mjg0OCAyLjMzMjcxMDMgMCAuMDAwMDA5NS0uMDAwMDA5LjAwMDAxODItLjAwMDAxOC4wMDAwMjc3LS4wMDAwMjVsNjAuNDI2MTA2NS01OC45NTgyNTA4YzIuNTc2NTgxLTIuNTEzOTggNi43NTQxNDItMi41MTQwNzQzIDkuMzMwODQtLjAwMDIxMDMuMDAwMDM3LjAwMDAzNTQuMDAwMDcyLjAwMDA3MDkuMDAwMTA3LjAwMDEwNjNsNjAuNDI5MDU2IDU4Ljk1ODM1NDhjLjY0NDE1OS42Mjg0NzkgMS42ODg1NDkuNjI4NDc5IDIuMzMyNzA5IDBsNjAuNDI4MDc5LTU4Ljk1NzE5MjVjMi41NzY2NC0yLjUxMzkyMzEgNi43NTQxOTktMi41MTM5MjMxIDkuMzMwODM5IDB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk4IDE2MCkiLz48L2c+PC9zdmc+"
                    alt="WalletConnect"
                  />
                </div>
                <div className="sc-gtssRu bktcUM web3modal-provider-name">
                  WalletConnect
                </div>
                <div className="sc-dlnjPT eFHlqH web3modal-provider-description">
                  Scan with WalletConnect to connect
                </div>
              </div>
            </div>
            <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
              <div className="sc-hKFyIo jcNZzC web3modal-provider-container">
                <div className="sc-bdnylx jMhaxE web3modal-provider-icon">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYwIiBoZWlnaHQ9IjUxOCIgdmlld0JveD0iMCAwIDU2MCA1MTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01NTQuNTU1IDE2OS43OTZMNDg1Ljg2NyAxOTUuODg1QzQ4Mi45NzkgMTk2LjkzNiA0ODAuMTc5IDE5NC4xMzQgNDgxLjQwNCAxOTEuMjQ1TDU1Ny45NjggNS4zODEwOUM1NTkuMTA1IDIuNTc5NTYgNTU2LjM5MyAtMC4zMDk1MTQgNTUzLjU5MyAwLjc0MTA1OUw0MDguMDc4IDUxLjY5MzlDNDA1LjI3OCA1Mi42NTY5IDQwMy4wMDMgNTQuODQ1NiA0MDEuODY2IDU3LjY0NzFMMzAzLjI1MiAzMDYuNTQ1QzMwMi4wMjcgMzA5LjY5NyAzMDUuMDg5IDMxMi44NDkgMzA4LjIzOSAzMTEuNzExTDM2OS44NCAyODkuMTIzQzM3My4yNTMgMjg3Ljg5OCAzNzYuNDAzIDI5MS41NzUgMzc0LjU2NSAyOTQuODE0TDI4NC4wODkgNDQ4LjQ2QzI4Mi4xNjQgNDUxLjc4NyAyNzcuMjY0IDQ1MS43ODcgMjc1LjMzOSA0NDguNDZMMTg0Ljg2MyAyOTQuNzI2QzE4My4wMjUgMjkxLjU3NSAxODYuMDg4IDI4Ny44MSAxODkuNTg4IDI4OS4wMzZMMjUxLjE4OSAzMTEuNjIzQzI1NC4zMzkgMzEyLjc2MSAyNTcuNDAxIDMwOS42MSAyNTYuMTc2IDMwNi40NThMMTU3LjQ3NSA1Ny42NDcxQzE1Ni4zMzcgNTQuODQ1NiAxNTQuMTUgNTIuNzQ0NCAxNTEuMjYyIDUxLjY5MzlMNS45MjI2NyAwLjc0MTA1OUMzLjAzNTEzIC0wLjIyMTk2NyAwLjQxMDA5MiAyLjU3OTU2IDEuNTQ3NjEgNS4zODEwOUw3OC4wMjM3IDE5MS4yNDVDNzkuMTYxMiAxOTQuMDQ3IDc2LjM2MTIgMTk2LjkzNiA3My41NjExIDE5NS44ODVMNS4zMTAxNiAxNjkuNzk2QzEuODEwMTEgMTY4LjQ4MyAtMS4zMzk5MyAxNzIuMjQ3IDAuNTg1MDk1IDE3NS40ODZMMjAzLjc2MyA1MTIuMDJDMjA1Ljc3NSA1MTUuMzQ3IDIwOS4zNjMgNTE3LjM2IDIxMy4zMDEgNTE3LjM2SDM0Ni40NzdDMzUwLjMyOCA1MTcuMzYgMzU0LjAwMyA1MTUuMzQ3IDM1Ni4wMTUgNTEyLjAyTDU1OS41NDMgMTc1LjQ4NkM1NjEuMjA1IDE3Mi4yNDcgNTU4LjA1NSAxNjguNDgzIDU1NC41NTUgMTY5Ljc5NloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcikiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjIyNi4wMDkiIHkxPSIwLjUyMDI0OCIgeDI9IjU5MC43NTQiIHkyPSI5OS43NjQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM3NzM1RTgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQzYyQ0YxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
                    alt="Venly"
                  />
                </div>
                <div className="sc-gtssRu bktcUM web3modal-provider-name">
                  Venly
                </div>
                <div className="sc-dlnjPT eFHlqH web3modal-provider-description">
                  Connect to Venly Wallet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

      <div className="container body-2">
      </div>
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
      <div className={Classes.DIALOG_BODY } style={{backgroundColor:"#171717",
    boxShadow: "rgb(0 0 0 / 50%) 0px 20px 25px -5px, rgb(0 0 0 / 25%) 0px 10px 10px -5px, rgb(255 255 255 / 10%) 0px 0px 0px 1px inset", borderRadius: "11px"}}>
        {!signed ? (
          <div className="container" >
            <div className="container">
              <p>
                <b style={{color: "#f0f0f0"}}>Please Approve the transaction in your Algo wallet. </b>
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
              <Button
                style={{ borderRadius: "4px"}}
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
          <ProgressBar  animate={true} intent="success" value={progress} />
        )}
      </div>
    </Dialog>
  );
}

export default Arc19Minter;
