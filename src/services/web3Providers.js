/*
import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.ethereum != 'undefined') {
    
    try {
        // Request account access
            window.ethereum.enable()
        // We are in the browser and web3 provider has been injected (probably by Metamask)    
        // Issue: https://github.com/ethereum/web3.js/issues/2640
        // Use transactionConfirmationBlocks
        web3 = new Web3(window.ethereum, null, {transactionConfirmationBlocks: 1})
    } catch (error) {
        alert('Please, allow Metamask access to your account')
        
    }
} else if (typeof window !== 'undefined' && typeof window.web3 != 'undefined') {
    // Legacy purpose. Web3.provider is injected in window.ethereum 
    web3 = new Web3(window.web3.currentProvider);
} else {
    alert("Please, install metamask")
}

if(typeof web3 === 'undefined' )
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

var id = await web3.eth.net.getId();
console.log("NET ID: ", id);
if (id != process.env.VUE_APP_NETWORK_ID){
    web3 = null;
    console.log("Invalid Network:", id);
    alert("Invalid Network",id);
}

 export default web3;





 */