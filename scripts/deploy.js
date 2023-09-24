const { ethers } = require("hardhat");

async function main() {
  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  const certificateRegistry = await CertificateRegistry.deploy();

  await certificateRegistry.deployed();

  console.log(`CertificateRegistry deployed to address: ${certificateRegistry.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
// 0x5fbdb2315678afecb367f032d93f642f64180aa3