


const JSONer = (props) => {
  const options = Object.keys(props.object)

  function dojsonstuff(key) {
    props.object[key] =
      document.getElementById("input" + key).value;
    props.callBack(props.object);
  }

  function remove(key){
    delete props.object[key]
    props.callBack(props.object);
    let index = options.indexOf(key)
    delete options[index]
    let parent = document.getElementById("div" + key)
    parent.remove()

  }

  function createNew() {
    let key = document.getElementById("jsonerNew").value
    if (key !== ""){
    if (!options.includes(key)) {
      props.object[key] = "new value";
      options.push(key);
      props.callBack(props.object);
      let child = document.createElement("div");
      let html =
        '<div id="div' + key +  '"><input disabled value="' +
        key +
        '"></input><input id="input' +
        key +
        '"></input><button id="' + key + '">Change</button><button name="' + key + '" id="delete' + key + '">Delete</button></div>';
      child.innerHTML = html;
      let parent = document.getElementById("options");
      parent.appendChild(child);
      document.getElementById(key).onclick = function(event){dojsonstuff(event.target.id)}
      document.getElementById("delete" + key).onclick = function(event){remove(event.target.name)}
    } else {
      alert("Key already exists!");
    }
  }
  else{
    alert("enter a key value knucklehead!")
  }
  }

  return (
    <div>
      <input id="jsonerNew"></input>
      <button onClick={createNew}>Create New Field</button>
      <div id="options">
        {Object.keys(props.object).map((key) => {
          return (
            <div id={"div" + key}>
              <input value={key} disabled></input>
              <input id={"input" + key}></input>
              <button
                id={key}
                onClick={(event) => {
                  dojsonstuff(event.target.id);
                }}
              >
                Change
              </button>
              <button  name={key} onClick={(event) => {remove(event.target.name)}}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JSONer;
