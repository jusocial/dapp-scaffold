import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Network } from "../libs/types";


dayjs.extend(relativeTime);

export function fromTimestamp(timestamp: any): string {
  return dayjs.unix(Number(timestamp)).fromNow();
}


export const DataURIToByteString = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  let ia;
  // write the bytes of the string to a typed array
  ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return ia;
}

export const getEndpoint = () => {
  const isCustomEndpointEnabled = Boolean(localStorage.getItem("isCustomEndpointEnabled") === 'true');
  if (isCustomEndpointEnabled) {
    const endpoint = localStorage.getItem("endpoint");
    if (endpoint !== null) {
      return endpoint;
    } else {
      return clusterApiUrl('devnet')
    }
  } else {
    const currentNetwork = getNetwork();
    if (currentNetwork === 'localnet') {
      return 'http://localhost:8899'
    }
    return clusterApiUrl('devnet')
  }
}

export const getNetwork = (): Network => {
  const network = localStorage.getItem("network");
  return network as Network || 'devnet';
}

export const saveNetwork = (network: Network ) => {
  localStorage.setItem("network", network);
}


export const saveCustomRpcToStorage = (endpoint: string) => {
  localStorage.setItem("endpoint", endpoint);
}