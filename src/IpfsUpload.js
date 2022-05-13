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

        <div className="b-nav">
          <nav>
            <a href="#" title="home">
              <h1>Upload files to <img src="img/ipfs.png" style={{margin: "0 2px"}} /> from Browser -
                Panel</h1>
            </a>
            <ul>
              <li><a href="#">About IPFS
                <svg className="svg svg-info" role="img" aria-label="Info" focusable="false"
                  style={{height: "1.2em", width: "1.2em", display: "block", float: "right", margin: "-2px 0 0 5px"}}
                  viewBox="0 0 24 24">
                  <path
                    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                </svg>
              </a>
                <ul>
                  <li><a href="https://www.youtube.com/watch?v=5Uj6uR3fp-U" target="_blank">What is IPFS</a>
                  </li>
                  <li><a href="https://github.com/ipfs/js-ipfs-http-client" target="_blank">IPFS JS API</a>
                  </li>
                </ul>
              </li>
              <li><a href="https://ipfs.github.io/public-gateway-checker/" target="_blank">Gateways List
                <svg className="svg svg-gateways" role="img" aria-label="Info" focusable="false"
                  style={{height: "1.2em", width: "1.2em", display: "block", float: "right", margin: "-2px 0 0 2px"}}
                  version="1.0" viewBox="0 0 512.000000 512.000000">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
                    <path d="M3530 4291 c-169 -54 -304 -204 -341 -378 -25 -125 4 -276 75 -381
									l32 -48 -323 -402 -324 -402 -364 0 c-350 0 -365 1 -365 19 0 33 -68 155 -113
									202 -106 111 -217 159 -372 159 -79 0 -114 -5 -166 -24 -163 -57 -285 -192
									-324 -357 -60 -256 77 -508 323 -595 95 -33 239 -33 334 0 132 47 246 153 299
									280 l23 56 366 0 367 0 299 -382 c164 -210 304 -389 311 -398 10 -14 5 -31
									-28 -97 -142 -276 -12 -606 279 -709 95 -33 239 -33 334 0 245 86 383 340 323
									594 -39 167 -160 300 -323 358 -81 29 -229 33 -308 9 -27 -8 -50 -15 -51 -15
									-6 0 -598 763 -600 773 -1 7 137 183 306 392 267 329 311 380 332 377 13 -2
									74 -6 134 -9 95 -4 119 -2 175 17 167 55 295 194 335 361 60 255 -78 509 -324
									595 -84 30 -236 32 -321 5z" />
                  </g>
                </svg>

              </a></li>
              <li><a href="https://github.com/anarkrypto/upload-files-to-ipfs-from-browser-panel"
                target="_blank">On GitHub
                <svg className="svg svg-github" role="img" aria-label="GitHub" focusable="false"
                  style={{margin: "-2px 0 0 5px", viewBox: "0 0 24 24"}}>
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a></li>
            </ul>
          </nav>
        </div>
        <div id="content">
          <div id="wrapper">
            <div id="right">
              <div className="form">
              </div>
              <div id="divResponse">
                <pre id="response">
                  <span id="info">Response IPFS API:</span>
                </pre>
              </div>
            </div>
            <div id="left">
              <div id="fileDropBox">
                <svg className="box_icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43"
                  viewBox="0 0 50 43">
                  <path
                    d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z">
                  </path>
                </svg>
                Drop files here <br /> or
                <label for='files'>Choose Files &#187;</label>
                <input type="file" name="files[]" id="files" className="box_file"
                  data-multiple-caption="{count} files selected" multiple="" />
              </div>

              <div id="list">
                <ul></ul>
              </div>
            </div>
          </div>
          <div id="upload_conf">
            <button type="button" className="box_button" id="buttonUpload">Upload<img
              src="img/upload.png" /></button>
            <div className="min-loading blue loading-hidden">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

  )
    }

}

export default IpfsUpload