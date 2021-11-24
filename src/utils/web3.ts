import Web3 from 'web3';

let provider;
const isClient = typeof window !== 'undefined';
const isMetaMaskLoaded = isClient && typeof window.ethereum !== 'undefined';

if (isMetaMaskLoaded) {
  window.ethereum.request({ method: 'eth_requestAccounts' });
  provider = window.ethereum;
} else {
  provider = new Web3.providers.HttpProvider(process.env.TESTNET_ENDPOINT || '');
}

export const web3 = new Web3(provider);
