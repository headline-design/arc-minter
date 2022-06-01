// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { SessionWallet } from 'algorand-session-wallet';
import AlgorandWalletConnector from './AlgorandWalletConnector';
import { Logo } from './logo';
import { conf, collect, sendWait, getAsaId, getNFT } from './lib/algorand';
import Pipeline from '@pipeline-ui-2/pipeline';
import CID from 'cids';
import NavLinks from './NavLinks';
import { NONE_YET } from './utils/constants';

const prevResponse = [{ hash: NONE_YET }];

var cid = '';

const asaData = {
  creator: '',
  note: 'Hello world',
  amount: 1,
  decimals: 0,
  assetName: '1NFT',
  unitName: '1NFT',
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

window.defaultJSON = {
  name: 'ARC Logo',
  description: 'ARC Logo for ARC Minter by HEADLINE',
  image: 'ipfs://QmeuYSs7pgRLB27q5HQdaUpgLGMuERbqScBSrxtQfvXbQD',
  decimals: 0,
  unitName: 'ARC',
  image_integrity:
    'sha256-f628137f76d4dac60eb79325ca1bb4d9bd9d569c2648c4e4ea3c0a025d259b0a',
  image_mimetype: 'image/jpeg',
  properties: undefined,
};

function Header() {
  const sw = new SessionWallet(conf.network);
  const [sessionWallet] = React.useState(sw);

  function checkForAddress() {
    if (address !== window.pipeAddress) {
      setAddress(window.pipeAddress);
    }
  }

  const [accts] = React.useState(sw.accountList());
  const [connected, setConnected] = React.useState(sw.connected());
  const [claimable, setClaimable] = React.useState(true);
  const [address, setAddress] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const params = new URLSearchParams(window.location.search);
  const escrow = params.get('escrow');
  const addr = params.get('addr');
  const secret = params.get('secret');
  const [hash, setHash] = React.useState('');

  const [asa, setAsa] = React.useState('');
  const [asaId, setAsaId] = React.useState('');
  const [urlHash, setUrlHash] = React.useState('');

  let toggler = true;

  function refetch() {
    if (toggler) {
      setAsa('https://www.nftexplorer.app/asset/' + asaId);
    } else {
      setAsa('https://www.nftexplorer.app/asset/');
    }
    toggler = !toggler;
  }

  useEffect(() => {
    setClaimable(secret !== null && addr !== null && escrow !== null);
  }, [escrow, addr, secret]);

  useEffect(() => {
    window.response1234 = [{ hash: 'none yet' }];
    setInterval(checkforResponse, 300);
  }, []);

  function checkforResponse() {
    let length = window.response1234.length - 1;
    if (
      prevResponse[0].hash !== window.response1234[length].hash &&
      window.response1234[0].hash !== NONE_YET &&
      window.response1234[length].hash !== NONE_YET
    ) {
      prevResponse[0].hash = window.response1234[length].hash;
      setUrlHash(window.response1234[0].hash);
      let cidWorking = new CID(window.response1234[0].hash).toV1();
      let cidConverted = 'sha256-' + cidWorking.toString('base16').substring(9);
      window.defaultJSON['image_integrity'] = cidConverted;
      document.getElementById('preview').innerText = JSON.stringify(
        window.defaultJSON,
      );
      let thisHash = window.response1234[length].hash;
      setHash(thisHash);
    }
    checkForAddress();
    if (address !== undefined && address !== '') {
      document.getElementById('not-connected').style.display = 'none';
      document.getElementById('connected').style.display = 'block';
    }
  }

  function updateJSON(event) {
    let key = event.target.id;
    let value = event.target.value;
    window.defaultJSON[key] = value;
    document.getElementById('preview').innerText = JSON.stringify(
      window.defaultJSON,
    );
  }

  function updateWallet(address) {
    setAddress(address);
    setConnected(true);

    setAddress(true);
  }

  async function createAsa() {
    asaData.amount = parseInt(document.getElementById('input-amount').value);
    asaData.assetName = document.getElementById('name').value;
    asaData.creator = document.getElementById('input-manager').value;
    asaData.decimals = parseInt(document.getElementById('decimals').value);
    asaData.note = document.getElementById('input-note').value;
    asaData.assetURL = document.getElementById('input-asset-url').value;
    asaData.unitName = document.getElementById('unitName').value;
    asaData.reserve = document.getElementById('input-reserve').value;
    asaData.manager = document.getElementById('input-manager').value;
    // asaData.clawback = document.getElementById("input-clawback").value
    // asaData.freeze = document.getElementById("input-freeze").value
    asaData.assetMetadataHash = document.getElementById(
      'input-assetMetadataHash',
    ).value;

    let asaId = await Pipeline.createAsa(asaData);
    return asaId;
  }

  let buttons = (
    <button
      style={{
        color: '#000',
        background: '#e3e3e3',
        borderColor: '#7b78ff',
        borderRadius: '8px',
        width: '100%',
        marginTop: '8px',
      }}
      minimal={true}
      outlined={true}
      intent="success"
      large={true}
      icon="circle"
      text="Collect"
      disabled={!connected || !claimable}
      loading={loading}
    />
  );

  return (
    <header className="MuiPaper-root MuiAppBar-root jss2 MuiAppBar-positionStatic MuiAppBar-colorPrimary MuiPaper-elevation4">
      <div className="MuiContainer-root jss1 MuiContainer-maxWidthLg">
        <div className="jss3">
          <a className="logo-nav" href="/">
            <Logo></Logo>
          </a>
          <div className="jss5">
            <div>
              <NavLinks></NavLinks>
            </div>
       
            <div className="buttons">
              <AlgorandWalletConnector
                darkMode={true}
                address={address}
                sessionWallet={sessionWallet}
                accts={accts}
                connected={connected}
                updateWallet={updateWallet}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
