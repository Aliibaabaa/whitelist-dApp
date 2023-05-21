import './App.css';
import web3modal from 'web3modal';
import { providers, Contract } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { WHITELIST_CONTRACT_ADDRESS, abi } from './constants';

function App() {
  //1. initialize variables
  const [walletConnected, setWalletConnected] = useState(false);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberOfWhitelisted, setnumberOfWhitelisted] = useState(0);

  const web3modal = useRef();

  //2. declare functions we can call inside the return statement

  //this function returns provider or signer if needed.
  const getProviderOrSigner =
    async (needSigner = false) => {
      const provider = await web3modal.current.connect(); //eth wallet injects information to the webpage.
      const web3Provider = new providers.Web3Provider(provider); //ask user if they want to connect wallet
      const { chainId } = await web3Provider.getNetwork();  //ask user to connect this certain network

      if (chainId !== 80001) {
        window.alert("Change to network Mumbai.");
        throw new Error("Change network to Mumbai.");
      }

      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    }

  //function to add wallet address to the whitelist
  const addAddressToWhitelist = async () => {
    try {
      //we need a signer, so let's call getProviderOrSigner function
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);
      await tx.wait();
      setLoading(false);

      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch (error) {
      console.error(error);
    }
  }

  //function to get the number of whitelisted
  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();

      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider //provider => abi => whitelist_contract_address => getNumberofWhitelisted => bring back client side
      );

      const _numberOfWhitelisted = await whitelistContract.numAddressWhitelisted();
      setnumberOfWhitelisted(_numberOfWhitelisted);
    } catch (error) {
      console.error(error);
    }
  }

  //function to check if address is already in whitelist
  const checkIfAddressInWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const address = await signer.getAddress();
      const _joinedWhitelist = await Contract.whitelistAddresses(address);
      setJoinedWhitelist(_joinedWhitelist);

    } catch (error) {
      console.error(error);
    }
  }

  //function to connect wallet
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);

      //checkIfAddressInWhitelist();
      getNumberOfWhitelisted();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>

    </>
  );
}

export default App;
