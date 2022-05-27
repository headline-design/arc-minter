import { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const NFTCard = ({
  image,
  name,
  type,
  quantity,
  setModalState,
  setModalImgProps,
}) => {
  const classes = useStyles();
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

const useStyles = makeStyles((theme) => ({
  nftCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    overflow: "hidden",
    padding: "16px",
    border: "0.5px solid #E8E8E8",
    height: "100%",
    boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
    cursor: "pointer",

    "&:hover img":{
      transform: 'scale(1.1)',
      transition:'all 0.3s ease',
    }
  },
  imageContainer: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  imgPlaceholder: {
    width: "100%",
    paddingBottom: "100%",
  },
  nftImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#EDF0F7",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    transform: 'scale(1)',
    transition:'all 0.3s ease',
  },
  nftDetails: {
    padding: "0 2px",
  },
  nftTitle: {
    margin: "0 0 4px 0",
    textTransform: "capitalize",
    fontSize: "17px",
  },
  nftSubTitle: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#515C72",
    fontWeight: "600",

    "& span": {
      textTransform: "uppercase",
    },
  },
}));

export default NFTCard;