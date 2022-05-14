import algosdk from 'algosdk'
import React from 'react'
import { CID } from "multiformats/cid";

class HexToAlgo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      address:""
    }
  }


  codeToCodec = (code) => {
    switch (code.toString(16)) {
      case "55":
        return "raw";
      case "70":
        return "dag-pb";
      default:
        throw new Error("Unknown codec");
    }
  };

  cidToReserveURL = (ipfshash) => {
    const [cid, filename] = ipfshash.split("/");

    const decoded = CID.parse(cid);
    const version = decoded.version;
    const codec = this.codeToCodec(decoded.code);

    if (version === 0 && filename) {
      throw new Error('CID version 0 does not support directories');
    }

    const url = `template-ipfs://{ipfscid:${version}:${codec}:reserve:sha2-256}${
      filename ? "/" + filename : ""
    }`;

    const reserveAddress = algosdk.encodeAddress(
      Uint8Array.from(Buffer.from(decoded.multihash.digest))
    );

    return {
      url,
      reserveAddress,
    };
  };

  handleClickConvert(ipfshash) {
    const { url, reserveAddress } = this.cidToReserveURL(ipfshash);

    this.setState({
      url,
      address: reserveAddress,
    });
  }

  hexToBytes = (hex = []) => {
    let bytes = []
  
    for (let c = 0; c < hex.length; c += 2){
    bytes.push(parseInt(hex.substr(c, 2), 16))}
  
  console.log(bytes)
  
  this.setState({address: algosdk.encodeAddress(bytes)})
  }


  render(){
    return(
    <div>

    <hr className="col-3 col-md-2 mb-5" />
    <input className="form-control" id="hex"></input>
      <button className="w-100 btn btn-primary btn-lg mt-3 mb-3" onClick={()=>{this.handleClickConvert(document.getElementById("hex").value)}}>
        Convert
      </button>
      <div
        className="alert alert-secondary alert-dismissible fade show"
        role="alert"
      >
        URL: &nbsp; 
        { this.state.url}
      </div>
      <div
  className="alert alert-secondary alert-dismissible fade show"
  role="alert"
>Reserve Address: &nbsp; 
  { this.state.address}
</div>
</div>
)
  }

}


export default HexToAlgo;