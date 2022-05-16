const JSONer = (props) => {
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

  function createNew() {
    let key = document.getElementById("jsonerNew").value;
    if (key !== "") {
      if (!options.includes(key)) {
        props.object[key] = "new value";
        options.push(key);
        props.callBack(props.object);
        let child = document.createElement("div");
        let html =
          '<div class="field-row" id="div' +
          key +
          '"><input disabled value="' +
          key +
          '"></input><input id="input' +
          key +
          '"></input><button class="MuiButton-root field-btn-change" id="' +
          key +
          '"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddCircleIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg></button><button class="MuiButton-root field-btn-delete" name="' +
          key +
          '" id="delete' +
          key +
          '"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button></div>';
        child.innerHTML = html;
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
        return;
      }
    } else {
      alert("enter a key value knucklehead!");
    }
  }

  return (
   <>
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
        {Object.keys(props.object).map((key) => {
          return (
            <div 
            className="field-row"
            id={"div" + key}>
              
              <input value={key} disabled></input>
              <input id={"input" + key}></input>
              <button
                className={"MuiButton-root field-btn-change"}
                id={key}
                onClick={(event) => {
                  dojsonstuff(event.target.id);
                }}
              >
<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SaveIcon"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>              </button>
              <button
                className={"MuiButton-root field-btn-delete"}
                name={key}
                onClick={(event) => {
                  remove(event.target.name);
                }}
              >
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
              </button>
            </div>
          );
        })}
      </div>
      <div className="grid">
        <input id="jsonerNew"
        placeholder="New key"></input>
        <button
          className={"MuiButton-root field-btn-create"}
          onClick={createNew}
        >
          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
        Add Key
        </button>
      </div>
    </div>
    </>
  );
};

export default JSONer;
