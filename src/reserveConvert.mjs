import algosdk from 'algosdk'
import { CID } from "multiformats/cid";
import {binary_to_base58} from 'base58-js'

let testAddress = "TRXTZKAR2MQOVEJ6EIIT7UGHDMLTGWMQSLGYUMZOBN2SVB7DE724NYSJGM"

function toHexString(byteArray) {
  let hexString = Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");

  return hexString
}
  
  function algotoHex (address){
    let account = algosdk.decodeAddress(address)
    let hexAddress = toHexString(account.publicKey)

    console.log(hexAddress)
    return new CID('f' +'01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a').toString('base32')
  }
  
  console.log(algotoHex(testAddress))