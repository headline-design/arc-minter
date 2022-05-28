// @ts-nocheck

import React, { useState } from "react";


window.defaultJSON = {
  name: "ARC Logo",
  description: "ARC Logo for ARC Minter by HEADLINE",
  image: "ipfs://QmeuYSs7pgRLB27q5HQdaUpgLGMuERbqScBSrxtQfvXbQD",
  decimals: 0,
  unitName: "ARC",
  image_integrity:
    "sha256-f628137f76d4dac60eb79325ca1bb4d9bd9d569c2648c4e4ea3c0a025d259b0a",
  image_mimetype: "image/jpeg",
  properties: undefined,
};

function DocsModule() {
  const [jss6, setJss6] = useState("block");
  const [jss7, setJss7] = useState("none");

  function toggle19() {
    if (jss7 === "block") {
      setJss7("none");
      setJss6("block");
    } else {
      setJss6("none");
      setJss7("block");
    }
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
                            ARC NFTs are NFTs minted on Algorand that adhere to
                            a standard that is submitted as an Algorand Request
                            for Comment to the community. The goal of these
                            conventions is to make it simpler for block
                            explorers, wallets, exchanges, marketplaces, and
                            more generally, client software to display the
                            properties of a given ASA.
                            <br></br>
                            <br></br>
                            Below you will find instructions for minting ARC19
                            and ARC69 NFTs.
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
                        ></div>
                      </div>
                      <p
                        id="arc19-1"
                        className="jss36"
                        style={{ display: jss6 }}
                      >
                        <p>ARC19 Docs</p>
                        ARC19 NFTs allow anyone to mint NFTs and update the
                        image at a later date via asset config transaction. This
                        is "a proposal to allow a templating mechanism of the
                        URL so that changeable data in an asset can be
                        substituted by a client, providing a mutable URL".
                        <br />
                        <br />
<p>
 ARC Minter was constructed modularly so that users can enter and exit at different points in the minting process. For example, if someone has already uploaded an image to IPFS, uploaded a JSON object, etc they could use ARC Minter with ease. 
 </p>
 <p>
 With that in mind, we still encourage users to approach the minter with the intention of using the minter from beginning to end, starting with uploading an image or file to IPFS, then entering JSON properties. Much of the complexity of ARC19 minting is automated. So users can create programmable/upgradeable NFTs without having to deal with hashing hexs and the like. 
 </p>
 <p>
 The ARC minter is a highly-experimental application and should be used with caution. 
 </p>
                      </p>
                      <p
                        id="arc69-1"
                        className="jss36"
                        style={{ display: jss7 }}
                      >
                        <p>ARC69 Docs</p>
                        ARC69 NFTs allow anyone to mint NFTs and update the
                        metadata at a later date via asset config transaction.
                        "The goal of these conventions is to make it simpler to
                        display the properties of a given ASA. This ARC differs
                        from ARC3 by focusing on optimization for fetching of
                        digital media, as well as the use of onchain metadata.
                        Furthermore, since asset configuration transactions are
                        used to store the metadata, this ARC can be applied to
                        existing ASAs."
                        <br />
                        <br />
                        Here are the steps to mint/configure ARC69 NFTs with ARC Minter:
                        <p>
 Mint ARC69
 </p>
 <p>
 1. Upload image or file to IPFS
 </p>
 <p>
 2. Set Asset Name
 </p>
 3. Set Unit Name
 <p>
 4. Choose an asset URL
 </p>
 <p>
 5. In the note field, you can choose to add your metadata at mint or configure at a later date.
 </p>
 <p>
 6. Choose the quantity of NFTs per ASA.
 </p>
 <p>
 7. Connect Wallet and sign Asset Creation Transaction
 </p>
                      </p>
                    </div>

                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12" />
                      <div spacing={2} />
                      <p
                        id="arc19-2"
                        className="jss36"
                        style={{ display: jss6 }}
                      >
                        ARC19 Mint
 <p>
 1. Upload image or file to IPFS.
 </p>
 <p>
 2. Choose an Asset Name for your NFT.
 </p>
 <p>
 3. Choose a Unit Name for your NFT.
 </p>
 <p>
 4. Write a solid description of your NFT.
 </p>
 <p>
 5. Choose how many decimals you want for your NFT (0 is the recommended number).
 </p>
 <p>
 6. Change the Image Mimetype if you are inclined. 
 </p>
 <p>
 7. Use the Advanced JSON Editor to add additional properties to your NFT’s JSON object. 
 </p>
 <p>
 8. Upload the JSON object to IPFS.
 </p>
 9. Add an additional note field if you are so inclined.
 <p>
 10. At this point, you must sign in with your Algorand wallet if you have not already. Perra Wallet and MyAlgo are both supported at launch. 
 </p>
 <p>
 11. Sign the Asset creation transaction.
 </p>
 <p>
 12. Wait approximately 15 seconds for your asset number to be returned. 
 </p>
 <p>
 13. Review the NFT details via NFTExplorer, ARC3.xyz, or any other provider that supports ARC19 NFTs. 
 </p>
                        <br />

                        ARC19 Config
 <p>
 1. Paste your asset ID into the Asset Index field. Click “Fetch Metadata” to pre-populate fields with your latest JSON object.
 </p>
 <p> 
 2. Modify your new JSON object with the decimals, image mimetype, unit name, description, and advanced editor fields.
 </p>
 <p>
 3. Upload your new JSON object to IPFS. 
 </p>
 <p>
 4. Complete any additional asset config fields if you are so inclined. Sign the asset config transaction. You have now minted and modified an ARC19 NFT!
 chain.  </p>
                      </p>
                      <p
                        id="arc69-2"
                        className="jss36"
                        style={{ display: jss7 }}
                      >
                       
 Modify ARC69
 <p>
  1. Paste your NFT’s ASA number in the Asset Index field.
  </p> 
  <p> 
  2. Fetch Metadata to pre-populate some fields.
  </p> 
  3. You can choose an alternate image Mimetype
  <p> 
  4. Paste your metadata JSON Object in the note field.
  </p> 
  <p> 
  5. Connect Wallet and sign Asset Config Transaction
  </p> 
                        <br />
                       
                        And just a reminder!
                        You agree that any information uploaded to ARC Minter
                        will not contain material subject to copyright or other
                        proprietary rights, unless you have necessary permission
                        or are otherwise legally entitled to post the material.
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
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6" style={{width:"100%", maxWidth: "100%", flexBasis: "100%"}}>
                  <div className="footer-flex">
                    <div className="footer-left">
                      <img
                        src="algologo.svg"
                        alt="banner"
                        className="footer-img"
                      />

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
      </div>

      <div className="container body-2"></div>
    </div>
  );
}

export default DocsModule;
