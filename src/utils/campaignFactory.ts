import { web3 } from './web3';
import { AbiItem } from 'web3-utils';
import CampaignFactory from '../contracts/compiled/CampaignFactory.json';

export const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi as Array<AbiItem>,
  '0x6ac7401c0F505FA7Be18b58b62D9E6B6d192197f'
);
