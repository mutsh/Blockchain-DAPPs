
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public voters;
    Candidate[] public candidates;
    bool public votingActive;

    event Voted(address voter, uint candidateIndex);
    event VotingStarted();
    event VotingEnded();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], voteCount: 0}));
        }
    }

    function startVoting() public onlyOwner {
        votingActive = true;
        emit VotingStarted();
    }

    function endVoting() public onlyOwner {
        votingActive = false;
        emit VotingEnded();
    }

    function vote(uint candidateIndex) public {
        require(votingActive, "Voting is not active");
        require(!voters[msg.sender], "You have already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");

        voters[msg.sender] = true;
        candidates[candidateIndex].voteCount++;

        emit Voted(msg.sender, candidateIndex);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
