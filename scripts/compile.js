const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');

const compiledFolderPath = path.resolve(__dirname, '../src/contracts/compiled');
fs.removeSync(compiledFolderPath);
fs.ensureDirSync(compiledFolderPath);

const campaignPath = path.resolve(__dirname, '../src/contracts/Campaign.sol');
const campaignSource = fs.readFileSync(campaignPath, 'utf-8');

const campaignFactoryPath = path.resolve(__dirname, '../src/contracts/CampaignFactory.sol');
const campaignFactorySource = fs.readFileSync(campaignFactoryPath, 'utf-8');

const compilerInput = JSON.stringify({
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: campaignSource,
    },
    'CampaignFactory.sol': {
      content: campaignFactorySource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode.object'],
      },
    },
  },
});

const { contracts } = JSON.parse(solc.compile(compilerInput));

for (let contract in contracts) {
  const currentContract = contracts[contract];
  const contractName = contract.split('.')[0];

  fs.outputJSONSync(
    path.resolve(compiledFolderPath, `${contractName}.json`),
    currentContract[contractName]
  );
}
