// @ts-nocheck

import React, { useEffect } from "react";
import { SessionWallet } from "algorand-session-wallet";
import AlgorandWalletConnector from "./AlgorandWalletConnector";
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

function App() {
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
      <Navbar
        style={{
          background: "#242424",
          boxShadow: "0 1px 1px rgba(0,0,0,0.3)",
        }}
      >
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <a href="/">
              <svg
                className="header-icon"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 512 512"
              >
                <g>
                  <g
                    xmlns="http://www.w3.org/2000/svg"
                    id="_x31_3_Support_Ticket"
                  >
                    <g>
                      <path
                        d="m494.133 215.849c10.595-7.661 17.223-19.613 17.223-32.707v-42.378c0-12.008-9.725-21.732-21.732-21.732h-360.433v273.937h360.433c12.007 0 21.732-9.725 21.732-21.732v-42.379c0-13.093-6.628-25.046-17.223-32.707-10.866-7.824-18.255-22.928-18.255-40.151s7.389-32.327 18.255-40.151zm-79.687 47.653c0 9.619-7.205 17.687-16.766 18.764l-8.192.944c-1.332 4.054-2.955 7.975-4.86 11.742l5.168 6.484c5.964 7.595 5.332 18.371-1.422 25.131l-10.681 10.678c-3.576 3.573-8.319 5.537-13.365 5.537-4.218 0-8.378-1.44-11.71-4.059l-6.542-5.218c-3.767 1.907-7.688 3.531-11.742 4.86l-.944 8.216c-1.077 9.534-9.142 16.742-18.767 16.742h-15.005c-9.619 0-17.684-7.208-18.761-16.766l-.944-8.192c-4.054-1.329-7.98-2.953-11.747-4.86l-6.484 5.17c-3.388 2.666-7.547 4.107-11.766 4.107-5.051 0-9.797-1.966-13.368-5.539l-10.67-10.673c-6.762-6.76-7.399-17.538-1.483-25.07l5.221-6.545c-1.907-3.767-3.528-7.688-4.86-11.744l-8.216-.944c-9.537-1.08-16.742-9.147-16.742-18.764v-15.005c0-9.617 7.205-17.681 16.761-18.764l8.197-.944c1.332-4.054 2.953-7.977 4.86-11.742l-5.17-6.484c-5.966-7.595-5.33-18.374 1.433-25.133l10.675-10.675c3.568-3.571 8.314-5.537 13.363-5.537 4.221 0 8.378 1.441 11.707 4.059l6.542 5.218c3.767-1.907 7.688-3.531 11.747-4.86l.944-8.221c1.077-9.529 9.142-16.737 18.761-16.737h15.005c9.625 0 17.689 7.208 18.767 16.766l.944 8.192c4.054 1.329 7.975 2.953 11.742 4.86l6.484-5.173c3.39-2.663 7.55-4.104 11.768-4.104 5.046 0 9.789 1.963 13.36 5.531l10.681 10.681c6.76 6.762 7.391 17.538 1.48 25.07l-5.221 6.545c1.905 3.767 3.528 7.691 4.86 11.744l8.219.944c9.534 1.08 16.74 9.147 16.74 18.764v15.004z"
                        fill="currentColor"
                      />
                      <path
                        d="m396.463 240.53-15.47-1.779c-1.856-8.044-5.028-15.78-9.437-22.741l9.746-12.222c2.552-3.248 2.243-7.812-.619-10.674l-10.675-10.675c-2.862-2.862-7.426-3.172-10.675-.619l-12.222 9.746c-6.961-4.409-14.696-7.58-22.741-9.436l-1.779-15.47c-.464-4.1-3.868-7.117-7.967-7.117h-15.004c-4.1 0-7.503 3.017-7.968 7.117l-1.779 15.47c-8.045 1.856-15.78 5.028-22.742 9.437l-12.222-9.747c-3.249-2.553-7.812-2.243-10.675.619l-10.675 10.674c-2.862 2.862-3.171 7.425-.619 10.675l9.746 12.221c-4.409 6.962-7.58 14.697-9.437 22.742l-15.47 1.779c-4.1.464-7.116 3.868-7.116 7.968v15.006c0 4.099 3.016 7.503 7.116 7.967l15.47 1.779c1.856 8.044 5.028 15.779 9.437 22.741l-9.746 12.222c-2.552 3.248-2.243 7.813.619 10.675l10.675 10.675c2.862 2.862 7.426 3.171 10.675.618l12.222-9.747c6.962 4.409 14.697 7.581 22.742 9.438l1.779 15.47c.464 4.099 3.868 7.116 7.968 7.116h15.006c4.1 0 7.503-3.018 7.967-7.116l1.779-15.47c8.045-1.857 15.78-5.029 22.741-9.438l12.222 9.747c3.248 2.552 7.812 2.243 10.675-.619l10.675-10.675c2.862-2.862 3.171-7.425.619-10.675l-9.746-12.221c4.409-6.962 7.58-14.697 9.437-22.742l15.47-1.779c4.1-.464 7.116-3.868 7.116-7.968v-15.006c-.001-4.098-3.018-7.502-7.118-7.966zm-60.721 44.064c-15.838 15.838-41.456 15.838-57.294 0-15.838-15.732-15.838-41.456 0-57.188 15.838-15.838 41.456-15.838 57.294 0 15.732 15.731 15.732 41.455 0 57.188z"
                        fill="currentColor"
                        data-original="#000000"
                      />
                      <path
                        d="m.644 140.764v42.389c0 13.07 6.629 25.019 17.221 32.676 10.88 7.866 18.257 22.936 18.257 40.171 0 17.234-7.377 32.305-18.257 40.171-10.592 7.657-17.221 19.605-17.221 32.676v42.39c0 12.003 9.73 21.732 21.732 21.732h95.948v-273.937h-95.948c-12.002 0-21.732 9.729-21.732 21.732zm53.965 7.74h40.347c3.845 0 6.962 3.116 6.962 6.962 0 3.844-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.117-6.961-6.961 0-3.845 3.116-6.962 6.961-6.962zm0 33.512h40.347c3.845 0 6.962 3.116 6.962 6.962 0 3.844-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.117-6.961-6.961 0-3.846 3.116-6.962 6.961-6.962zm0 33.512h40.347c3.845 0 6.962 3.116 6.962 6.961s-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.116-6.961-6.961 0-3.846 3.116-6.961 6.961-6.961zm0 33.511h40.347c3.845 0 6.962 3.116 6.962 6.961s-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.116-6.961-6.961s3.116-6.961 6.961-6.961zm0 33.511h40.347c3.845 0 6.962 3.116 6.962 6.961s-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.116-6.961-6.961s3.116-6.961 6.961-6.961zm0 33.511h40.347c3.845 0 6.962 3.116 6.962 6.961s-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.116-6.961-6.961 0-3.844 3.116-6.961 6.961-6.961zm0 33.512h40.347c3.845 0 6.962 3.116 6.962 6.961s-3.117 6.961-6.962 6.961h-40.347c-3.845 0-6.961-3.116-6.961-6.961s3.116-6.961 6.961-6.961z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
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
        </Navbar.Group>
      </Navbar>
      <div className="container body-1">
        
        <Card elevation={Elevation.FOUR} className={initial?"ticket-card":"ticket-card-wide"}>
          <div className="content">
            <div className="content-piece">
              <img alt="NFT" className="hashlock" src={nft.url} />
              <label style={{color:"#a3a3a3", marginTop: "1rem"}}>{nft.name} - {nft.id}</label>
            </div>
            <div className="content-details">
              <div className="detail-prose" style={{ color: "white" }}>
                {message}
              </div>

              <div className="collect-button">{buttons}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="container body-2">
        <HelpDropdown />
      </div>
      <div className="container footer-container">
        <p>
          <a aria-label="Stubs" href="/">
            HashCode
          </a>{" "}
          — The (non-fungible) HEADLINE ticket gate.
        </p>
        <div className="fs-s">
          <p className="margin-0">
            Built on{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://algorand.com">
              Algorand
            </a>{" "}
            — the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cointelegraph.com/news/algorand-pledges-carbon-negative-blockchain"
            >
              Carbon Negative
            </a>{" "}
            blockchain that powers
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.pipeline-ui.com"
            >
              {" "}
              PIPELINE-UI
            </a>
            .
          </p>
          <p>
            Made with ❤️ and{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://blueprintjs.com">
              Blueprint.JS
            </a>
            . HEADLINE INC <span title="copyright">©</span> 2021 - 2022.
          </p>
        </div>
      </div>

      <ClaimDialog triggerHelp={triggerHelp} open={open} signed={signed} />
    </div>
  );
}

function HelpDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="help-container">
      <Button
        id="help-text"
        icon="help"
        minimal={true}
        intent="primary"
        outlined={true}
        onClick={() => setIsOpen(true)}
      >
        Need Help?
      </Button>
      <Dialog
        isOpen={isOpen}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        isCloseButtonShown={true}
        onClose={() => setIsOpen(false)}
      >
        <div className="bp3-dialog-header">
          <h4 id="title-bp-dialog-1" className="bp3-heading">
            Overview
          </h4>
          <button
            type="button"
            aria-label="Close"
            className="bp3-button bp3-minimal bp3-dialog-close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <span aria-hidden="true" className="bp3-icon bp3-icon-small-cross">
              <svg
                data-icon="small-cross"
                id="small-cross"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  d="M11.41 10l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="container help-container-2">
          <div className="help-text">
            <p style={{ color: "#000 !important" }}>
              <h3>How to collect your HashLock</h3>

              <p>
                First, you will need to download the{" "}
                <a href="https://algorandwallet.com/">Algorand Wallet </a>
                (make sure you have the <b>latest version</b>) and load it with
                at least 0.3 Algo.
              </p>

              <p>
                Second, click the “Connect” button on the top right of this page
                and proceed as follows
              </p>

              <MobileView>
                <ul>
                  <li>
                    A pop-up will appear with the toggle on “Mobile” -- Choose
                    the account you wish to use -- Click “Connect”
                  </li>
                  <li>
                    Return to the landing page on your mobile browser. Your
                    Algorand Wallet address should now appear on the top right
                    corner of the page
                  </li>
                  <li>
                    Click “Collect” on the web page in your mobile browser, and
                    then switch to the wallet App to “Approve” the transaction
                  </li>
                </ul>
              </MobileView>
              <BrowserView>
                <ul>
                  <li>
                    Scan the QR code using the scanner within your mobile
                    Algorand Wallet{" "}
                  </li>
                  <li>
                    A pop-up will appear within the mobile app -- Choose the
                    account you wish to use -- Click “Connect”
                  </li>
                  <li>
                    At this point, your Algorand Wallet address will appear on
                    the top right corner of the desktop landing page
                  </li>
                  <li>
                    Click “Collect” on the web page, and then “Approve” the
                    transaction within your mobile wallet
                  </li>
                </ul>
              </BrowserView>

              <p>
                Once approved and the transaction is processed, your
                limited-edition 1/50 HashLock NFT asset will appear on this
                page and within your mobile Algorand wallet. (Note that the
                Algorand Wallet will show the Asset Name and Asset ID, not an
                actual image of the NFT...yet).
              </p>

              <p>
                <b>Not working? </b> Try turning the mobile app off and on
                again. Also please check your App Store to ensure your Algorand
                Mobile Wallet is updated to the latest version.
              </p>
              <p>
                <b>Still not working?</b> During testing we noticed some issues
                when the entire processes is done using Mobile Safari. If you're
                having issues on mobile, please try to access the link from a
                desktop browser.
              </p>

              <p>
                If you have any issues with the claiming process, please{" "}
                <a href="mailto:admin@headline-inc.com">reach out</a> for
                assistance.
              </p>
            </p>
          </div>
        </div>
      </Dialog>
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

export default App;
