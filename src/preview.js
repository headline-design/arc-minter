import { Button, AnchorButton } from "@blueprintjs/core";

const Preview = (props) => {

    async function handleDownload() {
        const a = document.createElement("a");
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

  return props.flex ?
    (<div id="flex" style={{display: "flex"}}>
        <div className="flex">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-3 flex-grow"
                 style={{maxWidth: "75%"}}>
                <div className="jss69">
                    <div className="jss70">
                        <div className="jss71"/>
                        <img alt="NFT" className="jss72" src={props.imgUrl}/>
                    </div>
                    <div className="jss73">
                        <h3 id="preview" className="jss74">
                            Asset name
                        </h3>
                        <div className="jss75">
                            <span id="preview2">ARC Type</span>
                            <span/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex2">
                <div className="flex3">
                    <h3> Congrats on successfully minting your ARC NFT!</h3>
                    <p>
                        <b>Note: </b>If the image of your ARC NFT isn't appearing yet, give
                        it a moment, it might be shy.
                    </p>
                </div>
                <Button
                    style={{
                        color: "#9578ff",
                        borderColor: "#9578ff",
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
                        style={{width: "20px", float: "left", marginRight: "8px"}}
                        alt="nft explorer icon"
                        src="/nftexplorer.ico"
                    />
                    NFT Explorer
                </AnchorButton>
            </div>
        </div>
    </div>) : null;
};

export default Preview;
