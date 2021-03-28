import { FAMToken, FAMAsset, Pool, NFT } from '../assets'

//import Web3 from './web3'
import moment from 'moment'

import Web3 from 'web3';
//let web3 = new Web3(new Web3.providers.HttpProvider(“http://localhost:9545"))
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const FAM_TOKEN_ADDRESS = "0xBDF0c491877efb66c9D981EBb1004E91B9Cc62eC";
const FAM_ASSET_ADDRESS=  "0x244c2CAF715AFDd3E90dD0460f02639ac6670d50";
const POOL_ADDRESS=  "0x24B8EcF7BA7346ad33610A422f62B97B9dCc8164";

const NUM_ASSET_TYPES =NFT.length;


class ContractsServices {
    constructor() {
        this.famTokenContract = new web3.eth.Contract(FAMToken.abi, FAM_TOKEN_ADDRESS);
        this.famAssetContract = new web3.eth.Contract(FAMAsset.abi, FAM_ASSET_ADDRESS);
        this.poolContract = new web3.eth.Contract(Pool.abi, POOL_ADDRESS);
      }
    getNFTMetaData = function() {return NFT}
    getBalanceOfFamToken = async function() {
        var balanceWei = 0;
        try {
            const accounts = await web3.eth.getAccounts()
            let balance = await this.famTokenContract.methods.balanceOf(accounts[0]).call({from: accounts[0]})
            console.log('getBalanceOfFamToken ', accounts[0], balance)
            balanceWei = web3.utils.fromWei(balance)
        } catch(e) {
            console.log(e);
        }
        return balanceWei;
    }
    // FAM Asset
    getBalanceOfFamAsset = async function() {
        const accounts = await web3.eth.getAccounts()
        const accountsData = Array(NUM_ASSET_TYPES).fill(accounts[0])
        const keysData = Array.from(Array(NUM_ASSET_TYPES).keys())
        
        console.log('getBalanceOfFamAsset ', accountsData, keysData)
        let batch = await this.famAssetContract.methods.balanceOfBatch(accountsData, keysData).call({from: accounts[0]})
        console.log(batch)
        var response = [];
        for(let i=0;i<batch.length;i++){
            response.push({
                id: i,
                number: batch[i],
            })
        }
        return response;
    }
    transferAssetToPool = async function(idAssets, numAssets){

        const accounts = await web3.eth.getAccounts()
        
        console.log('transferAssetToPool ', idAssets, numAssets, accounts[0], POOL_ADDRESS)
        let response = await this.famAssetContract.methods.safeBatchTransferFrom(accounts[0], POOL_ADDRESS, idAssets, numAssets, 0).send({from: accounts[0],gas:3000000})
        console.log(response)

        return response
    }

    // POOL
    getAssetInPool = async function() {
        //getUserNumberAsset(address addr, uint256 assetType) public view returns(uint256)

        const accounts = await web3.eth.getAccounts()
        const accountsData = Array(NUM_ASSET_TYPES).fill(accounts[0])
        const keysData = Array.from(Array(NUM_ASSET_TYPES).keys())
        var batch = []
        console.log('getAssetInPool ', accountsData, keysData)
        for(let i=0; i<accountsData.length;i++){
            batch.push(await this.poolContract.methods.getUserNumberAsset(accountsData[i], keysData[i]).call({from: accounts[0]}))
        }
        console.log(response)
        
        var response = [];
        for(let i=0;i<batch.length;i++){
            response.push({
                id: i,
                number: batch[i],
            })
        }
        return response;
    }

    getStimateRewardPool = async function() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        console.log("getStimateRewardPool ", accounts[0] )
        var response = await this.poolContract.methods.stimateReward().call({from: accounts[0]})
        console.log(response)
        var balanceWei = web3.utils.fromWei(response)
        return balanceWei;
    }

    getPowerInPool = async function() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        console.log("getPowerInPool ", accounts[0] )
        var response = await this.poolContract.methods.getUserInfo(accounts[0]).call({from: accounts[0]})
        console.log(response)
        return response[0];
    }

    claimFromPool = async function() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        console.log("claimFromPool ", accounts[0] )
        var response = await this.poolContract.methods.claim().send({from: accounts[0]})
        console.log(response)
        return response;
    }

    retrieveFromPool = async function(idAssets, numAssets) {
    //function retrieve(uint256[] memory _ids, uint256[] memory _values) public nonReentrant {
        const accounts = await web3.eth.getAccounts()
        console.log("retrieveFromPool ", idAssets, numAssets)
        var response = await this.poolContract.methods.retrieve(idAssets, numAssets).send({from: accounts[0], gas:3000000})
        console.log(response)
        return response;
    }


    

    createContract = async function () {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }

        //const accounts = await web3.eth.getAccounts()
        const contract = await new web3.eth.Contract(JSON.parse(FAMToken), FAM_TOKEN_ADDRESS)
        return contract
    }

    getBalance = async function (address, unit) {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }
        const balance = await web3.eth.getBalance(address)

        return web3.utils.fromWei(balance, unit)
    }

    pay = async function (address, reference, amount) {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }

        let error
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(JSON.parse(FAMToken), address)
            const value = web3.utils.toWei(String(amount), 'ether')
            await contract.methods.pay(reference, value).send({from: accounts[0], value: value})
        } catch (e) {
            error = e.message
        }

        return error
    }

    withdraw = async function (address) {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }

        let error
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(JSON.parse(FAMToken), address)
            await contract.methods.withdraw().send({from: accounts[0]})
        } catch (e) {
            error = e.message
        }

        return error
    }

    getPaymentsOfAccount = async function(address, account, unit) {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(JSON.parse(FAMToken), address)
        const count = await contract.methods.paymentsOf(account).call()
        const payments = await Promise.all(
            Array(parseInt(count))
            .fill()
            .map( async (el, index) => {
                const payment = await contract.methods.paymentOfAt(account, index).call()
                const amount = (!payment[1])?'': web3.utils.fromWei(payment[1], unit)
                const date = (!payment[2])?'': moment(payment[2], 'X').format('YYYY-MM-DDTHH:mm:ss')
                return {
                    reference: payment[0],
                    amount: amount,
                    date: date
                }
            })
        )
        return payments
    }

    getNetwork = async function() {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }
        const network = web3.currentProvider.networkVersion
        switch(network) {
            case '1':
                return 'Mainnet'
            case '2': 
                return 'Morden'
            case '3':
                return 'Ropsten'
            case '4':
                return 'Rinkeby'
            case '42':
                return 'Kovan'
            default:
                return 'Unknown'
        }
    }

    getLoggedAccount = async function() {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }
        const accounts = await web3.eth.getAccounts()

        return (accounts && accounts.length>0)?accounts[0]: undefined
    }
}

export default ContractsServices