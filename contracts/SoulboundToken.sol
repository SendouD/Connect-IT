// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


import "hardhat/console.sol";

contract SoulboundToken is ERC721, Ownable {
   

    uint256 private _nextTokenId;

    constructor()
        ERC721("SoulboundToken", "SBT")
        Ownable(msg.sender)
    {
        _nextTokenId=1;
    }
   

    function safeMint(address to) public{
        
   
        console.log("in safemint");
        uint256 tokenId = _nextTokenId++;
        console.log(tokenId);
        _safeMint(to, tokenId);
    }

    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }
      function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
  
   

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        revert("This token is non-transferable");
    }
}
