import { useState } from "react";

function Tabs() {
  const [active, setActive] = useState(home);
  // const home=()=>(<p>This is home</p>)
  // const about=()=>(<p>This is about</p>)
  // const profile=()=>(<p>This is profile</p>)
  function home() {
    return <p>This is home</p>;
  }
  function docs() {
    return <p>This is about</p>;
  }
  function profile() {
    return <p>This is profile</p>;
  }

  return (
    <div>
      <div onClick={() => setActive(home)}>Home</div>
      <div onClick={() => setActive(docs)}>Docs</div>
      <div onClick={() => setActive(profile)}>profile</div>
      <div>{active}</div>
    </div>
  );
}

export default Tabs