import Pipeline, { sendTxns } from '@pipeline-ui-2/pipeline';
import { SessionWallet } from 'algorand-session-wallet';
import algosdk from 'algosdk';
import CID from 'cids';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { configClient } from '@pipeline-ui-2/pipeline/utils';
import HexToAlgo from './HexToAlgo';
import IpfsUpload from './IpfsUpload';
import JSONer from './jsoner';
import { conf } from './lib/algorand';
import NftFetch from './NftFetch.js';
import Preview from './preview';
import algorandGlobalSelectors from './redux/algorand/global/globalSelctors';
import ButtonSpinner from './components/shared/ButtonSpinner';
import { NONE_YET } from './utils/constants';

let flipped = true;
const prevResponse = [{ hash: NONE_YET }];

const asaData = {
  creator: '',
  note: 'Hello world',
  amount: 1,
  decimals: 0,
  assetName: '1NFT',
  unitName: '1NFT',
  asset: '',
  assetURL: '',
  assetMetadataHash: '',
  reserve: '',
  manager: '',
};

const myJSON = {
  Logo: 'NFDomains',
  Background: 'Code',
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

function ConfigModule() {
  const sw = new SessionWallet(conf.network);
  const params = new URLSearchParams(window.location.search);
  const escrow = params.get('escrow');
  const addr = params.get('addr');
  const secret = params.get('secret');
  const globalPipeState = useSelector(
    algorandGlobalSelectors.selectPipeConnectState,
  );
  const [claimable, setClaimable] = useState(true);
  const [address, setAddress] = useState('');
  const [advancedOptions, setAdvancedOptions] = useState('none');
  const [preview, setPreview] = useState('');
  const [connected, setConnected] = useState(sw.connected());
  const [hash, setHash] = useState('');
  const [asa, setAsa] = useState('');
  const [asaId, setAsaId] = useState('');
  const [urlHash, setUrlHash] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);
  const [isDisabled3, setIsDisabled3] = useState(true);
  const [isDisabled4, setIsDisabled4] = useState(true);
  const [isDisabled5, setIsDisabled5] = useState(true);
  const [isDisabled6, setIsDisabled6] = useState(true);
  const [connected2, setConnected2] = useState(true);
  const [connected4, setConnected4] = useState(false);
  const [inputAmount, setInputAmount] = useState('1');
  const [name, setName] = useState('');
  const [inputManager, setInputManager] = useState('');
  const [decimals, setDecimals] = useState('0');
  const [description, setDescription] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [inputAssetUrl, setInputAssetUrl] = useState(
    'template-ipfs://{ipfscid:0:dag-pb:reserve:sha2-256}',
  );
  const [inputAssetUrlPlaceholder, setInputAssetUrlPlaceholder] = useState(
    'template-ipfs://{ipfscid:0:dag-pb:reserve:sha2-256}',
  );
  const [unitName, setUnitName] = useState('');
  const [inputReserve, setInputReserve] = useState(
    '55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4',
  );
  const [inputAssetMetadataHash, setInputAssetMetadataHash] = useState('');
  const [flex, setFlex] = useState(false);
  const [flexHr, setFlexHr] = useState(false);
  const [toggleInputAssetURLSwitch, setToggleInputAssetURLSwitch] =
    useState(false);
  const [fetchButtonVisible, setFetchButtonVisible] = useState(true);
  const [uploadFile, setUploadFile] = useState('');
  const [checkedA, setCheckedA] = useState(false);
  const [imageMimetypeSwitch, setImageMimetypeSwitch] = useState(false);
  const [imageMimetype, setImageMimetype] = useState('');
  const [inputReserveSwitch, setInputReserveSwitch] = useState(false);
  const [inputManagerSwitch, setInputManagerSwitch] = useState(false);
  const [freezeSwitch, setFreezeSwitch] = useState(false);
  const [clawbackSwitch, setClawbackSwitch] = useState(false);
  const [freezeAddress, setFreezeAddress] = useState('');
  const [clawbackAddress, setClawbackAddress] = useState('');
  const [modifyButtonDisabled, setModifyButtonDisabled] = useState(true);
  const [jss6, setJss6] = useState('block');

  useEffect(() => {
    window.response1234 = [{ hash: NONE_YET }];
    const interval = setInterval(checkForResponse, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (globalPipeState) {
      if (
        Pipeline.pipeConnector &&
        Pipeline.address &&
        Pipeline.address !== ''
      ) {
        window.pipeAddress = Pipeline.address;
        setAddresses(Pipeline.address);
        setConnected(true);
      } else {
        window.pipeAddress = '';
        setAddresses('');
        setConnected(false);
      }
    }
  }, [globalPipeState]);

  useEffect(() => {
    if (address) {
      setInputManager(address);
    }
  }, [address]);

  useEffect(() => {
    setModifyButtonDisabled(requiredDataCheck());
  }, [name, unitName]);

  useEffect(() => {
    setClaimable(secret !== null && addr !== null && escrow !== null);
  }, [escrow, addr, secret]);

  function checkForAddress() {
    if (address !== window.pipeAddress) {
      setAddresses(window.pipeAddress);
    }
  }

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

  const setAddresses = (connectedAddress: string) => {
    if (connectedAddress) {
      setAddress(connectedAddress);
      setFreezeAddress(connectedAddress);
      setClawbackAddress(connectedAddress);
    }
  };

  function toggle() {
    if (advancedOptions === 'none') {
      setAdvancedOptions('block');
    } else {
      setAdvancedOptions('none');
    }
  }

  function checkForResponse() {
    let length = window.response1234.length - 1;
    if (
      prevResponse[0].hash !== window.response1234[length].hash &&
      window.response1234[0].hash !== NONE_YET &&
      window.response1234[length].hash !== NONE_YET
    ) {
      prevResponse[0].hash = window.response1234[length].hash;
      setUrlHash(window.response1234[0].hash);
      let cidWorking = new CID(window.response1234[0].hash).toV1();
      window.defaultJSON['image_integrity'] =
        'sha256-' + cidWorking.toString('base16').substring(9);
      setPreview(JSON.stringify(window.defaultJSON));
      let thisHash = window.response1234[length].hash;
      setHash(thisHash);
    }
    checkForAddress();
  }

  function updateJSON(event: any) {
    let value = event.target.value;
    let key = event.target.id;
    switch (key) {
      case 'name':
        if (value.length <= 32) {
          setName(value);
          proceed();
        } else {
          failed('Asset Name Max size is 32 characters');
        }
        break;
      case 'unitName':
        if (value.length <= 8) {
          setUnitName(value);
          proceed();
        } else {
          failed('Asset Unit Name can not exceed 8 letters');
        }
        break;
      case 'decimals':
        if (value <= 19) {
          setDecimals(value);
          proceed();
        } else {
          failed('Asset decimals can not exceed 19');
        }
        break;
      case 'description':
        if (value.length <= 1000) {
          setDescription(value);
          proceed();
        } else {
          failed('Asset description can not exceed 1000 characters');
        }
        break;
      default:
        break;
    }
    function proceed() {
      window.defaultJSON[key] = value;
      setPreview(JSON.stringify(window.defaultJSON));
    }
    function failed(message: string) {
      let former = document.getElementById('miniMessage');
      if (former != null) {
        former.remove();
      }
      miniAlerts(event.target, message);
      event.target.value = '';
    }
  }

  function miniAlerts(parent: any, miniMessage: string) {
    //let Alert = document.createElement("p")
    //Alert = miniMessage
    parent.insertAdjacentHTML(
      'afterend',
      '<div id="miniMessage">' + miniMessage + '</div>',
    );
  }

  async function createAsa() {
    setConnected2(false);
    setConnected4(true);
    asaData.amount = parseInt(inputAmount);
    asaData.assetName = name;
    asaData.creator = inputManager;
    asaData.decimals = parseInt(decimals);
    asaData.note = inputNote;
    asaData.assetURL = inputAssetUrl;
    asaData.unitName = unitName;
    asaData.reserve = inputReserve;
    asaData.manager = inputManager;
    // asaData.clawback = inputClawback
    // asaData.freeze = inputFreeze
    asaData.assetMetadataHash = inputAssetMetadataHash;
    try {
      let params = await Pipeline.getParams();
      const assetIndex = document.getElementById('assetIndex');
      if (assetIndex instanceof HTMLInputElement) {
        let txn = algosdk.makeAssetConfigTxn(
          Pipeline.address,
          1000,
          params.firstRound,
          params.lastRound,
          new Uint8Array(Buffer.from(asaData.note)),
          params.genesisHash,
          params.genesisID,
          parseInt(assetIndex.value),
          asaData.manager,
          asaData.reserve,
          undefined,
          undefined,
          false,
        );
        txn.fee = 1000;

        let signedTxn = await Pipeline.sign(txn);

        let clientb = await configClient(
          Pipeline.main,
          Pipeline.EnableDeveloperAPI,
          Pipeline,
        );
        let transServer = clientb.tranServer;

        let response = await sendTxns(
          signedTxn,
          transServer,
          Pipeline.EnableDeveloperAPI,
          Pipeline.token,
          Pipeline.alerts,
        );
        console.log(response);
        setConnected2(false);
        setConnected4(false);
        setFlex(true);
        setFlexHr(true);
        return response;
      }
    } catch (error) {
      console.log(error);
      setConnected2(true);
      setConnected4(false);
    }
  }

  function toggle19() {
    if (flipped) {
      setJss6('none');
      setModifyButtonDisabled(false);
      setFetchButtonVisible(false);
    } else {
      setJss6('block');
      setModifyButtonDisabled(true);
      setFetchButtonVisible(true);
    }
    flipped = !flipped;
  }

  const requiredDataCheck = () =>
    Boolean(
      !(
        name &&
        name.length > 0 &&
        name.length <= 32 &&
        unitName &&
        unitName.length > 0 &&
        unitName.length <= 8
      ),
    );

  return (
    <div className="App" style={{ background: '#000' }}>
      <div className="container body-1">
        <div id="__next">
          <div className="jss9">
            <div className="MuiContainer-root jss8 MuiContainer-maxWidthLg">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                <div
                  className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8"
                  style={{ alignItems: 'center' }}
                >
                  <h1 className="MuiTypography-root jss10 MuiTypography-h1">
                    <span>ARC</span> Config
                  </h1>
                  <h6 className="MuiTypography-root jss11 MuiTypography-subtitle1">
                    Modify ARC19 NFTs with asset config transactions!
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="jss25">
            <div className="MuiContainer-root jss14 MuiContainer-maxWidthLg">
              <div className="jss15">
                <div className="form-title">
                  <h3>Modify your NFT</h3>
                </div>
                <div className="jss26">
                  <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-12 mb-4">
                        <p className="jss83">NFT Type</p>
                        <input
                          type="checkbox"
                          id="checkedA"
                          hidden
                          className="jss35"
                          checked={checkedA}
                          onChange={(event) =>
                            setCheckedA(event.target.checked)
                          }
                        />
                        <label htmlFor="checkedA" className="jss84">
                          <div onClick={toggle19}>ARC19</div>
                          <div onClick={toggle19}>ARC69</div>
                        </label>
                      </div>
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                        <NftFetch fetchButtonVisible={fetchButtonVisible} />
                        <div className="jss16" style={{ display: jss6 }}>
                          <label htmlFor="name">
                            <span className="unit-name-label">Asset Name </span>
                            <small className="asset-description">
                              What is the name of your NFT?
                            </small>
                          </label>
                          <input
                            type="text"
                            value={name}
                            id="name"
                            onChange={updateJSON}
                            required={true}
                          />
                          <p className="jss32" style={{ display: 'none' }}>
                            Name cannot be empty
                          </p>
                        </div>
                      </div>
                      <div className="jss27">
                        <div style={{ display: jss6 }}>
                          <label className="jss17" htmlFor="upload-file">
                            Upload
                          </label>
                          <IpfsUpload></IpfsUpload>
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="audio/*, video/*, image/*, .html, .pdf"
                            id="upload-file"
                            hidden={true}
                            value={uploadFile}
                            onChange={(event) =>
                              setUploadFile(event.target.value)
                            }
                          />

                          <br />

                          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"></div>

                          <div className="jss16">
                            <div className="total-supply-label-container">
                              <div style={{ display: jss6 }}>
                                <label
                                  htmlFor="input-amount-decimals"
                                  className=""
                                >
                                  Decimals
                                </label>
                              </div>
                              <div className="label-switch">
                                <label
                                  htmlFor="ImageMimetype"
                                  className=""
                                  style={{
                                    marginRight: '.5rem',
                                  }}
                                >
                                  Image Mimetype
                                </label>
                                <div className="big-switch custom-switch custom-control">
                                  <input
                                    type="checkbox"
                                    id="toggleImageMimetypeSwitch"
                                    name="toggleInputAssetURL"
                                    onClick={handleClick6}
                                    className="custom-control-input"
                                    checked={imageMimetypeSwitch}
                                    onChange={(event) =>
                                      setImageMimetypeSwitch(
                                        event.target.checked,
                                      )
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="toggleImageMimetypeSwitch"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="total-supply-container">
                              <div style={{ display: jss6 }}>
                                <input
                                  type="number"
                                  placeholder="0"
                                  value={decimals}
                                  onChange={updateJSON}
                                  pattern=""
                                  id="decimals"
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="image/jpeg"
                                value={imageMimetype}
                                onChange={(event) => {
                                  updateJSON(event);
                                  setImageMimetype(event.target.value);
                                }}
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
                          <div
                            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"
                            style={{ display: jss6 }}
                          >
                            <div className="jss16">
                              <label htmlFor="input-unit-name" className="">
                                <span className="unit-name-label">
                                  Unit Name{' '}
                                </span>
                                <small className="asset-description">
                                  What Unit is associated with your asset?
                                </small>
                              </label>
                              <input
                                type="text"
                                placeholder="NFT1"
                                value={unitName}
                                pattern=""
                                onChange={updateJSON}
                                id="unitName"
                              />
                            </div>
                          </div>
                          <div className="jss16" style={{ display: jss6 }}>
                            <label htmlFor="description">Description</label>
                            <textarea
                              style={{ minHeight: 100 }}
                              id="description"
                              spellCheck="false"
                              onChange={updateJSON}
                              required={true}
                              defaultValue={''}
                            />
                          </div>
                          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                            <div className="jss16" style={{ display: jss6 }}>
                              <div>
                                <HexToAlgo
                                  setInputReserve={setInputReserve}
                                  hash={hash}
                                ></HexToAlgo>
                              </div>
                              <JSONer
                                callBack={function (data: any) {
                                  window.defaultJSON.properties = data;
                                  setPreview(
                                    JSON.stringify(window.defaultJSON),
                                  );
                                }}
                                object={myJSON}
                              ></JSONer>
                            </div>
                            <div className="jss16" style={{ display: jss6 }}>
                              <label className="">JSON Object</label>
                              <p id="preview" className="metadata-object">
                                {preview}
                              </p>
                              <div style={{ display: jss6 }}>
                                <button
                                  className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
                                  tabIndex={-1}
                                  id="JSONuploader"
                                  style={{
                                    marginBottom: 30,
                                  }}
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
                        <div className="jss16" style={{ display: jss6 }}>
                          <div className="label-switch">
                            <label className="">Asset URL</label>
                            <div className="permitted">
                              <div className="big-switch custom-switch custom-control">
                                <input
                                  type="checkbox"
                                  id="toggleInputAssetURLSwitch"
                                  name="toggleInputAssetURL"
                                  onClick={handleClick5}
                                  onChange={(event) =>
                                    setToggleInputAssetURLSwitch(
                                      event.target.checked,
                                    )
                                  }
                                  className="custom-control-input"
                                  checked={toggleInputAssetURLSwitch}
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
                            placeholder={inputAssetUrlPlaceholder}
                            type="text"
                            className="custom-input-size form-control"
                            aria-invalid="false"
                            value={inputAssetUrl}
                            onChange={(event) =>
                              setInputAssetUrl(event.target.value)
                            }
                            disabled={isDisabled5}
                          />
                          <div className="invalid-feedback">
                            Asset Url Max size is 96 bytes.
                          </div>
                        </div>
                        <div className="jss16" style={{ display: jss6 }}>
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
                                  checked={inputReserveSwitch}
                                  onChange={(event) =>
                                    setInputReserveSwitch(event.target.checked)
                                  }
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
                            value={inputReserve}
                            onChange={(event) =>
                              setInputReserve(event.target.value)
                            }
                          />
                          <div className="invalid-feedback">
                            Reserve Address is invalid
                          </div>
                        </div>
                        <div className="jss16">
                          <div className="label-switch">
                            <label htmlFor="frozen-dropdown" className="">
                              Note
                            </label>
                            <label className="">1000 bytes left</label>
                          </div>
                          <textarea
                            name="note"
                            className="note-input-field form-control"
                            aria-invalid="false"
                            id="input-note"
                            onChange={(event) =>
                              setInputNote(event.target.value)
                            }
                            value={inputNote}
                          />
                          <div className="invalid-feedback">
                            Note can not exceed 1000 bytes.
                          </div>
                        </div>
                        <div className="accordion" style={{ display: jss6 }}>
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
                                style={{
                                  display: advancedOptions,
                                }}
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
                                    onChange={(event) =>
                                      setInputAssetMetadataHash(
                                        event.target.value,
                                      )
                                    }
                                    value={inputAssetMetadataHash}
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
                                          checked={inputManagerSwitch}
                                          onChange={(event) =>
                                            setInputManagerSwitch(
                                              event.target.checked,
                                            )
                                          }
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
                                    value={inputManager}
                                    placeholder="Manager address"
                                    id="input-manager"
                                    type="text"
                                    className="custom-input-size form-control"
                                    aria-invalid="false"
                                    onChange={(event) =>
                                      setInputManager(event.target.value)
                                    }
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
                                          checked={freezeSwitch}
                                          onChange={(event) =>
                                            setFreezeSwitch(
                                              event.target.checked,
                                            )
                                          }
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
                                    value={freezeAddress}
                                    onChange={(event) =>
                                      setFreezeAddress(event.target.value)
                                    }
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
                                          checked={clawbackSwitch}
                                          onChange={(event) =>
                                            setClawbackSwitch(
                                              event.target.checked,
                                            )
                                          }
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
                                    value={clawbackAddress}
                                    onChange={(event) =>
                                      setClawbackAddress(event.target.value)
                                    }
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                        <div
                          className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"
                          style={{ display: 'none' }}
                        >
                          <div className="jss16">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                              id="input-amount"
                              name="assetTotal"
                              className="custom-input-size form-control  "
                              placeholder={'1'}
                              type="text"
                              value={inputAmount}
                              onChange={(event) =>
                                setInputAmount(event.target.value)
                              }
                              inputMode="numeric"
                            />
                          </div>
                        </div>
                      </div>

                      <p className="jss36">
                        Once your NFT is minted on the Algorand blockchain, you
                        will not be able to edit or update any of its
                        information unless you minted the NFT wtih ARC19. If you
                        minted the NFT with ARC19, you may update the NFT's
                        information with an "asset config" transaction.
                        <br />
                        <br />
                        You agree that any information uploaded to ARC Minter
                        will not contain material subject to copyright or other
                        proprietary rights, unless you have necessary permission
                        or are otherwise legally entitled to post the material.
                      </p>

                      {!connected && (
                        <button
                          className=" Mui-not-btn MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false Mui-disabled Mui-disabled"
                          tabIndex={-1}
                          id="not-connected"
                          type="submit"
                          disabled={false}
                          style={{ marginBottom: 30 }}
                        >
                          <span className="MuiButton-label">
                            Wallet not connected
                          </span>
                        </button>
                      )}

                      {connected && (
                        <div id="connected" style={{ display: 'flex' }}>
                          {connected2 && (
                            <div id={'connected2'} style={{ display: 'flex' }}>
                              <button
                                hidden={true}
                                onClick={async () => {
                                  if (
                                    Pipeline.pipeConnector === 'WalletConnect'
                                  ) {
                                    alert(
                                      'Please close alert and sign transaction on mobile device',
                                    );
                                  }
                                  let asaId = await createAsa();
                                  alert(asaId);
                                  setAsa(
                                    'https://www.nftexplorer.app/asset/' +
                                      asaId,
                                  );
                                  setUrlHash('https://ipfs.io/ipfs/' + urlHash);
                                  setAsaId(asaId);
                                }}
                                className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
                                tabIndex={-1}
                                style={{ marginBottom: 30 }}
                                disabled={modifyButtonDisabled}
                              >
                                <span className="MuiButton-label">
                                  Modify NFT
                                </span>
                              </button>
                            </div>
                          )}
                          {connected4 && (
                            <div id="connected4" style={{ display: 'flex' }}>
                              <ButtonSpinner
                                id={'configModuleButtonSpinner'}
                                text={'updating...'}
                                disabled={false}
                              />
                            </div>
                          )}
                          {flexHr && (
                            <hr id="flex-hr" style={{ display: 'flex' }} />
                          )}
                          <Preview
                            flex={flex}
                            name={asa}
                            url={asa}
                            imgUrl={urlHash}
                          />
                        </div>
                      )}
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
                style={{ position: 'relative', zIndex: 2 }}
              >
                <div
                  className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    flexBasis: '100%',
                  }}
                >
                  <div className="footer-flex">
                    <div className="footer-left">
                      <img
                        src="algologo.svg"
                        alt="banner"
                        className="footer-img"
                      />

                      <p className="jss50">
                        Algorand is the #1 carbon-negative blockchain.{' '}
                        <br style={{ display: jss6 }}></br>
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
        <div id="WEB3_CONNECT_MODAL_ID" />
      </div>

      <div className="container body-2"></div>
    </div>
  );
}

export default ConfigModule;
