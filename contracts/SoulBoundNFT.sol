// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulBoundNFT is ERC721, Ownable {
    constructor() ERC721("SoulBoundNFT", "SBN") {}

    // Mapping to store certificate hashes associated with NFT token IDs
    mapping(uint256 => bytes32) private certificateHashes;

    // Event to log when a new NFT with a certificate is minted
    event MintWithCertificate(address indexed to, uint256 tokenId, bytes32 certificateHash);

    // Function to mint a new NFT with a certificate
    function mintWithCertificate(address to, uint256 tokenId, bytes32 certificateHash) external onlyOwner {
        _mint(to, tokenId);
        certificateHashes[tokenId] = certificateHash;
        emit MintWithCertificate(to, tokenId, certificateHash);
    }

    // Function to verify the authenticity of a certificate for a given token ID
    function verifyCertificate(uint256 tokenId, bytes32 certificateHash) external view returns (bool) {
        return certificateHash == certificateHashes[tokenId];
    }
}
