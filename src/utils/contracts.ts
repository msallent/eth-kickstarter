import { web3 } from './web3';
import { AbiItem } from 'web3-utils';
import Campaign from '../contracts/compiled/Campaign.json';
import CampaignFactory from '../contracts/compiled/CampaignFactory.json';

export const getCampaign = (address: string) => {
  return new web3.eth.Contract(Campaign.abi as Array<AbiItem>, address);
};

export const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi as Array<AbiItem>,
  '0x44d2B2D66ADb2d6CBE89072aBc756306A4766d2C'
);
