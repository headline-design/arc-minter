import React, { Component } from 'react'
import './css/node-menu.css'
import './css/style.css'
import './css/upload-utilities.css'
import {
  Button,
} from "@blueprintjs/core";


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
                <svg className="box_icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43"
                  viewBox="0 0 50 43">
                  <path
                    d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z">
                  </path>
                </svg>
                <p>
                        Supports JPG, PNG and MP4 videos. Max file size : 10MB.
                      </p> <br /> or
                
                <label htmlFor='files'>Browse files &#187;</label>
                <input type="file" name="files[]" id="files" className="box_file"
                  data-multiple-caption="{count} files selected" multiple="" />
              </div>

              
            </div>
          </div>
          
          <div id="upload_conf">
            <Button type="button" className="box_button" id="buttonUpload">Upload<img
              src="img/upload.png" /></Button>

              
            <div className="min-loading blue loading-hidden">
              
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            
          </div>
          
          <div id="list" style={{display:"none"}}>
         
                <ul className="jss29">
                           
              <img id="img-preview" width="auto" height="70px" alt="preview-img" />
            
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