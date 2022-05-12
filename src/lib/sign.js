import Pipeline from '@pipeline-ui-2/pipeline'
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import algosdk from 'algosdk'

export async function sign(mytxnb, group = false, signed = []) {

    console.log(mytxnb)
    let signedTxn = ""

    if (Pipeline.pipeConnector === "myAlgoWallet") {
        if (!group) {
            signedTxn = await Pipeline.wallet.signTransaction(mytxnb.toByte())
            signedTxn = signedTxn.blob;
            return signedTxn

        }
        else {
            signedTxn = await Pipeline.wallet.signTransaction(mytxnb.map(txn => txn.toByte()))
            let txnsb = []
            signedTxn.forEach(item => {
                txnsb.push(item.blob)
            })
            return txnsb
        }
    }
    else {

        let txns = []
        if (!group) {
            txns[0] = mytxnb
        }
        else {
          txns = mytxnb
        }

        console.log("Unencoded txns:")
        console.log(txns)

        /*
                let prototxn = {
                    "amt": mytxnb.amount,
                    "fee": 1000,
                    "fv": mytxnb.lastRound - 1000,
                    "gen": mytxnb.genesisID,
                    "gh": new Uint8Array(Buffer.from(mytxnb.genesisHash, 'base64')),
                    "lv": mytxnb.lastRound,
                    "note": mytxnb.note,
                    "rcv": new Uint8Array(base32.decode.asBytes(mytxnb.to).slice(0, 32)),
                    "snd": new Uint8Array(base32.decode.asBytes(Pipeline.address).slice(0, 32)),
                    "type": "pay"
                }
        
                let prototxnASA = {};
                let prototxnb = encode(prototxn);
                let txns = [];
                txns[0] = prototxnb;
        
                if (Pipeline.index !== 0) {
                    prototxnASA = {
                        "aamt": mytxnb.amount,
                        "arcv": new Uint8Array(base32.decode.asBytes(mytxnb.to).slice(0, 32)),
                        "fee": 1000,
                        "fv": mytxnb.lastRound - 1000,
                        "gen": mytxnb.genesisID,
                        "gh": new Uint8Array(Buffer.from(mytxnb.genesisHash, 'base64')),
                        "lv": mytxnb.lastRound,
                        "note": mytxnb.note,
                        "snd": new Uint8Array(base32.decode.asBytes(Pipeline.address).slice(0, 32)),
                        "type": "axfer",
                        "xaid": parseInt(mytxnb.assetIndex)
                    }
                    prototxnb = encode(prototxnASA);
                    txns[0] = prototxnb;
                }
                
                        console.log(prototxnb)
                        console.log(new TextDecoder().decode(prototxnb))
                        console.log(JSON.stringify(decode(prototxnb)))
                */
        // Sign transaction

        let txnsToSign = txns.map(txnb => {

            let packed = algosdk.encodeUnsignedTransaction(txnb)
            let encodedTxn = Buffer.from(packed).toString("base64")

            if (Pipeline.pipeConnector === "WalletConnect") {
                return {
                    txn: encodedTxn,
                    message: "",
                    // Note: if the transaction does not need to be signed (because it's part of an atomic group
                    // that will be signed by another party), specify an empty singers array like so:
                    // signers: [],
                };
            }
            else {
                return { txn: encodedTxn }
            }
        });

        if (group && signed.length !== 0){
            for (let i = 0; i< signed.length; i++){
                txnsToSign[i].Signers = []
            }
        }

        let requestParams = [txnsToSign]
        console.log("TXNs to Sign:")
        console.log(requestParams)

        if (Pipeline.pipeConnector === "WalletConnect") {

            let request = formatJsonRpcRequest("algo_signTxn", requestParams)
    
            //request.id = Pipeline.chainId

            console.log(request);

            try {
                let result = await Pipeline.connector.sendCustomRequest(request);

                return result
            }
            catch (error) { console.log(error) }
        }
        else {
            try {
                
                    let result = await window.AlgoSigner.signTxn(requestParams)

                    return result
            }
            catch (error) { console.log(error) }
        }
    }
}