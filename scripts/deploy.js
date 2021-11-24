const path = require('path');
const Web3 = require('web3');
const dotenv = require('dotenv');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const CampaignFactory = require('../src/contracts/compiled/CampaignFactory.json');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const provider = new HDWalletProvider(process.env.MNEMONIC_PHRASE, process.env.TESTNET_ENDPOINT);
const web3 = new Web3(provider);

(async () => {
  const [account] = await web3.eth.getAccounts();

  const contract = await new web3.eth.Contract(CampaignFactory.abi)
    .deploy({ data: CampaignFactory.evm.bytecode.object })
    .send({ from: account, gas: '3000000' });

  console.log(`Contract deployed to: ${contract.options.address}`);

  provider.engine.stop();
})();
