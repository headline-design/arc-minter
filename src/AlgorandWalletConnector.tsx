// @ts-nocheck
import * as React from "react";

import { SessionWallet, allowedWallets } from "algorand-session-wallet";

import { Dialog, Button, Classes, HTMLSelect, Intent } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import Pipeline from "@pipeline-ui-2/pipeline";

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
        <div></div>
        <Button
          minimal={true}
          style={{
            marginBottom: '20px',
            color: "rgb(255 255 255 / 90%)",
            backgroundColor: "rgb(44, 47, 54)",
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
            props.onChange(address);
            setAddress(address);
          }}
        >
          <div className="wallet-option">
            <h3 className="wallet-con">WalletConnect</h3>
            <svg
              className="r-ff-icon-walletIcon"
              width="28"
              height="28"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25.41177 25.41177"
            >
              <path
                fill="currentColor"
                d="M91.76819,113.36629a7.63061,7.63061,0,0,1,10.63,0l.35336.34588a.36254.36254,0,0,1,.00776.51265l-.00776.00777L101.543,115.4158a.19074.19074,0,0,1-.26578,0l-.48613-.476a5.32327,5.32327,0,0,0-7.41579,0l-.52066.50976a.19076.19076,0,0,1-.26578,0l-1.20845-1.18322a.36254.36254,0,0,1-.00777-.51265l.00777-.00777Zm13.12936,2.447,1.07556,1.05309a.36255.36255,0,0,1,.00776.51265l-.00776.00776-4.84978,4.74849a.38166.38166,0,0,1-.53156,0l-3.44212-3.37016a.09541.09541,0,0,0-.13289,0l-3.442,3.37016a.38167.38167,0,0,1-.53157,0l-4.8499-4.74855a.36254.36254,0,0,1-.00776-.51265l.00776-.00777,1.07556-1.05308a.38159.38159,0,0,1,.5315,0l3.44218,3.37022a.09547.09547,0,0,0,.13289,0l3.442-3.37022a.38159.38159,0,0,1,.5315,0l3.44218,3.37022a.09547.09547,0,0,0,.13289,0l3.44206-3.37016a.38166.38166,0,0,1,.53156,0Z"
                transform="translate(-84.37732 -104.02104)"
              />
              <path
                d="M97.0832,104.72692h0a12,12,0,0,1,12,12h0a12,12,0,0,1-12,12h0a12,12,0,0,1-12-12h0A12,12,0,0,1,97.0832,104.72692Z"
                transform="translate(-84.37732 -104.02104)"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </Button>
        <Button
          id={k}
          style={{
            marginBottom: '20px',
            color: "rgb(255 255 255 / 90%)",
            backgroundColor: "rgb(44, 47, 54)",
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
            <h3 className="wallet-con">MyAlgo Wallet</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="r-ff-icon-walletIcon"
              width="28"
              height="28"
              viewBox="0 0 34 34"
              fill="currentColor"
              overflow="visible"
            >
              <g xmlns="http://www.w3.org/2000/svg" className="currentLayer">
                <title>Layer 1</title>
                <rect
                  height={34}
                  width={34}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  rx={34}
                />
                <path
                  fill="currentColor"
                  d="M23.375 12.171l-.16-.613-.362.613-2.179 3.869-1.852 3.256-1.608 2.834-.926 1.633h-2.62l2.193-3.868.52-.92-.29-1.083-.828-3.174-.669-2.547-.16-.613-.361.613-2.18 3.869-2.192 3.855-2.193 3.868h-2.62l2.192-3.868 2.18-3.855 2.192-3.869 2.14-3.773.053-.082h2.286l.107.409.83 3.16.08.286.748 2.874.268.995.024.092.052-.092 2.193-3.869 2.14-3.773.053-.082h2.286l.107.409 4.397 15.038h-2.62z"
                />
              </g>
            </svg>
          </div>
        </Button>
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
        {" "}
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
        minimal={true}
        iconProps={iconprops}
        defaultValue={props.sessionWallet.accountIndex()}
      >
        <option>
          {address.slice(0, 3) +
            "..." +
            address.slice(address.length - 3, address.length)}
        </option>
      </HTMLSelect>
      <Button icon="log-out" minimal={true} onClick={disconnectWallet}></Button>
    </div>
  );
}
