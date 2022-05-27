import { useRef, useEffect, useState } from "react";

const NFTCard = ({
  image,
  name,
  type,
  quantity,
  setModalState,
  setModalImgProps,
}) => {
  const imgElement = useRef(null);
  const [portrait, setportrait] = useState(false);

  return (
    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-3"
    onClick={() => {
      setModalState(true);
      setModalImgProps({ img: image, portrait: portrait });
    }}>
      <div className="jss69">
        <div className="jss70">
          <div className="jss71"></div>
       
          <div  id="imageParent"
            className="jss72"
            alt="image"
          ></div>
        </div>
        <div className="jss73">
          <h3 id="preview" className="jss74">Asset name</h3>
          <div className="jss75">
            <span id="preview2">ARC Type</span>
            <span></span>
            
          </div>
        </div>
      </div>
    </div>
  );
};


export default NFTCard;