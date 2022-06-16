import React, { Component } from 'react';

class NFTFetch3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
    };
  }

  render() {
    return (
      <div className="jss16">
        <label htmlFor="assetIndex">App iD</label>
        <input
          className="metadata-object"
          type="number"
          defaultValue={95600304}
          id="appId"
          disabled
          style={{ marginBottom: 'unset' }}
        ></input>
        <div id="fetchButton">
          <p className="metadata-object" style={{ marginTop: '15px' }}>
            {this.props.txIds}
          </p>
          <button
            className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 false"
            style={{ marginBottom: '20px' }}
            onClick={this.props.onClick}
          >
            Fetch MetaFile
          </button>
          <label>Approx. file size: </label>
          <p>{this.props.fileSize}</p>
        </div>
      </div>
    );
  }
}

export default NFTFetch3;
