import React from "react";
import { MintingUtils } from "./mintingUtils";

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      address: ""
    };
  }

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));
  checkForAddress = () => {
    if (this.state.address !== window.pipeAddress) {
      this.setState ({
        address: window.pipeAddress
      })
    }
  }
componentDidMount() {setInterval(
  this.checkForAddress,500
)}


  render() {
    console.log(this.props.animateHeightId);
    return (
      <div className="accordion">
          <div className="accordion-header">
          <div className="jss16">

<label className="advanced-options "
onClick={this.toggleOpen}>
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

          {this.state.open && (
            
              <div >
         <div className="asset-form-block collapse show" style={{}}>
          
          <div className="jss16">
            <div className="label-switch">
              <label className="">Manager Address:</label>
              <div className="permitted">
                <div className="big-switch custom-switch custom-control">
                  <input
                    type="checkbox"
                    id="toggleClawbackSwitch2"
                    name="toggleManager"
                    className="custom-control-input"
                    defaultChecked=""
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="toggleClawbackSwitch2"
                  />
                </div>
              </div>
            </div>
            <input
              name="assetManager"
              value={this.state.address}
              placeholder="Manager address"
              id="input-manager"
              type="text"
              className="custom-input-size form-control"
              aria-invalid="false"
            />
            <div className="invalid-feedback">Manager Address is invalid</div>
          </div>
          <div className="jss16">
            <div className="label-switch">
              <label className="">Freeze Address:</label>
              <div className="permitted">
                <div className="big-switch custom-switch custom-control">
                  <input
                    type="checkbox"
                    id="toggleClawbackSwitch3"
                    name="toggleFreeze"
                    className="custom-control-input"
                    defaultChecked=""
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="toggleClawbackSwitch3"
                  />
                </div>
              </div>
            </div>
            <input
              name="assetFreeze"
              value={this.state.address}
              placeholder="Freeze Address"
              type="text"
              className="custom-input-size form-control"
              aria-invalid="false"
            />
            <div className="invalid-feedback">Freeze Address is invalid</div>
          </div>
          <div className="jss16">
            <div className="label-switch">
              <label className="">Clawback Address:</label>
              <div className="permitted">
                <div className="big-switch custom-switch custom-control">
                  <input
                    type="checkbox"
                    id="toggleClawbackSwitch4"
                    name="toggleClawback"
                    className="custom-control-input"
                    defaultChecked=""
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="toggleClawbackSwitch4"
                  />
                </div>
              </div>
            </div>
            <input
              name="assetClawback"
              id="assetClawback"
              value={this.state.address}
              type="text"
              className="custom-input-size form-control"
              aria-invalid="false"
            />
            <div className="invalid-feedback">Clawback Address is invalid</div>
          </div>
          <div className="jss16">
            <label htmlFor="frozen-dropdown" className="">
              Asset Status:
            </label>
            <div
              name="frozenStatus"
              id="frozen-dropdown"
              className="frozen-dropdown dropdown"
            >
              <button
                type="button"
                name="frozenStatus"
                value="false"
                aria-haspopup="true"
                aria-expanded="false"
                className="frozen-dropdown-toggle dropdown-toggle btn btn-secondary"
              >
                Unfrozen
              </button>
              <div
                tabIndex={-1}
                role="menu"
                aria-hidden="true"
                className="frozen-dropdown-menu dropdown-menu"
              >
                <button
                  type="button"
                  value="true"
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  Frozen
                </button>
                <button
                  type="button"
                  value="false"
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  Unfrozen
                </button>
              </div>
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
              defaultValue={""}
            />
            <div className="invalid-feedback">
              Note can not exceed 1000 bytes.
            </div>
          </div>
        </div>
              </div>
    
          )}
</div>
      </div>
    );
  }
}

export default Accordion;