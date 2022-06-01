import React, { Component } from 'react'
import './css/node-menu.css'
import './css/style.css'
import './css/upload-utilities.css'

function loadScripts() {
  const scripts = [
    "js/jquery.min.js?2.1.3",
    "js/config.js",
    "js/node-menu.js",
  ]

  scripts.forEach(src => {
    var newScript = document.createElement("script");
    newScript.src = src;
    document.body.appendChild(newScript);
  })
}


class IpfsUpload extends Component {

  componentDidMount(){
    loadScripts()
  }

  render(){
    return(
      <div id="ipfsDiv">
        <div id="content">
          <div id="wrapper">
            <div id="right">
              <div style={{display:"none"}} className="form">
              </div>
              
            </div>
            <div id="left" className="jss28">
              <div id="fileDropBox">
              <label htmlFor='files'>Browse files</label>
              <br /> <br />
                <p>
                        Supports JPG, PNG and MP4 videos. Max file size : 10MB.
                      </p> 
                
           
                <input type="file" name="files[]" id="files" className="box_file"
                  data-multiple-caption="{count} files selected" multiple="" />
              </div>

              
            </div>
          </div>
          
          <div id="upload_conf">
            <button type="button" className="box_button" id="buttonUpload">Upload<img
              src="img/upload.png" />
            </button>

              
            <div className="min-loading blue loading-hidden">
              
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            
          </div>
          
          <div id="list" style={{display:"block"}}>
         
                <ul style={{display:"none"}} className="jss29" id="img-preview-block">
                           
              <img src="img/post-add.svg" id="img-preview" width="auto" height="70px" alt="preview-img" />
            
             </ul> 
             <div id="divResponse">
                <pre id="response">
                  <span id="info">Response IPFS API:</span>
                </pre>
              </div>
          
              </div>
          
        </div>
      </div>

  )
    }

}

export default IpfsUpload