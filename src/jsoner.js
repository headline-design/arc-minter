import React, {useState} from "react";

const JSONer = (props) => {
  const [advancedOptions, setAdvancedOptions] = useState("none");
  const options = Object.keys(props.object);

  function dojsonstuff(key) {
    props.object[key] = document.getElementById("input" + key).value;
    props.callBack(props.object);
  }

  function remove(key) {
    delete props.object[key];
    props.callBack(props.object);
    let index = options.indexOf(key);
    delete options[index];
    let parent = document.getElementById("div" + key);
    parent.remove();
  }

  function toggle() {
    if (advancedOptions === "none") {
      setAdvancedOptions("block");
    } else {
      setAdvancedOptions("none");
    }
  }

  function createNew() {
    let key = document.getElementById("jsonerNew").value;
    if (key !== "") {
      if (!options.includes(key)) {
        props.object[key] = "new value";
        options.push(key);
        props.callBack(props.object);
        let child = document.createElement("div");
          child.innerHTML = '<div class="field-row" id="div' +
            key +
            '"><input disabled value="' +
            key +
            '"><input id="input' +
            key +
            '"><button class="MuiButton-root field-btn-change plus-circle-icon" id="' +
            key +
            '"></button><button class="MuiButton-root field-btn-delete delete-icon" name="' +
            key +
            '" id="delete' +
            key +
            '"></button></div>';
        let parent = document.getElementById("options");
        parent.appendChild(child);
        document.getElementById(key).onclick = function (event) {
          dojsonstuff(event.target.id);
        };
        document.getElementById("delete" + key).onclick = function (event) {
          remove(event.target.name);
        };
      } else {
        alert("Key already exists!");
      }
    } else {
      alert("enter a key value knucklehead!");
    }
  }

  return (
    <div>
      <div className="accordion">
                          <div className="accordion-header">
                            <div className="jss16">
                              <label
                                className="advanced-options "
                                onClick={toggle}
                              >
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
                                Advanced Editor
                                <hr />
                              </label>
                            </div>

                            <div>
                              <div
                                className="asset-form-block collapse show"
                                style={{ display: advancedOptions }}
                              >
                             
                                <div className="jss16">
                                <label htmlFor="sm-url">
    JSON Editor <span>(optional)</span>
  </label>
   <div className="card-border">
      <div id="options">
        <div className="field-row">
         <input className="disabled-field" disabled value="key"/>
         <input className="disabled-field" disabled value="value"/>
         <button className={"MuiButton-root field-btn-change disabled-field"}>Change</button>
         <button className={"MuiButton-root field-btn-delete disabled-field"}>Delete</button>
         </div>
        {Object.keys(props.object).map((key, index) => {
          return (
            <div
                key={`FieldRowItemKey_${index}`}
                className="field-row"
                id={"div" + key}>
              
              <input value={key} disabled></input>
              <input id={"input" + key}></input>
              <button
                className={"MuiButton-root field-btn-change save-icon"}
                id={key}
                onClick={(event) => {
                  dojsonstuff(event.target.id);
                }}
              >
                
              </button>
              <button
                className={"MuiButton-root field-btn-delete delete-icon"}
                name={key}
                onClick={(event) => {
                  remove(event.target.name);
                }}
              >
                
              </button>
            </div>
          );
        })}
      </div>
      <div className="grid">
        <input id="jsonerNew"
        placeholder="New key"></input>
        <button
          className={"MuiButton-root field-btn-create plus-icon"}
          onClick={createNew}
        >
          
        </button>
      </div>
    </div>
                                  
                                 
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
  
    </div>
  );
};

export default JSONer;
