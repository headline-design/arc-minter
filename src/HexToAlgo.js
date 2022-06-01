import algosdk from 'algosdk';
import React from 'react';
import { CID } from 'multiformats/cid';

class HexToAlgo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      disabled: true,
    };
  }

  handleGameClik() {
    this.setState({ disabled: !this.state.disabled });
  }

  codeToCodec = (code) => {
    switch (code.toString(16)) {
      case '55':
        return 'raw';
      case '70':
        return 'dag-pb';
      default:
        throw new Error('Unknown codec');
    }
  };

  cidToReserveURL = (ipfshash) => {
    const [cid, filename] = ipfshash.split('/');

    const decoded = CID.parse(cid);
    const version = decoded.version;
    const codec = this.codeToCodec(decoded.code);

    if (version === 0 && filename) {
      throw new Error('CID version 0 does not support directories');
    }

    const url = `template-ipfs://{ipfscid:${version}:${codec}:reserve:sha2-256}${
      filename ? '/' + filename : ''
    }`;

    const reserveAddress = algosdk.encodeAddress(
      Uint8Array.from(Buffer.from(decoded.multihash.digest)),
    );

    return {
      url,
      reserveAddress,
    };
  };

  handleClickConvert(ipfshash) {
    const { url, reserveAddress } = this.cidToReserveURL(ipfshash);
    this.props.setInputReserve(reserveAddress);

    this.setState({
      url,
      address: reserveAddress,
    });
  }

  hexToBytes = (hex = []) => {
    let bytes = [];

    for (let c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substr(c, 2), 16));
    }

    console.log(bytes);

    this.setState({ address: algosdk.encodeAddress(bytes) });
  };

  componentDidUpdate(prevProps) {
    if (this.props.hash !== prevProps.hash) {
      this.handleClickConvert(this.props.hash);
    }
  }

  render() {
    return (
      <div className="jss16">
        <div className="label-switch">
          <label className="">File hash:</label>
          <div className="permitted">
            <div className="big-switch custom-switch custom-control">
              <input
                type="checkbox"
                id="toggle-hex"
                name="toggleHex"
                onClick={this.handleGameClik.bind(this)}
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="toggle-hex" />
            </div>
          </div>
        </div>

        <input
          type="text"
          defaultValue={this.props.hash}
          pattern=""
          id="hex"
          disabled={!!this.state.disabled}
        />
        <div
          className="alert alert-secondary alert-dismissible fade show"
          role="alert"
        >
          URL: &nbsp;
          {this.state.url}
        </div>
        <div
          className="alert alert-secondary alert-dismissible fade show"
          role="alert"
        >
          Reserve Address: &nbsp;
          {this.state.address}
        </div>
      </div>
    );
  }
}

export default HexToAlgo;
