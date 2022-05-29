// @ts-nocheck
import algosdk, { LogicSigAccount, Transaction, TransactionType } from 'algosdk'
import base32 from 'hi-base32';
import nacl from 'tweetnacl';
import {sign} from './sign'
import Pipeline from '@pipeline-ui-2/pipeline'



import escrow_template from './contracts/escrow.tmpl.teal'
import {SessionWallet} from "algorand-session-wallet";

const wallet = Pipeline.init()

export const conf = {
    seeder: "55TOUZSM6AOK7PCUT7O5SWYSNUDDGTOEGQQBKZPX32I6RPAAW4KUSI56C4",
    network: "MainNet",
    algod : {
        host : "https://algoexplorerapi.io",
        port : "",
        token : "",
    }
}

const client = new algosdk.Algodv2(conf.algod.token, conf.algod.host , conf.algod.port)

interface SignedTxn {
    txID: string,
    blob: Uint8Array
}

export interface NFT {
    id: number
    url: string
    name: string
}

export async function collect(sw: SessionWallet, asaId: number, escrow: string, addr: string, secret: string): Promise<SignedTxn[]> {

    const claimer = Pipeline.address

    const lsig = await getLsig(addr)

    const sp = await client.getTransactionParams().do()

    const optinTxn = new Transaction({
        from:claimer,
        to:claimer,
        assetIndex: asaId,
        type:TransactionType.axfer,
        amount:0,
        ...sp
    })

    const xferTxn = new Transaction({
        from:escrow,
        to:claimer,
        assetIndex: asaId,
        type:TransactionType.axfer,
        amount:0,
        closeRemainderTo: claimer,
        ...sp
    }) 

    const closeTxn = new Transaction({
        from:escrow,
        to:conf.seeder,
        type:TransactionType.pay,
        amount:0,
        closeRemainderTo: conf.seeder,
        ...sp
    })

    const grouped = [optinTxn, xferTxn, closeTxn]

    algosdk.assignGroupID(grouped)

    lsig.lsig.args = [createSignature(xferTxn.txID(), escrow, secret)]

    const s_xfer = algosdk.signLogicSigTransactionObject(xferTxn, lsig)
    const s_close = algosdk.signLogicSigTransactionObject(closeTxn, lsig)

    //const [s_optin, /*xfer*/ , /*close*/] = await sw.signTxn(grouped)

    let myAlgo = (Pipeline.pipeConnector === "myAlgoWallet")?true:false

    let arg1 = myAlgo?optinTxn:[optinTxn, xferTxn, closeTxn]
    let arg2 = !myAlgo
    let arg3 = myAlgo?[]:[1,2]

    if(!myAlgo){alert("Close this alert then sign in your official Algorand Wallet")}

    let s_optin = await sign(arg1,arg2,arg3)

    console.log("TXN signed by wallet:")

    console.log(s_optin)

    if (myAlgo){
        return [{blob: s_optin},s_xfer,s_close]
    }
    else{
        return [{blob: new Uint8Array(Buffer.from(s_optin[0], "base64"))},s_xfer,s_close]
    }
}

function createSignature(txid: string, escrow: string, secret: string): Uint8Array {
    const pd    = Buffer.from("ProgData")
    const addr  = algosdk.decodeAddress(escrow).publicKey
    const btxid = base32.decode.asBytes(txid)

    const toSign = new Uint8Array(pd.length + addr.length + btxid.length)
    toSign.set(pd, 0)
    toSign.set(addr, pd.length)
    toSign.set(btxid, pd.length + addr.length)

    const sk = Buffer.from(secret, "base64")
    return nacl.sign.detached(toSign, sk);
}

export async function getNFT(asaId: number): Promise<NFT> {
    const asa = await client.getAssetByID(asaId).do()
    const p = asa['params']

    // Assumes ipfs:// protocol
    const cid = p['url'].split("://")
    const url = "https://ipfs.io/ipfs/"+cid[1]
    
    return { id:   asaId, url:  url, name: p['name']} as NFT
}

export async function getAsaId(escrow: string): Promise<number> {
    const ai = await client.accountInformation(escrow).do()
    if(ai['assets'].length !== 1) throw Error("Expected 1 ASA for "+escrow+" got: "+ai['assets'].length.toString())
    return ai['assets'][0]['asset-id']
}

async function getLsig(addr: string): Promise<LogicSigAccount> {
    const addrHex   = "0x"+Buffer.from(algosdk.decodeAddress(addr).publicKey).toString("hex")

    const tmpl      = await get_file(escrow_template)
    const src       = tmpl.replace("TMPL_GEN_ADDR", addrHex)

    const compiled  = await client.compile(src).do()

    return new LogicSigAccount(Buffer.from(compiled['result'], "base64"))
}

async function get_file(program: string): Promise<string> {
    return await fetch(program)
        .then(response => checkStatus(response) && response.arrayBuffer())
        .then(buffer => {
            const td = new TextDecoder()
            return td.decode(buffer)
        }).catch(err => {
            console.error(err)
            return ""
        });
}

function checkStatus(response: Response) {
    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    return response;
}

// Send transactions to the network 
export async function sendWait(signed: SignedTxn[]): Promise<any> {
    const {txId}  = await client.sendRawTransaction(signed.map((t)=>{return t.blob})).do()
    const result = await waitForConfirmation(client, txId, 3)
    return result 
}

async function waitForConfirmation(algodclient: algosdk.Algodv2, txId: string, timeout: number): Promise<any> {
    if (algodclient == null || txId == null || timeout < 0) {
      throw new Error('Bad arguments.');
    }

    const status = await algodclient.status().do();
    if (typeof status === 'undefined')
      throw new Error('Unable to get node status');

    const startround = status['last-round'] + 1;
    let currentround = startround;
  
    /* eslint-disable no-await-in-loop */
    while (currentround < startround + timeout) {
      const pending = await algodclient
        .pendingTransactionInformation(txId)
        .do();

      if (pending !== undefined) {
        if ( pending['confirmed-round'] !== null && pending['confirmed-round'] > 0) 
          return pending;
  
        if ( pending['pool-error'] != null && pending['pool-error'].length > 0) 
          throw new Error( `Transaction Rejected pool error${pending['pool-error']}`);
      }

      await algodclient.statusAfterBlock(currentround).do();
      currentround += 1;
    }

    /* eslint-enable no-await-in-loop */
    throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
}
