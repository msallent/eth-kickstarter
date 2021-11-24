import { web3 } from './web3';
import { AbiItem } from 'web3-utils';
import CampaignFactory from '../contracts/compiled/CampaignFactory.json';

export const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi as Array<AbiItem>,
  '0xa88594a41C5275F64c43Fec0260621A44Cf9140a'
);
