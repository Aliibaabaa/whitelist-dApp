//ethersJS - this used interact with the Smart contract
//ethers is included when you installed hardhat

const { ethers } = require("hardhat");

async function main() {
    /*
     A ContraFactory in ethers.js is an abstraction used to deplot new smart contracts, 
        so whitelistCOntract here is a factory for instances of our whitelist contract 
    */
    const whitelistContract = await ethers.getContractFactory("Whitelist");

    //handles deployment of the smart contract
    const deployedWhitelistContract = await whitelistContract.deploy(10);  //10 is the max number of whitelisted addresses in the constructor

    //wait for the deployment to be finished
    await deployedWhitelistContract.deployed();

    //console log the smart contract
    console.log(`Contract deployed to: ${deployedWhitelistContract.address}`);
}

main()
    .then(() => process.exit(0))
    //errors during deployment
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })

//Contract deployed to: 0xe540463Cefd96FfE13D97588680b177A6514b849