const { ethers } = require("hardhat");

async function main() {
    // Get signers
    const [deployer] = await ethers.getSigners();
    console.log("signers"+ deployer.address);
    // Get contract
    const Counter = await ethers.getContractFactory("DocumentVerify");

    // Deploy the contract
    const counter = await Counter.deploy();
    await counter.deployed();
    console.log(`Contract address: ${counter.address}`);

    // Interact with the contract
    
    // const validAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    // let transaction= await counter.add("abcde",validAddress);
    // let receipt = await transaction.wait()
    // console.log(` After increment, counter value is: ${receipt.events[0].args[1].toNumber()}`)
    // transaction= await counter.getDocument(1);
    
    // console.log(` Docs hash ${transaction}`)
    // let countervalue=await counter.verifyDocument("abcde");
    // console.log('verify' + countervalue);
    

   

}   

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
