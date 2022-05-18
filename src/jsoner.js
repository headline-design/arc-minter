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
          '"></input><button class="MuiButton-root field-btn-change plus-circle-icon" id="' +
          key +
          '"></button><button class="MuiButton-root field-btn-delete delete-icon" name="' +
          key +
          '" id="delete' +
          key +
          '"></button></div>';
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
    <div>
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
  );
};

export default JSONer;
