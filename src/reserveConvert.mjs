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
    let bytes = algosdk.decodeAddress(address)
    console.log(hex)
  }
  
  algotoHex(testAddress)