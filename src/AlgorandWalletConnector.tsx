// @ts-nocheck
import { Button, Classes, Dialog, HTMLSelect, Intent } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import Pipeline from '@pipeline-ui-2/pipeline';
import { allowedWallets, SessionWallet } from 'algorand-session-wallet';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyAlgoLogo } from './images/MyAlgo-logo';
import { WalletConnectLogo } from './images/walletconnect-logo';
import algorandGlobalActions from './redux/algorand/global/globalActions';
import algorandGlobalSelectors from './redux/algorand/global/globalSelctors';
import authActions from './redux/auth/authActions';
import { Networks } from './utils/constants';
import { getCurrentGlobalPipeState } from './utils/functions';

const _ = require('lodash');

const wallet = Pipeline.init();

export default function AlgorandWalletConnector(props: any) {
  const { sessionWallet, accts, connected, updateWallet } = props;
  const dispatch = useDispatch();
  const globalPipeState = useSelector(algorandGlobalSelectors.selectPipeConnectState);
  const [walletConnected, setWalletConnected] = useState(connected);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [pipeState, setPipeState] = useState({
    myAddress: '',
    checked: true,
    labelNet: Networks.MainNet,
  });

  const refresh = () => {
    if (Pipeline.pipeConnector && pipeState.myAddress && Pipeline.address !== '') {
      updateWallet(sessionWallet);
    }
  };

  useEffect(() => {
    if (pipeState.myAddress) {
      const interval = setInterval(refresh, 500);
      return () => clearInterval(interval);
    }
  }, [pipeState]);

  useEffect(() => {
    if (globalPipeState) {
      Pipeline.main = globalPipeState.mainNet;
      Pipeline.pipeConnector = globalPipeState.provider;
      Pipeline.address = globalPipeState.myAddress;
      setPipeState((prevState) => ({
        ...prevState,
        myAddress: globalPipeState.myAddress,
        checked: globalPipeState.mainNet,
        labelNet: globalPipeState.mainNet ? Networks.MainNet : Networks.TestNet,
      }));
      if (Pipeline.pipeConnector && Pipeline.address && Pipeline.address !== '') {
        setWalletConnected(true);
      } else {
        setWalletConnected(false);
      }
    }
  }, [globalPipeState]);

  function disconnectWallet() {
    dispatch(authActions.doDisconnect());
  }

  function handleDisplayWalletSelection() {
    setSelectorOpen(true);
  }

  async function handleSelectedWallet(e: any) {
    const choice = e.currentTarget.id;

    if (!(choice in allowedWallets)) {
      if (sessionWallet.wallet !== undefined) sessionWallet.disconnect();
      return setSelectorOpen(false);
    }

    const sw = new SessionWallet(sessionWallet.network, sessionWallet.permissionCallback, choice);

    if (!(await sw.connect())) {
      sw.disconnect();
    }

    const interval = setInterval(() => {
      // If they've already walletConnected, we wont get an on connect, have to check here
      const wc = localStorage.getItem('walletconnect');
      if (wc === null || wc === undefined || wc === '') return;

      const wcObj = JSON.parse(wc);
      const accounts = wcObj.accounts;
      if (accounts.length > 0) {
        clearInterval(interval);
        sw.setAccountList(wcObj.accounts);
        updateWallet(new SessionWallet(sw.network, sw.permissionCallback, choice));
      }
    }, 250);

    updateWallet(sw);

    setSelectorOpen(false);
  }

  function handleChangeAccount(e: any) {
    sessionWallet.setAccountIndex(parseInt(e.target.value));
    updateWallet(sessionWallet);
  }

  const walletOptions = [];
  for (const [k, v] of Object.entries(allowedWallets)) {
    // NOTE: remove if you want other wallets
    if (k !== 'wallet-connect') continue;

    walletOptions.push(
      <li key={k}>
        <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
          <Button
            minimal={true}
            style={{
              color: 'rgb(255 255 255 / 90%)',
              border: '1px solid rgb(88 91 96)',
              borderRadius: '12px',
            }}
            intent="warning"
            id={k}
            large={true}
            fill={true}
            className="wallet-btn"
            outlined={true}
            onClick={async () => {
              Pipeline.pipeConnector = 'WalletConnect';
              let address = await Pipeline.connect(wallet);
              window.pipeAddress = address;
              updateWallet(address);
              dispatch(
                algorandGlobalActions.doPipeConnectChange({
                  ...getCurrentGlobalPipeState(globalPipeState),
                  myAddress: address,
                  provider: 'WalletConnect',
                }),
              );
            }}
          >
            <div className="wallet-option">
              <WalletConnectLogo></WalletConnectLogo>
              <h3 className="wallet-con bktcUM">WalletConnect</h3>
              <div className="sc-dlnjPT eFHlqH web3modal-provider-description">
                Scan with WalletConnect to connect
              </div>
            </div>
          </Button>
        </div>
        <div className="sc-eCApGN cjAFRf web3modal-provider-wrapper">
          <Button
            id={k}
            style={{
              color: 'rgb(255 255 255 / 90%)',
              border: '1px solid rgb(88 91 96)',
              borderRadius: '12px',
            }}
            intent="warning"
            large={true}
            fill={true}
            minimal={true}
            className="wallet-btn"
            outlined={true}
            onClick={async () => {
              Pipeline.pipeConnector = 'myAlgoWallet';
              let address = await Pipeline.connect(wallet);
              window.pipeAddress = address;
              updateWallet(address);
              dispatch(
                algorandGlobalActions.doPipeConnectChange({
                  ...getCurrentGlobalPipeState(globalPipeState),
                  myAddress: address,
                  provider: 'myAlgoWallet',
                }),
              );
            }}
          >
            <div className="wallet-option">
              <MyAlgoLogo></MyAlgoLogo>
              <h3 className="wallet-con bktcUM">MyAlgo Wallet</h3>
              <div className="sc-dlnjPT eFHlqH web3modal-provider-description">
                Connect to your MyAlgo Wallet
              </div>
            </div>
          </Button>
        </div>
      </li>,
    );
  }

  const addr_list = accts.map((addr, idx) => {
    return (
      <option value={idx} key={idx}>
        {addr.substr(0, 8)}...{' '}
      </option>
    );
  });

  const iconprops = {
    icon: 'symbol-circle' as IconName,
    intent: 'success' as Intent,
  };

  /**
   * Shortens string to `XXXX...XXXX`, with `XXX` padding determined by optional `pad` parameter
   */
  function truncateString(str: string, pad = 6): string {
    const { length } = str;
    const start = str.substring(0, pad);
    return `${start}...${str.substring(length - pad, length)}`;
  }

  if (!walletConnected) {
    return (
      <div>
        <Button
          minimal={true}
          style={{
            color: '#3e3b51',
            borderColor: 'rgb(123, 120, 255)',
            borderRadius: '8px',
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
  } else {
    return (
      <div className="button-connected">
        <HTMLSelect
          onChange={handleChangeAccount}
          className="btn-selected"
          minimal={true}
          iconProps={iconprops}
          defaultValue={sessionWallet.accountIndex()}
        >
          <option className="option">{truncateString(pipeState.myAddress || '')}</option>
        </HTMLSelect>
        <Button
          className="btn-selected-2"
          icon="log-out"
          minimal={true}
          onClick={disconnectWallet}
        ></Button>
      </div>
    );
  }
}
