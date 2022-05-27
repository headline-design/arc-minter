import React, { Component } from "react";
import Pipeline from '@pipeline-ui-2/pipeline'; //change to import Pipeline from 'Pipeline for realtime editing Pipeline index.js, and dependency to: "Pipeline": "file:..",
import { Navbar, Container, Nav, Col, Row, Button, Form } from 'react-bootstrap';
import NFTViewer from "./NFTViewer"
import NftFetch from "./NftFetch";
import Header from "./Header";
import AlgorandWalletConnector from "./AlgorandWalletConnector";
const asaData = {
  creator: "",
  note: "Hello",
  amount: 25000000000,
  decimals: 6,
  assetName: "HDLb",
  unitName: "HDLb"
}

//change recipient address before sending transaction
const recipient = "LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4";

const myAlgoWallet = Pipeline.init();

//amount in micro Algos
const amount = 0;

const note = "test note";

//0 = Algorand, otherwise index number of asset
const index = 0;

//set to false to switch to TestNet
Pipeline.main = true;

var mynet = (Pipeline.main) ? "MainNet" : "TestNet";

const tealNames = ["Permissionless Voting", "Permissioned Voting"]

const tealContracts = {
  "Permissioned Voting": {},
  "Permissionless Voting": {}
}

async function getContracts() {
  for (let i = 0; i < tealNames.length; i++) {
    let name = tealNames[i]
    let data = await fetch("teal/" + name + ".txt")
    tealContracts[name].program = await data.text()
    let data2 = await fetch("teal/" + name + " clear.txt")
    tealContracts[name].clearProgram = await data2.text()
    let data3 = await fetch("teal/" + name + " front.txt")
    tealContracts[name].front = await data3.text()
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      net: mynet,
      txID: "",
      myAddress: "",
      balance: 0
    }
  }
  /* test wallet : NIN73GEWDWBU3HHEPGWGIQZMOITN4PU3YVTKMR3ESI7DCH5ME4E5TLB4XU*/
  componentDidMount() {
    getContracts()
  }

  fetchBalance = () => {
    Pipeline.balance(this.state.myAddress).then(
      data => {
        this.setState({ balance: data });
      }
    );
  }

  handleConnect = () => {
    Pipeline.connect(myAlgoWallet).then(
      data => {
        this.setState({ myAddress: data });
        asaData.creator = data
        console.log(asaData)
      }
    );
  }

  handleSend = () => {
    Pipeline.send(recipient, amount, note, this.state.myAddress, myAlgoWallet, index).then(
      data => {
        this.setState({ txID: data });
      }
    );
  }

  createAsa = () => {
    Pipeline.createAsa(asaData).then(data => {
      document.getElementById("assetId").value = data
    })
  }

  switchConnector = (event) => {
    Pipeline.pipeConnector = event.target.value
    console.log(Pipeline.pipeConnector)
  }

  deploy = async () => {
    let permissioned = document.getElementById("check").checked
    if (permissioned) {
      this.modifyTeal()
    }
    let name = permissioned ? "Permissioned Voting" : "Permissionless Voting"

    let lastRound = await Pipeline.getParams()
    lastRound = lastRound["last-round"]

    Pipeline.deployTeal(tealContracts[name].program, tealContracts[name].clearProgram, [1, 1, 0, 6], [lastRound, lastRound + 10000, lastRound, lastRound + 10000]).then(data => { document.getElementById("appid").value = data })
  }

  delete = async () => {
    Pipeline.deleteApp(document.getElementById("appid").value).then(data => {
      this.setState({ txID: data })
    })
  }

  optIn = async () => {
    let args = []
    if (document.getElementById("check").checked) { args.push("register") }
    Pipeline.optIn(document.getElementById("appid").value, args).then(data => { this.setState({ txID: data }) })
  }

  vote = async () => {
    if (!document.getElementById("check").checked) {
      Pipeline.appCall(document.getElementById("appid").value, ["vote", "candidateb"]).then(
        data => {
          this.setState({ txID: data })
        }
      )
    }
    else {

      let appId = document.getElementById("appid").value
      let ASA = document.getElementById("assetId").value

      Pipeline.getAppCreator(appId).then(
        data => {
          Pipeline.appCallWithTxn(appId,
            ["vote", "candidateb"], data, 1, undefined, ASA
          ).then(data => { this.setState({ txID: data }) })
        }
      )
    }
  }

  modifyTeal = () => {
    let assetId = document.getElementById("assetId").value
    let search1 = "// hard-coded assetid\nint 2";
    let search2 = "// hard coded and should be changed\nint 2"
    let replacements = [search1, search2]

    for (let i = 0; i < 2; i++) {
      tealContracts["Permissioned Voting"].program = tealContracts["Permissioned Voting"].program.replace(replacements[i], "// hard-coded assetid\nint " + assetId)
      console.log(tealContracts["Permissioned Voting"].program)

    }
  }

  checkVote = async () => {
    Pipeline.readGlobalState(document.getElementById("appid").value).then(
      data => {
        let keyIndex = ""
        for (let i = 0; i < data.length; i++) {
          let thisKey = window.atob(data[i].key)
          if (thisKey === "candidateb") {
            keyIndex = i;
          }
        }
        if (keyIndex !== "") {
          alert("Candidateb Votes: " + data[keyIndex].value.uint)
        }
        else {
          alert("No votes for candidate b cast yet")
        }
      })
  }

  render() {
    return (
      <>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Algorand Portfolio Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>

              </Nav>
            </Navbar.Collapse>

            <Form.Select aria-label="Default select example" onChange={this.switchConnector} size="sm" style={{ width: "150px", marginRight: "20px" }}>
              <option>myAlgoWallet</option><option>WalletConnect</option><option>AlgoSigner</option>
            </Form.Select>
            <Button variant="primary" onClick={this.handleConnect} size="sm">{
              (this.state.myAddress === "") ? "Connect" : "Connected"
            }</Button>
          </Container>
        </Navbar>

        <Container>
        <NftFetch />
      
        </Container>
        <Container>
          <Row>
            <Col>
              <h2>{this.state.net}</h2>
            </Col>

          </Row>

          <Row><Col><p>{"Connected Address: " + this.state.myAddress}</p><br></br></Col></Row>
        </Container>


        {/* <div>
        <h1>Edit the code to make things happen!</h1>
        <h2>{this.state.net}</h2>
        <select onChange={this.switchConnector}><option>myAlgoWallet</option><option>WalletConnect</option><option>AlgoSigner</option></select><br></br>
        <button onClick={this.handleConnect}>Click to Connect</button><br></br>
        <button onClick={this.handleSend}>Click to Send Transaction</button><br></br>
        <button onClick={this.fetchBalance}>Click to check balance</button><br></br>
        <h1>ASA's and Contracts</h1>
        <button onClick={this.createAsa}>Click to Create an Asset</button><br></br>
        <input id="assetId" type="number" placeholder="assetId"></input>
        <br></br><br></br>
        Permissioned?<input id="check" type="checkbox" ></input><br></br>
        <button onClick={this.deploy}>Deploy Contract</button>
        <button onClick={this.delete}>Delete App</button>
        <button onClick={this.optIn}>Opt In</button>
        <button onClick={this.vote}>Vote for Candidate B</button>
        <button onClick={this.checkVote}>Check Vote</button>
        <input placeholder="App Id" id="appid" type="number"></input>
        <p>{"Connected Address: " + this.state.myAddress}</p><br></br>
        <p>{"Balance: " + this.state.balance}</p><br></br>
        <p>{"Transaction ID: " + this.state.txID}</p><br></br>
      </div> */}
      </>
    );
  }
}

export default App;