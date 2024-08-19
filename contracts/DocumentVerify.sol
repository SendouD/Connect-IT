// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/SoulboundToken.sol";  
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract DocumentVerify is Ownable,AccessControl {
     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct Document {
        uint256 tokenId;
        string hash;
        uint256 dateAdded;
    } 
        event docadded(uint256 date, uint256 tokenId);


    SoulboundToken token;
    Document[] private documents;
    mapping (string => address) private hashToOwner;
    mapping (uint256 => mapping(address=>string)) private tokenToOwnertohash;
    

    constructor(SoulboundToken _token) Ownable(msg.sender) {
        token = _token;
    }



     function GrantMinterAccess(address minter) public onlyOwner{
         _grantRole(MINTER_ROLE, minter);
    }
    

    function add(string memory hash, address to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        uint256 currentTime = block.timestamp;
        uint256 tokenId = token.getNextTokenId() ;
        Document memory doc = Document(tokenId,hash, currentTime);
        console.log("add called");
        
        
        
         // Get the current token ID before it is incremented
         tokenToOwnertohash[tokenId][to]=hash;

        hashToOwner[hash] = to;
       
        documents.push(doc);
        token.safeMint(to); 

  // Map the token ID to the owner address
        emit docadded(currentTime,tokenId);

    }

    function getDocument(uint256 tokenId) public view returns (string memory hash) {
       
       
    require(msg.sender == token.ownerOf(tokenId), "You are not the owner");
     console.log(tokenId);
      console.log(msg.sender);
    string memory hashvalue=tokenToOwnertohash[tokenId][msg.sender];
    return hashvalue;
}

    function verifyDocument(string memory hash) public view returns (bool) {
        return hashToOwner[hash] != address(0);
    }
}

