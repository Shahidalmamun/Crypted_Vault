import {ethers} from 'ethers';
import { BrowserProvider } from './../../node_modules/ethers/lib.esm/providers/provider-browser';
import contractAbi from '../constants/contractAbi.json';
import toast from 'react-hot-toast';

export const  connectWallet = async () => {

    try {
        if(!window.ethereum) {
        throw new Error("MetaMask is not installed");
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    
    const selectedAccount = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = "0x900Ba2190f71d10FC67783A35A4482Dbc1DcCf25";
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

    return {
        selectedAccount,
        contractInstance
    }
    } 
    catch (error) {
        toast.error("Error connecting to wallet: " + error.message);
        console.error("Error connecting to wallet:", error);
    }

    
}