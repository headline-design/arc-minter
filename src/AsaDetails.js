export const AsaDetails = () => (
    <>
      
      <style
        dangerouslySetInnerHTML={{
          __html:
            '/*! CSS Used from: Embedded */\nsvg:not(:root).svg-inline--fa{overflow:visible;}\n.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-0.125em;}\n.svg-inline--fa.fa-w-10{width:0.625em;}\n.svg-inline--fa.fa-w-16{width:1em;}\n/*! CSS Used from: Embedded */\nsvg:not(:root).svg-inline--fa{overflow:visible;}\n.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-0.125em;}\n.svg-inline--fa.fa-w-10{width:0.625em;}\n.svg-inline--fa.fa-w-16{width:1em;}\n/*! CSS Used from: https://asset.myalgo.com/static/css/2.49b15605.chunk.css */\n*,:after,:before{box-sizing:border-box;}\n[tabindex="-1"]:focus:not(:focus-visible){outline:0!important;}\nhr{box-sizing:content-box;height:0;overflow:visible;}\nsmall{font-size:80%;}\nsvg{vertical-align:middle;}\nsvg{overflow:hidden;}\nlabel{display:inline-block;margin-bottom:.5rem;}\nbutton{border-radius:0;}\nbutton:focus:not(:focus-visible){outline:0;}\nbutton,input,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit;}\nbutton,input{overflow:visible;}\nbutton{text-transform:none;}\n[type=button],button{-webkit-appearance:button;}\n[type=button]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none;}\ninput[type=checkbox]{box-sizing:border-box;padding:0;}\ntextarea{overflow:auto;resize:vertical;}\nhr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1);}\nsmall{font-size:80%;font-weight:400;}\n.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.form-control{transition:none;}\n}\n.form-control::-ms-expand{background-color:transparent;border:0;}\n.form-control:focus{color:#495057;background-color:#fff;border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}\n.form-control:-ms-input-placeholder{color:#6c757d;opacity:1;}\n.form-control::-webkit-input-placeholder{color:#6c757d;opacity:1;}\n.form-control::placeholder{color:#6c757d;opacity:1;}\n.form-control:disabled{background-color:#e9ecef;opacity:1;}\ntextarea.form-control{height:auto;}\n.form-group{margin-bottom:1rem;}\n.invalid-feedback{display:none;width:100%;margin-top:.25rem;font-size:80%;color:#dc3545;}\n.btn{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.btn{transition:none;}\n}\n.btn:hover{color:#212529;text-decoration:none;}\n.btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}\n.btn:disabled{opacity:.65;}\n.btn-secondary{color:#fff;background-color:#6c757d;border-color:#6c757d;}\n.btn-secondary:focus,.btn-secondary:hover{color:#fff;background-color:#5a6268;border-color:#545b62;}\n.btn-secondary:focus{box-shadow:0 0 0 .2rem rgba(130,138,145,.5);}\n.btn-secondary:disabled{color:#fff;background-color:#6c757d;border-color:#6c757d;}\n.dropdown{position:relative;}\n.dropdown-toggle{white-space:nowrap;}\n.dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent;}\n.dropdown-toggle:empty:after{margin-left:0;}\n.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem;}\n.dropdown-item{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background-color:transparent;border:0;}\n.dropdown-item:focus,.dropdown-item:hover{color:#16181b;text-decoration:none;background-color:#e9ecef;}\n.dropdown-item:active{color:#fff;text-decoration:none;background-color:#007bff;}\n.dropdown-item:disabled{color:#adb5bd;pointer-events:none;background-color:transparent;}\n.custom-control{position:relative;z-index:1;display:block;min-height:1.5rem;padding-left:1.5rem;-webkit-print-color-adjust:exact;color-adjust:exact;}\n.custom-control-input{position:absolute;left:0;z-index:-1;width:1rem;height:1.25rem;opacity:0;}\n.custom-control-input:checked~.custom-control-label:before{color:#fff;border-color:#007bff;background-color:#007bff;}\n.custom-control-input:focus~.custom-control-label:before{box-shadow:0 0 0 .2rem rgba(0,123,255,.25);}\n.custom-control-input:disabled~.custom-control-label{color:#6c757d;}\n.custom-control-input:disabled~.custom-control-label:before{background-color:#e9ecef;}\n.custom-control-label{position:relative;margin-bottom:0;vertical-align:top;}\n.custom-control-label:before{pointer-events:none;background-color:#fff;border:1px solid #adb5bd;}\n.custom-control-label:after,.custom-control-label:before{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;content:"";}\n.custom-control-label:after{background:50%/50% 50% no-repeat;}\n.custom-switch{padding-left:2.25rem;}\n.custom-switch .custom-control-label:before{left:-2.25rem;width:1.75rem;pointer-events:all;border-radius:.5rem;}\n.custom-switch .custom-control-label:after{top:calc(.25rem + 2px);left:calc(-2.25rem + 2px);width:calc(1rem - 4px);height:calc(1rem - 4px);background-color:#adb5bd;border-radius:.5rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.custom-switch .custom-control-label:after{transition:none;}\n}\n.custom-switch .custom-control-input:checked~.custom-control-label:after{background-color:#fff;-webkit-transform:translateX(.75rem);transform:translateX(.75rem);}\n.custom-switch .custom-control-input:disabled:checked~.custom-control-label:before{background-color:rgba(0,123,255,.5);}\n.custom-control-label:before{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.custom-control-label:before{transition:none;}\n}\n.mb-0{margin-bottom:0!important;}\n.mr-2{margin-right:.5rem!important;}\n.my-4{margin-top:1.5rem!important;}\n.my-4{margin-bottom:1.5rem!important;}\n.text-center{text-align:center!important;}\n@media print{\n*,:after,:before{text-shadow:none!important;box-shadow:none!important;}\n}\n/*! CSS Used from: https://asset.myalgo.com/static/css/main.07b9e095.chunk.css */\n.asset-description{color:grey;font-size:.6rem;}\n.custom-input-size{height:50px;}\n.advanced-options{font-size:1rem;width:100%;}\n.advanced-options.opened{color:#245ec7;}\n.asset-form-block{width:100%;max-width:575px;margin-left:auto;margin-right:auto;}\n.asset-form-block small{font-size:.76rem;}\n.permitted{display:flex;justify-content:space-between;align-items:center;color:#245ec7;}\n.permitted .big-switch{-webkit-transform:scale(1.5);transform:scale(1.5);}\n.permitted .big-switch .custom-control-input{height:inherit;}\n.frozen-dropdown{width:100%!important;}\n.frozen-dropdown .frozen-dropdown-toggle{width:100%!important;display:flex;justify-content:space-between;background-color:#fff!important;border-color:#ced4da!important;color:#000!important;}\n.frozen-dropdown .frozen-dropdown-toggle:after{align-self:center;}\n.frozen-dropdown .frozen-dropdown-toggle:active,.frozen-dropdown .frozen-dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(0,123,255,.25098039215686274)!important;}\n.frozen-dropdown .frozen-dropdown-menu{width:100%!important;}\nlabel{font-size:.9rem!important;}\n.label-switch{display:flex;justify-content:space-between;}\n.label-switch .permitted{font-size:.9rem!important;font-weight:500;color:#245ec7;}\n.label-switch .permitted .big-switch{display:inline-block;-webkit-transform:scale(1.2);transform:scale(1.2);}\n.asset-form input{height:50px;}\n.asset-form .frozen-dropdown button{height:50px;padding-top:12px;}\n.asset-form .note-input-field{height:100px;}\n.decimal-dropdown{overflow:scroll;height:350px;}\n.total-supply-label-container{display:flex;justify-content:space-between;}\n.total-supply-container{display:flex;}\n.total-supply-container #totalSupply{border-top-right-radius:0;border-bottom-right-radius:0;border-right:0;text-align:right;padding-right:2px;box-shadow:none!important;}\n.total-supply-container #totalSupplyDecimals{border-top-left-radius:0;border-bottom-left-radius:0;border-left:0;padding-left:5px;box-shadow:none!important;}\n.total-supply-container input#totalSupplyDecimals:focus{outline-width:0;}\n.total-supply-container .dot-supply{padding-top:14px;margin-right:-4px;z-index:100;}\n.total-supply-container #assetDecimals{max-width:78px;margin-left:10px;}\n.total-supply-container .error-total-supply{margin-top:52px;position:absolute!important;}\n::-webkit-input-placeholder{color:#d3cfcf!important;}\n:-ms-input-placeholder{color:#d3cfcf!important;}\n::placeholder{color:#d3cfcf!important;}\n.form-group{position:relative;}\n::-webkit-scrollbar{width:3px;height:3px;}\n::-webkit-scrollbar-track{background:transparent;border-radius:10px!important;}\n::-webkit-scrollbar-thumb{background:#ced4da;border-radius:10px!important;}\n::-webkit-scrollbar-thumb:hover{background:#ced4da;}\n.invalid-feedback{font-size:.75rem!important;}\n.grey-icon{color:#d6d5d5;}\n*,:after,:before{box-sizing:border-box;}\n[tabindex="-1"]:focus:not(:focus-visible){outline:0!important;}\nhr{box-sizing:content-box;height:0;overflow:visible;}\nsmall{font-size:80%;}\nsvg{vertical-align:middle;}\nsvg{overflow:hidden;}\nlabel{display:inline-block;margin-bottom:.5rem;}\nbutton{border-radius:0;}\nbutton:focus:not(:focus-visible){outline:0;}\nbutton,input,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit;}\nbutton,input{overflow:visible;}\nbutton{text-transform:none;}\n[type=button],button{-webkit-appearance:button;}\n[type=button]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none;}\ninput[type=checkbox]{box-sizing:border-box;padding:0;}\ntextarea{overflow:auto;resize:vertical;}\nhr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1);}\nsmall{font-size:80%;font-weight:400;}\n.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-size:.8rem;font-weight:400;line-height:1.5;color:#7b8a8b;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.form-control{transition:none;}\n}\n.form-control::-ms-expand{background-color:transparent;border:0;}\n.form-control:focus{color:#7b8a8b;background-color:#fff;border-color:#82a7e8;outline:0;box-shadow:0 0 0 .2rem rgba(36,94,199,.25);}\n.form-control::-webkit-input-placeholder{color:#95a5a6;opacity:1;}\n.form-control:-ms-input-placeholder{color:#95a5a6;opacity:1;}\n.form-control::placeholder{color:#95a5a6;opacity:1;}\n.form-control:disabled{background-color:#ecf0f1;opacity:1;}\ntextarea.form-control{height:auto;}\n.form-group{margin-bottom:1rem;}\n.invalid-feedback{display:none;width:100%;margin-top:.25rem;font-size:80%;color:#e74c3c;}\n.btn{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:.8rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.btn{transition:none;}\n}\n.btn:hover{color:#212529;text-decoration:none;}\n.btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(36,94,199,.25);}\n.btn:disabled{opacity:.65;}\n.btn-secondary{color:#fff;background-color:#0badc0;border-color:#0badc0;}\n.btn-secondary:focus,.btn-secondary:hover{color:#fff;background-color:#098c9c;border-color:#088290;}\n.btn-secondary:focus{box-shadow:0 0 0 .2rem rgba(48,185,201,.5);}\n.btn-secondary:disabled{color:#fff;background-color:#0badc0;border-color:#0badc0;}\n.dropdown{position:relative;}\n.dropdown-toggle{white-space:nowrap;}\n.dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent;}\n.dropdown-toggle:empty:after{margin-left:0;}\n.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:.8rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem;}\n.dropdown-item{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background-color:transparent;border:0;}\n.dropdown-item:focus,.dropdown-item:hover{color:#16181b;text-decoration:none;background-color:#ecf0f1;}\n.dropdown-item:active{color:#fff;text-decoration:none;background-color:#245ec7;}\n.dropdown-item:disabled{color:#b4bcc2;pointer-events:none;background-color:transparent;}\n.custom-control{position:relative;z-index:1;display:block;min-height:1.2rem;padding-left:1.5rem;-webkit-print-color-adjust:exact;color-adjust:exact;}\n.custom-control-input{position:absolute;left:0;z-index:-1;width:1rem;height:1.1rem;opacity:0;}\n.custom-control-input:checked~.custom-control-label:before{color:#fff;border-color:#245ec7;background-color:#245ec7;}\n.custom-control-input:focus~.custom-control-label:before{box-shadow:0 0 0 .2rem rgba(36,94,199,.25);}\n.custom-control-input:disabled~.custom-control-label{color:#95a5a6;}\n.custom-control-input:disabled~.custom-control-label:before{background-color:#ecf0f1;}\n.custom-control-label{position:relative;margin-bottom:0;vertical-align:top;}\n.custom-control-label:before{pointer-events:none;background-color:#fff;border:1px solid #b4bcc2;}\n.custom-control-label:after,.custom-control-label:before{position:absolute;top:.1rem;left:-1.5rem;display:block;width:1rem;height:1rem;content:"";}\n.custom-control-label:after{background:50%/50% 50% no-repeat;}\n.custom-switch{padding-left:2.25rem;}\n.custom-switch .custom-control-label:before{left:-2.25rem;width:1.75rem;pointer-events:all;border-radius:.5rem;}\n.custom-switch .custom-control-label:after{top:calc(.1rem + 2px);left:calc(-2.25rem + 2px);width:calc(1rem - 4px);height:calc(1rem - 4px);background-color:#b4bcc2;border-radius:.5rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.custom-switch .custom-control-label:after{transition:none;}\n}\n.custom-switch .custom-control-input:checked~.custom-control-label:after{background-color:#fff;-webkit-transform:translateX(.75rem);transform:translateX(.75rem);}\n.custom-switch .custom-control-input:disabled:checked~.custom-control-label:before{background-color:rgba(36,94,199,.5);}\n.custom-control-label:before{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}\n@media (prefers-reduced-motion:reduce){\n.custom-control-label:before{transition:none;}\n}\n.mb-0{margin-bottom:0!important;}\n.mr-2{margin-right:.5rem!important;}\n.my-4{margin-top:1.5rem!important;}\n.my-4{margin-bottom:1.5rem!important;}\n.text-center{text-align:center!important;}\n@media print{\n*,:after,:before{text-shadow:none!important;box-shadow:none!important;}\n}\nlabel{font-size:.85rem;font-weight:500;}\n.main-button{background-color:#fff!important;color:#245ec7!important;border:1px solid #245ec7!important;border-radius:5px!important;font-weight:500;font-size:.75rem!important;min-width:80px;}\n.main-button.inverted{background-color:#245ec7!important;color:#fff!important;border:1px solid #245ec7!important;}\n.main-button.standar-big{min-width:250px;height:50px;}\n.main-button:hover{background-color:#245ec7!important;color:#fff!important;border:1px solid #245ec7!important;}\n.main-button:hover.inverted{background-color:#1e65e6!important;border:1px solid #1e65e6!important;}\n.main-button:disabled,.main-button:disabled:hover{background-color:#e2e7eb!important;color:#2c2e2f!important;border:1px solid #e2e7eb!important;}\n.main-button:active,.main-button:focus{outline:none!important;box-shadow:none!important;}\n@media (max-width:991px){\n.main-button{font-size:.7rem;}\n.main-button.standar-big{height:40px;width:250px;}\n}'
        }}
      />
      <div className="">
        <div className="asset-form-block my-4 form-group">
          <label htmlFor="assetName" className="">
            <span>Asset Name </span>
            <small className="asset-description">
              What is the name of your digital asset?
            </small>
          </label>
          <input
            id="assetName"
            name="assetName"
            placeholder="Tether"
            required=""
            type="text"
            
            aria-invalid="false"
            defaultValue=""
          />
          <div className="invalid-feedback">Asset Name Max size is 32 bytes</div>
        </div>
        <div className="asset-form-block my-4 form-group">
          <label htmlFor="unitName" className="">
            <span>Unit Name </span>
            <small className="asset-description">
              What Unit is associated with your asset?
            </small>
          </label>
          <input
            id="assetUnitName"
            name="assetUnitName"
            placeholder="USDt"
            type="text"
            
            aria-invalid="false"
            defaultValue=""
          />
          <div className="invalid-feedback">
            Asset Unit Name can not exceed 8 letters
          </div>
        </div>
        <div className="asset-form-block my-4 form-group">
          <div className="total-supply-label-container">
            <label htmlFor="totalSupply" className="">
              Total Supply *{" "}
            </label>
            <label htmlFor="assetDecimals" className="">
              Decimals *{" "}
            </label>
          </div>
          <div className="total-supply-container">
            <input
              id="totalSupply"
              name="assetTotal"
              placeholder={0}
              type="text"
              defaultValue={0}
              inputMode="numeric"
            />
            <div className="dot-supply">.</div>
            <input
              id="totalSupplyDecimals"
              name="totalSupplyDecimals"
              className="custom-input-size form-control  "
              placeholder={0}
              type="text"
              defaultValue=""
              inputMode="numeric"
            />
            <div
              name="assetDecimals"
              id="assetDecimals"
              className="frozen-dropdown  dropdown"
            >
              <button
                type="button"
                name="assetDecimals"
                value={0}
                aria-haspopup="true"
                aria-expanded="false"
                className="frozen-dropdown-toggle dropdown-toggle btn btn-secondary"
              >
                0
              </button>
              <div
                tabIndex={-1}
                role="menu"
                aria-hidden="true"
                className="decimal-dropdown dropdown-menu"
              >
                <button
                  type="button"
                  value={0}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  0
                </button>
                <button
                  type="button"
                  value={1}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  1
                </button>
                <button
                  type="button"
                  value={2}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  2
                </button>
                <button
                  type="button"
                  value={3}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  3
                </button>
                <button
                  type="button"
                  value={4}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  4
                </button>
                <button
                  type="button"
                  value={5}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  5
                </button>
                <button
                  type="button"
                  value={6}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  6
                </button>
                <button
                  type="button"
                  value={7}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  7
                </button>
                <button
                  type="button"
                  value={8}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  8
                </button>
                <button
                  type="button"
                  value={9}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  9
                </button>
                <button
                  type="button"
                  value={10}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  10
                </button>
                <button
                  type="button"
                  value={11}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  11
                </button>
                <button
                  type="button"
                  value={12}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  12
                </button>
                <button
                  type="button"
                  value={13}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  13
                </button>
                <button
                  type="button"
                  value={14}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  14
                </button>
                <button
                  type="button"
                  value={15}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  15
                </button>
                <button
                  type="button"
                  value={16}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  16
                </button>
                <button
                  type="button"
                  value={17}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  17
                </button>
                <button
                  type="button"
                  value={18}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  18
                </button>
                <button
                  type="button"
                  value={19}
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  19
                </button>
              </div>
            </div>
            <div className="error-total-supply invalid-feedback">
              Total asset supply must be a positive number and smaller than
              18,446,744,073,709,552,000
            </div>
          </div>
        </div>
        <div className="asset-form-block my-4 form-group">
          <label htmlFor="assetURL" className="">
            Asset URL
          </label>
          <input
            id="assetURL"
            name="assetURL"
            placeholder="https://www.algorand.com"
            type="text"
            
            aria-invalid="false"
            defaultValue=""
          />
          <div className="invalid-feedback">Asset Url Max size is 96 bytes.</div>
        </div>
        <div className="asset-form-block my-4 form-group">
          <label htmlFor="assetMetadataHash" className="">
            Metadata Hash
          </label>
          <input
            id="assetMetadataHash"
            name="assetMetadataHash"
            placeholder="32 characters | 32 base64 characters | 64 Hex characters"
            type="text"
            
            aria-invalid="false"
            defaultValue=""
          />
          <div className="invalid-feedback">
            Asset Metadata Hash size should be 32 characters, 32 base64 characters
            or 64 Hex characters
          </div>
        </div>
        <div className="asset-form-block mb-0 form-group">
          <label className="advanced-options opened">
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
        <div className="asset-form-block collapse show" style={{}}>
          <div className="asset-form-block my-4 form-group">
            <div className="label-switch">
              <label className="">Reserve Address:</label>
              <div className="permitted">
                <div className="big-switch custom-switch custom-control">
                  <input
                    type="checkbox"
                    id="toggleClawbackSwitch1"
                    name="toggleReserve"
                    className="custom-control-input"
                    defaultChecked=""
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="toggleClawbackSwitch1"
                  />
                </div>
              </div>
            </div>
            <input
              name="assetReserve"
              placeholder="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
              type="text"
              
              aria-invalid="false"
              defaultValue="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
            />
            <div className="invalid-feedback">Reserve Address is invalid</div>
          </div>
          <div className="asset-form-block my-4 form-group">
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
              placeholder="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
              type="text"
              
              aria-invalid="false"
              defaultValue="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
            />
            <div className="invalid-feedback">Manager Address is invalid</div>
          </div>
          <div className="asset-form-block  my-4 form-group">
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
              placeholder="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
              type="text"
              
              aria-invalid="false"
              defaultValue="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
            />
            <div className="invalid-feedback">Freeze Address is invalid</div>
          </div>
          <div className="asset-form-block my-4 form-group">
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
              placeholder="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
              type="text"
              
              aria-invalid="false"
              defaultValue="55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4"
            />
            <div className="invalid-feedback">Clawback Address is invalid</div>
          </div>
          <div className="asset-form-block  my-4 form-group">
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
          <div className="asset-form-block form-group">
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
              defaultValue={""}
            />
            <div className="invalid-feedback">
              Note can not exceed 1000 bytes.
            </div>
          </div>
        </div>
        <div className="text-center advanced-options-row my-4 form-group">
          <button
            type="button"
            className="main-button standar-big inverted btn btn-secondary"
          >
            Create Asset
          </button>
        </div>
      </div>
    </>
  )
  