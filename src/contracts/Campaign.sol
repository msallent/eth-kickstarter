// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Campaign {
    struct Request {
        uint256 value;
        bool isComplete;
        uint256 approvals;
        string description;
        address payable recipient;
        mapping(address => bool) approvers;
    }

    address public manager;
    uint256 public totalRequests;
    uint256 public totalContributors;
    uint256 public minimumContribution;
    mapping(uint256 => Request) public requests;
    mapping(address => bool) public contributors;

    modifier restricted() {
        require(msg.sender == manager, 'Sender is not the manager');
        _;
    }

    constructor(address _manager, uint256 _minimumContribution) {
        manager = _manager;
        minimumContribution = _minimumContribution;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, 'Contribution is too low');

        if (!contributors[msg.sender]) {
            contributors[msg.sender] = true;
            totalContributors++;
        }
    }

    function createRequest(
        uint256 value,
        string memory description,
        address payable recipient
    ) public restricted {
        Request storage request = requests[totalRequests++];
        request.value = value;
        request.approvals = 0;
        request.isComplete = false;
        request.recipient = recipient;
        request.description = description;
    }

    function approveRequest(uint256 requestIndex) public {
        Request storage request = requests[requestIndex];

        require(contributors[msg.sender], 'Sender is not a contributor');
        require(!request.approvers[msg.sender], 'Sender has already approved this request');

        request.approvers[msg.sender] = true;
        request.approvals++;
    }

    function finalizeRequest(uint256 requestIndex) public restricted {
        Request storage request = requests[requestIndex];

        require(!request.isComplete, 'Request has already been complete');
        require(request.approvals > (totalContributors / 2), 'Request needs more approvals');

        request.isComplete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            totalRequests,
            totalContributors,
            manager
        );
    }
}
