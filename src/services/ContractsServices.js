import { FAMToken, FAMAsset, Pool, Store, NFT } from '../assets'
import Vue from 'vue'

import web3 from './web3Providers'
import moment from 'moment'

import Web3 from 'web3';
import { BN } from "web3-utils";

//let web3 = new Web3(new Web3.providers.HttpProvider(“http://localhost:9545"))
//const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const FAM_TOKEN_ADDRESS = "0xeaaf21DBAD3a90Bb8d2dD6D623cA906dd40B7C54";
const FAM_ASSET_ADDRESS=  "0x7CE17D3c0ECAe4e53504aAB74bC49a8187a32124";
const POOL_ADDRESS=  "0xe8CAFA7Aca9ED059311d91A62eFb42390a93c241";
const STORE_ADDRESS = "0xB0fF680B6a37DD5b5DFFf8dc18AE71f35A632eE3";

const NUM_ASSET_TYPES = NFT.length;


class ContractsServices {
     constructor() {
        Vue.$log.debug("constructor ContractsServices");
        this.famTokenContract = new web3.eth.Contract(FAMToken.abi, FAM_TOKEN_ADDRESS);
        this.famAssetContract = new web3.eth.Contract(FAMAsset.abi, FAM_ASSET_ADDRESS);
        this.poolContract = new web3.eth.Contract(Pool.abi, POOL_ADDRESS);
        this.storeContract = new web3.eth.Contract(Store.abi, STORE_ADDRESS);
        
        this.NFTs = NFT;
        this.prices = {};
        this.powers = {};
      }


    async getPrice(id){
        if(!Object.prototype.hasOwnProperty.call(this.prices,id)){
            const accounts = await web3.eth.getAccounts()
            var price = await this.storeContract.methods.priceNft(id).call({from: accounts[0]})
            this.prices[id] = web3.utils.fromWei(price);
            Vue.$log.debug("getPrice ", price)
        }
        return this.prices[id];  
     }
    async getPower(id){
        if(!Object.prototype.hasOwnProperty.call(this.powers,id)){
            const accounts = await web3.eth.getAccounts()
            var power = (await this.famAssetContract.methods.assets(id).call({from: accounts[0]}))[2];
            this.powers[id] = power;
            Vue.$log.debug("getPower ", power)
        }
        return this.powers[id];  
     }
    async getMaxAmountAllowedNft(id){
        const accounts = await web3.eth.getAccounts();
        var maxAmount = await this.storeContract.methods.maxAmountAllowedNft(id).call({from: accounts[0]});
        Vue.$log.debug("getMaxAmountAllowedNft ", id, maxAmount);
        return maxAmount;
    }
    async getFactorWeiToken(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.storeContract.methods.factorWeiToken().call({from: accounts[0]});
        Vue.$log.debug("getFactorWeiToken ", value);
        return value; 
    }
    async getMinedNft(id){
        const accounts = await web3.eth.getAccounts();
        var mined = await this.storeContract.methods.minedNft(id).call({from: accounts[0]});
        Vue.$log.debug("getMinedNft ", id, mined);
        return mined;
    }
    getNFTs() {return this.NFTs}
    getAllPowerOfAssets(){
        return this.NFTs;
    }

    async getBalanceOfFamToken() {
        var balanceWei = 0;
        try {
            const accounts = await web3.eth.getAccounts()
            let balance = await this.famTokenContract.methods.balanceOf(accounts[0]).call({from: accounts[0]})
            Vue.$log.debug('getBalanceOfFamToken ', accounts[0], balance)
            balanceWei = web3.utils.fromWei(balance)
        } catch(e) {
            Vue.$log.debug(e);
        }
        return balanceWei;
    }

    async getBalanceETH() {
        const accounts = await web3.eth.getAccounts()
        let amount = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
        Vue.$log.debug('getBalanceETH', amount);
        return amount;
    }
    // FAM Asset
    async getBalanceOfFamAsset() {
        const accounts = await web3.eth.getAccounts()
        const accountsData = Array(NUM_ASSET_TYPES).fill(accounts[0])
        const keysData = Array.from(Array(NUM_ASSET_TYPES).keys())
        Vue.$log.debug('getBalanceOfFamAsset Request', accountsData, keysData);
        let batch = await this.famAssetContract.methods.balanceOfBatch(accountsData, keysData).call({from: accounts[0]})
        Vue.$log.debug('getBalanceOfFamAsset Response', batch);
        var response = [];
        for(let i=0;i<batch.length;i++){
            response.push({
                id: i,
                number: batch[i],
            })
        }
        return response;
    }
    async transferAssetToPool(idAssets, numAssets){

        const accounts = await web3.eth.getAccounts()
        
        Vue.$log.debug('transferAssetToPool ', idAssets, numAssets, accounts[0], POOL_ADDRESS)
        let response = await this.famAssetContract.methods.safeBatchTransferFrom(accounts[0], POOL_ADDRESS, idAssets, numAssets, 0).send({from: accounts[0],gas:3000000})
        Vue.$log.debug(response)

        return response.status
    }

    // POOL
    async getAssetInPool() {
        //getUserNumberAsset(address addr, uint256 assetType) public view returns(uint256)

        const accounts = await web3.eth.getAccounts()
        const accountsData = Array(NUM_ASSET_TYPES).fill(accounts[0])
        const keysData = Array.from(Array(NUM_ASSET_TYPES).keys())
        var batch = []
        Vue.$log.debug('getAssetInPool ', accountsData, keysData)
        for(let i=0; i<accountsData.length;i++){
            batch.push(await this.poolContract.methods.getUserNumberAsset(accountsData[i], keysData[i]).call({from: accounts[0]}))
        }
        Vue.$log.debug(response)
        
        var response = [];
        for(let i=0;i<batch.length;i++){
            response.push({
                id: i,
                number: batch[i],
            })
        }
        return response;
    }

    async getStimateRewardPool() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("getStimateRewardPool ", accounts[0] )
        var response = await this.poolContract.methods.stimateReward().call({from: accounts[0]})
        Vue.$log.debug(response)
        var balanceWei = web3.utils.fromWei(response)
        return balanceWei;
    }

    async getUserInfo() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("getUserInfo ", accounts[0] )
        var response = await this.poolContract.methods.getUserInfo(accounts[0]).call({from: accounts[0]})
        Vue.$log.debug("getUserInfo", response);
        return response[0];
    }

    async claimFromPool() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("claimFromPool ", accounts[0] )
        var response = await this.poolContract.methods.claim().send({from: accounts[0], gas:3000000})
        Vue.$log.debug(response)
        return response.status;
    }

    async retrieveFromPool(idAssets, numAssets) {
    //function retrieve(uint256[] memory _ids, uint256[] memory _values) public nonReentrant {
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("retrieveFromPool ", idAssets, numAssets)
        var response = await this.poolContract.methods.retrieve(idAssets, numAssets).send({from: accounts[0], gas:3000000})
        Vue.$log.debug(response)
        return response.status;
    }

    async getPriceFromStore(){
        var response = {}
        const accounts = await web3.eth.getAccounts()
        for(let i=0; i<this.NFTs.length;i++){
            var price = await this.storeContract.methods.priceNft(this.NFTs[i].id).call({from: accounts[0]})
            response[this.NFTs[i].id] = web3.utils.fromWei(price);
        }
        Vue.$log.debug("getPriceFromStore ", response)
        return response   
    }

    async approveTransferToStore(amount){  
        const accounts = await web3.eth.getAccounts()
        let amountWei = web3.utils.toWei(new BN(amount));
        Vue.$log.debug("approveTransferToStore ", amount)
        Vue.$log.debug("approveTransferToStore ", amountWei.toString())
        await this.famTokenContract.methods.approve(STORE_ADDRESS,amountWei).send({from: accounts[0], gas:3000000})
    } 
    async buyBatchFromStore(ids, amounts){  
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug(ids,amounts)
        let response = await this.storeContract.methods.buyBatchNft(ids, amounts).send({from: accounts[0], gas:3000000})
        return response.status
    }
    async buyTokens(etherAmount){
        const accounts = await web3.eth.getAccounts()
        let amountsWei = web3.utils.toWei(etherAmount)
        let response = await this.storeContract.methods.buyTokens().send({from: accounts[0], gas:3000000,value: amountsWei})
        return response.status
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