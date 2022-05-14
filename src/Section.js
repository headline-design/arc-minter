import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { MintingUtils
 } from "./mintingUtils";
class Section extends React.Component {
  render() {
    return (
      <>
        <>
          <div className="section">
         
            <div
              onClick={this.props.handleClick}
              className="sectionhead"
              id={this.props.name}
            >
              {this.props.title}
              
              <label>
                  
                {this.props.active === this.props.name ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </label>
              
            </div>

           <div> </div>
          </div>
        </>
      </>
    );
  }
}

export default Section;
