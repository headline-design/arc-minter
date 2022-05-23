import { Button, AnchorButton } from "@blueprintjs/core";
import {useEffect, useState} from 'react'



const Preview = (props) => {

    async function handleDownload() {
        var a = document.createElement("a");
        const image = await fetch(props.imgUrl);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);
        a.href = imageURL;
        a.download = "image.jpg";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

  return (
    <div style={{display:"none"}}>
      <div >
      <img alt="NFT" className="hashlock" src={props.imgUrl} />
        <Button
          style={{
            color: "#7b78ff",
            borderColor: "#7b78ff",
            borderRadius: "8px",
            margin: "8px",
          }}
          minimal={true}
          outlined={true}
          intent="success"
          large={true}
          icon="download"
          text="Download"
          onClick={handleDownload}
        />
        <AnchorButton
          style={{
            color: "white",
            borderColor: "white",
            borderRadius: "8px",
            margin: "8px",
          }}
          minimal={true}
          outlined={true}
          large={true}
          intent="success"
          href={props.url}
          target="_blank"
        >
          <img
            style={{ width: "20px", float: "left", marginRight: "8px" }}
            alt="nft explorer icon"
            src="/nftexplorer.ico"
          />
          NFT Explorer
        </AnchorButton>
      </div>
      <div>
        <h3> Congrats on successfully minting your ARC NFT!</h3>
        <p>
          <b>Note: </b>If the image of your ARC NFT isn't appearing yet, give
          it a moment, it might be shy.
        </p>
      </div>
    </div>
  );
};

export default Preview;
