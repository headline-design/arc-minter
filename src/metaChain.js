import React, { useState} from 'react'
import Pipeline from '@pipeline-ui-2/pipeline'
import { Grid } from '@material-ui/core/';
import NFTCard2 from './NFTCard2';
import NFTFetch3 from './NFTFetch3';

Pipeline.main = false

const fetchAndParse = async (txid) => {
    let url =
      'https://algoindexer.testnet.algoexplorerapi.io/v2/transactions/'

    let indexTxn = await fetch(url + txid);
    let indexJSON = await indexTxn.json();
    let arg = window.atob(indexJSON.transaction['application-transaction']["application-args"][1])
    return arg
  }
  
  const MetaViewer = () => {
      const [txIds, setTxIds] = React.useState ("")
      const [size, setSize] = React.useState ("")
      const getVoteInfo = async () => {
        //usage: getVoteInfo(appAddressTesting).then(data => console.log(data))
        //change url for MainNet
    
        let indexTxn = ""
    
        let appId = parseInt(document.getElementById("appId").value)
    
        let appState = await Pipeline.readGlobalState(appId)
    
        appState.forEach(item => {
          if (item.key === "aW5kZXg="){
            indexTxn = window.atob(item.value.bytes)
          }
        })
    
        console.log(indexTxn)
    
        let info = []
        let length = 0
    
        let firstArg = await fetchAndParse(indexTxn)
    
        firstArg = firstArg.split("~")
    
        length = firstArg[3]
        setSize(length + " KB")
        let nextTxid = firstArg[4]
    
        for (let index = 0; index < length; index++){
          let nextArg = await fetchAndParse(nextTxid)
          if (index < length - 1){
            let thisLength = nextArg.length
            nextTxid = nextArg.slice(thisLength - 52, thisLength)
            setTxIds(nextTxid )
            info.push(nextArg.replace(nextTxid,""))
          }
          else{
            info.push(nextArg)
          }
        }
        info = info.reverse()
        document.getElementById("html-block").innerHTML = info.join("")
        // eval(info.join(""))
        
      }
return (
    <div>
    <main className="jss65">
      <div className="MuiContainer-root jss57 MuiContainer-maxWidthLg">
        <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
          <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
            <h1 id="connected" className="jss66">
              MetaChain
            </h1>
            <h6 className="MuiTypography-root MuiTypography-subtitle1">
                    On-chain data sharding has arrived <br>
                    </br><i>(Testnet only)</i>
                  </h6>
            <div id="not-connected"></div>
          </div>
          <Grid item xs={12} sm={4} md={3}>
            <NFTFetch3 
            onClick={getVoteInfo}
            txIds={txIds}
            fileSize={size}>
            </NFTFetch3>
          </Grid>
          <NFTCard2
          />
        </div>
      </div>
    </main>
         </div>
  )}

  export default MetaViewer