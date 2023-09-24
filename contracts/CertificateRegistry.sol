// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    address public owner;

    struct Certificate {
        bool isVerified;
        address issuer;
    }

    mapping(string => Certificate) public certificatesByHash;

    event CertificateIssued(string certificateHash, address issuer);
    event CertificateVerified(string certificateHash, bool isVerified, address issuer);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function issueCertificate(string memory certificateHash, address issuerAddress) public onlyOwner {
        certificatesByHash[certificateHash] = Certificate(true, issuerAddress); // Issue with the specified issuer's address
        emit CertificateIssued(certificateHash, issuerAddress);
    }

    function verifyCertificate(string memory certificateHash) public {
        if (certificatesByHash[certificateHash].isVerified == false) {
            emit CertificateVerified(certificateHash, false, certificatesByHash[certificateHash].issuer);
        } else {
            emit CertificateVerified(certificateHash, true, certificatesByHash[certificateHash].issuer);
        }
    }
}

// Add a deploy function for Hardhat
contract CertificateRegistryDeployer {
    CertificateRegistry public certificateRegistry;

    constructor() {
        certificateRegistry = new CertificateRegistry();
    }
}
