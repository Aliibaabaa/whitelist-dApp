// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0; 

contract Whitelist {
    //max number of whitelisted address allowed
    uint8 public maxWhitelistAddresses;

    //Create a mapping of whitelistedAddresses
    //if an address is whitelisted, we would set it to true, it is false by default for all other addresses ; 
    mapping(address => bool) public whitelistAddresses;

    //tracks num if whitelisted addresses (counter)
    uint8 public numAddressWhitelisted; // = 0

    //Setting the max number of whitelisted address
    //user will put the value at the time of deployment
    constructor(uint8 _maxWhitelistAddresses){
        maxWhitelistAddresses = _maxWhitelistAddresses;
    }

    // addAddressToWhitelist - This function adds the address of the sender to the whitelist
    function addAddressToWhitelist() public {
        //check if the user had already been whitelisted -- (require(not false[address], if false display this))
        require(!whitelistAddresses[msg.sender], "Sender has already been whitelisted"); //---if false, it wil check not whitelisted addresses

        //check if the numAddressesWhitelisted < maxWhitelistedAddresses, if not then throw an error
        require(maxWhitelistAddresses > numAddressWhitelisted, "Cannot add more addresses." );

        //add the address whivh called the function to the whitelistedAddress mapping
        whitelistAddresses[msg.sender] = true;
        //increase number of whitelisted addresses for us to know if we already reached the cap/max
        numAddressWhitelisted++;
    }

}   