// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract DocumentVerify is Ownable {

    struct Document {
        string hash;
        uint256 dateAdded;
    }
    event docadded(uint256 date,uint256 tokenID);

    Document[] private documents;
    mapping (string => uint256) private indexes;
    uint256 private tokenID;
    mapping (uint256 => address) private tokenToOwner;

    constructor() Ownable() {
        tokenID = 0;
    }

    function add(string memory hash, address to) public onlyOwner  {
        uint256 currentTime = block.timestamp;
        Document memory doc = Document(hash, currentTime);
        tokenID++;
        tokenToOwner[tokenID] = to;
        indexes[hash] = tokenID;
        

        documents.push(doc);
        console.log("donee");
        emit docadded(currentTime,tokenID);
    }

    function getDocument(uint256 index) public view returns (string memory hash, uint256 dateAdded) {
        require(msg.sender == tokenToOwner[index], "You are not the owner");
        Document memory document = documents[index - 1];
        console.log("hii");
        return (document.hash, document.dateAdded);
    }

    function verifyDocument(string memory hash) public view returns (bool) {
        return indexes[hash] != 0;
    }
}
