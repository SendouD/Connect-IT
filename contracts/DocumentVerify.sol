// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/SoulboundToken.sol";  
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract DocumentVerify is Ownable,AccessControl {
     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct Document {
        string hash;
        uint256 dateAdded;
    } 
        event docadded(uint256 date, uint256 tokenId);


    SoulboundToken token;
    Document[] private documents;
    mapping (string => address) private hashToOwner;
    mapping (uint256 => address) private tokenToOwner;

    constructor(SoulboundToken _token) Ownable(msg.sender) {
        token = _token;
    }



     function GrantMinterAccess(address minter) public onlyOwner{
         _grantRole(MINTER_ROLE, minter);
    }
    

    function add(string memory hash, address to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        uint256 currentTime = block.timestamp;
        Document memory doc = Document(hash, currentTime);
        console.log("add called");
        
        
        console.log("hii");
        uint256 tokenId = token.getNextTokenId() ; // Get the current token ID before it is incremented

        hashToOwner[hash] = to;

        documents.push(doc);
        token.safeMint(to); 


        tokenToOwner[tokenId] = to;  // Map the token ID to the owner address
        emit docadded(currentTime,tokenId);

    }

    function getDocument(uint256 tokenId) public view returns (string memory hash, uint256 dateAdded) {
    require(msg.sender == token.ownerOf(tokenId), "You are not the owner");
    
    address owner = tokenToOwner[tokenId];
    require(owner != address(0), "Token ID does not exist");

    // Iterate over the documents to find the one associated with the token ID
    for (uint256 i = 0; i < documents.length; i++) {
        if (hashToOwner[documents[i].hash] == owner) {
            return (documents[i].hash, documents[i].dateAdded);
        }
    }

    revert("Document not found for the given token ID");
}

    function verifyDocument(string memory hash) public view returns (bool) {
        return hashToOwner[hash] != address(0);
    }
}
