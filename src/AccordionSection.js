import React, { Component } from "react";
import PropTypes from "prop-types";

class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div
        style={{
          padding: "5px 10px",
        }}
      >
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          {label}

          <div style={{ float: "left" }}>
            {!isOpen && (
              <div className="MuiAccordionSummary-expandIconWrapper css-1n3veo1 mr-2">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-right"
                  className="svg-inline--fa fa-angle-right fa-w-8"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path
                    fill="currentColor"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                  />
                </svg>
              </div>
            )}
            {isOpen && (
              <div className="MuiAccordionSummary-expandIconWrapper Mui-expanded css-1n3veo1 mr-2">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-right"
                  className="svg-inline--fa fa-angle-right fa-w-8"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path
                    fill="currentColor"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              padding: "10px 20px",
            }}
          >
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;
