pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        string name;
        uint votes;
    }
    Candidate[] public candidates;
    address owner;
    string public position;
    mapping (bytes32 => bool) public voters;
    uint public votingEndDateTime;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory candidateName) public onlyOwner {
        candidates.push(Candidate({
                name: candidateName,
                votes: 0
        }));
    }

    function vote(uint candidateIndex) public {
        require(!voters[keccak256(abi.encodePacked(msg.sender))], "You have already voted.");
        require(candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[candidateIndex].votes++;
        voters[keccak256(abi.encodePacked(msg.sender))] = true;
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp < votingEndDateTime);
    }
}
