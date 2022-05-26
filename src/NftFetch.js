import algosdk from "algosdk";
import React, { Component } from "react";
import { base58btc } from "multiformats/bases/base58";

class NftFetch extends Component {

  constructor(props){
    super(props)
    this.state={
      src: "",
    }
  }

  asaToIpfsJSON = async () => {
    let assetId = parseInt(document.getElementById("assetIndex").value)

    let asaData = await fetch(
      "https://algoindexer.algoexplorerapi.io/v2/assets/" + assetId
    );
    let asaDataJson = await asaData.json();
    console.log(asaDataJson);
    let account = algosdk.decodeAddress(asaDataJson.asset.params.reserve);

    let newArray = new Uint8Array(34);

    newArray[0] = 18;
    newArray[1] = 32;
    let i = 2;
    account.publicKey.forEach((byte) => {
      newArray[i] = byte;
      i++;
    });
    console.log(newArray);
    let encoded = base58btc.baseEncode(newArray);
    console.log(encoded);

    let myJson = await fetch("https://ipfs.io/ipfs/" + encoded);
    let myJsonParsed = await myJson.json();
    window.defaultJson = myJsonParsed
    let jsonString = JSON.stringify(myJsonParsed)
    document.getElementById("preview").innerText = jsonString
    this.setState({src:myJsonParsed.image.replace("ipfs://","https://ipfs.io/ipfs/")})
    alert(jsonString)
  };

  render() {
    return <div className="jss16">
      <label for="assetIndex">Asset Index</label>
      <input className="metadata-object" type="number" defaultValue={752823772} id="assetIndex"></input>
      <button className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
        onClick={this.asaToIpfsJSON}
      >Fetch Metadata</button>
      <img style={{display:"none"}} width="40px" height="40px" alt="your NFT here" src={this.state.src}></img>
    </div>;
  }
}

export default NftFetch;
