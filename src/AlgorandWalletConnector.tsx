// @ts-nocheck
import * as React from "react";

import { SessionWallet, allowedWallets } from "algorand-session-wallet";

import { Dialog, Button, Classes, HTMLSelect, Intent } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import Pipeline from "@pipeline-ui-2/pipeline";
import { WalletConnectLogo } from "./images/walletconnect-logo";
import { MyAlgoLogo } from "./images/MyAlgo-logo";
import { pipeline } from "stream";

const wallet = Pipeline.init();

export default function AlgorandWalletConnector(props) {
  const [selectorOpen, setSelectorOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");

  const { sessionWallet, updateWallet } = props;
  React.useEffect(() => {
    if (sessionWallet.connected()) return;
    

    let interval: any;
    sessionWallet.connect().then((success) => {
      if (!success) return;

      // Check every 500ms to see if we've connected then kill the interval
      // This is most useful in the case of walletconnect where it may be several
      // seconds before the user connects
      interval = setInterval(() => {
        if (sessionWallet.connected()) {
          clearInterval(interval);
          updateWallet(sessionWallet);
        }
      }, 500);
    });

    return () => {
      clearInterval(interval);
    };
  }, [sessionWallet, updateWallet]);

  function disconnectWallet() {
    localStorage.clear();
    window.location.reload();
  }

  function handleDisplayWalletSelection() {
    setSelectorOpen(true);
  }

  async function handleSelectedWallet(e: any) {
    const choice = e.currentTarget.id;

    if (!(choice in allowedWallets)) {
      if (props.sessionWallet.wallet !== undefined)
        props.sessionWallet.disconnect();
      return setSelectorOpen(false);
    }

    const sw = new SessionWallet(
      props.sessionWallet.network,
      props.sessionWallet.permissionCallback,
      choice
    );

    if (!(await sw.connect())) {
      sw.disconnect();
    }

    const interval = setInterval(() => {
      // If they've already connected, we wont get an on connect, have to check here
      const wc = localStorage.getItem("walletconnect");
      if (wc === null || wc === undefined || wc === "") return;

      const wcObj = JSON.parse(wc);
      const accounts = wcObj.accounts;
      if (accounts.length > 0) {
        clearInterval(interval);
        sw.setAccountList(wcObj.accounts);
        props.updateWallet(
          new SessionWallet(sw.network, sw.permissionCallback, choice)
        );
      }
    }, 250);

    props.updateWallet(sw);

    setSelectorOpen(false);
  }

  function handleChangeAccount(e: any) {
    props.sessionWallet.setAccountIndex(parseInt(e.target.value));
    props.updateWallet(props.sessionWallet);
  }

  const walletOptions = [];
  for (const [k, v] of Object.entries(allowedWallets)) {
    // NOTE: remove if you want other wallets
    if (k !== "wallet-connect") continue;

    walletOptions.push(
      <li key={k}>
        <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
        <Button
          minimal={true}
          style={{
            color: "rgb(255 255 255 / 90%)",
              border: "1px solid rgb(88 91 96)",
            borderRadius: '12px',
          }}
          intent="warning"
          id={k}
          large={true}
          fill={true}
          className="wallet-btn"
          outlined={true}
          onClick={async () => {
            Pipeline.pipeConnector = "WalletConnect";
            let address = await Pipeline.connect(wallet);
            window.pipeAddress = address
            props.onChange(address);
            setAddress(address);
            if ( address !== undefined && address !== "" ){
              document.getElementById("not-connected").style.display = "none"
              document.getElementById("connected").style.display = "block"
            }
          }}
        >
          <div className="wallet-option">
          <WalletConnectLogo></WalletConnectLogo>
            <h3 className="wallet-con bktcUM">WalletConnect</h3>
            <div className="sc-dlnjPT eFHlqH web3modal-provider-description">Scan with WalletConnect to connect</div>
            
          </div>
        </Button>
        </div>
        <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
        <Button
          id={k}
          style={{
            color: "rgb(255 255 255 / 90%)",
              border: "1px solid rgb(88 91 96)",
            borderRadius: '12px',
          }}
          intent="warning"
          large={true}
          fill={true}
          minimal={true}
          className="wallet-btn"
          outlined={true}
          onClick={async () => {
            Pipeline.pipeConnector = "myAlgoWallet";
            let address = await Pipeline.connect(wallet);
            window.pipeAddress = address
            props.onChange(address);
            setAddress(address);
            if ( address !== undefined && address !== "" ){
              document.getElementById("not-connected").style.display = "none"
              document.getElementById("connected").style.display = "block"
            }
          }}
        >
          <div className="wallet-option">
          <MyAlgoLogo></MyAlgoLogo>
            <h3 className="wallet-con bktcUM">MyAlgo Wallet</h3>
            <div className="sc-dlnjPT eFHlqH web3modal-provider-description">Connect to your MyAlgo Wallet</div>

          </div>
        </Button>
        </div>
      </li>
    );
  }

  if (!props.connected)
    return (
      <div >
        <Button
          minimal={true}
          style={{
            color: "#3e3b51",
            borderColor: "rgb(123, 120, 255)",
            borderRadius: "8px",
          }}
          rightIcon="selection"
          intent="warning"
          outlined={true}
          onClick={handleDisplayWalletSelection}
        >
          Connect
        </Button>

        <Dialog
          isOpen={selectorOpen}
          title="Select Wallet"
          onClose={handleSelectedWallet}
          className="close-icon"
        >
          <div className={Classes.DIALOG_BODY}>
            <ul className="wallet-option-list">{walletOptions}</ul>
          </div>
        </Dialog>
      </div>
    );

  const addr_list = props.accts.map((addr, idx) => {
    return (
      <option value={idx} key={idx}>
       
        {addr.substr(0, 8)}...{" "}
      </option>
    );
  });

  const iconprops = {
    icon: "symbol-circle" as IconName,
    intent: "success" as Intent,
  };

  return (
    <div className="button-connected">
      <HTMLSelect
        onChange={handleChangeAccount}
        className="btn-selected"
        minimal={true}
        iconProps={iconprops}
        defaultValue={props.sessionWallet.accountIndex()}
      >
        <option className="option">
          {address.slice(0, 3) +
            "..." +
            address.slice(address.length - 3, address.length)}
        </option>
      </HTMLSelect>
      <Button className="btn-selected-2" icon="log-out" minimal={true} onClick={disconnectWallet}></Button>
    </div>
  );
}
