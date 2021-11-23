// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './Campaign.sol';

contract CampaignFactory {
    address[] campaigns;

    function createCampaign(uint256 minimumContribution) public {
        address campaign = address(new Campaign(msg.sender, minimumContribution));
        campaigns.push(campaign);
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}
