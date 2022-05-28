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
    let parent = document.getElementById ("imageParent")
    parent.innerHTML = ""
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
    document.getElementById("preview0").style.display = "flex"
    document.getElementById("preview").innerText = jsonString
    document.getElementById("preview2").innerText = myJsonParsed.name
    let child = document.createElement("img")
    child.style.width = "auto"
    child.style.height = "70px"
    child.src = myJsonParsed.image.replace("ipfs://","https://ipfs.io/ipfs/")
    parent.appendChild(child)
    alert(jsonString)
  };

  render() {
    return <div className="jss16">
      <label for="assetIndex">Asset Index</label>
      <input className="metadata-object" type="number" style={{marginBottom:"unset"}} defaultValue={756312877} id="assetIndex"></input>
      <div id="fetchButton" style={{marginTop:"1rem"}}>
      <button  className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
        onClick={this.asaToIpfsJSON}
      >Fetch Metadata</button>
      </div>
      <div id="preview0" style={{display:"none", marginTop:"2rem"}}>
      <div id="list2" style={{width:"100%"}}>
         
                <ul style={{display:"flex"}} className="jss29" id="img-preview-block2">
                           
              <div src="img/post-add.svg" id="imageParent" width="auto" height="70px" alt="preview-img" />
              <li id="preview2"><strong className="fileName"></strong><br/> </li>
             </ul> 
          
              </div>
              </div>
      
     <div ></div>
    </div>;
  }
}

export default NftFetch;
