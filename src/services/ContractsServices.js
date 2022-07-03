import { IngotToken, IngotNFT, IngotFarm, Store, PrivateSale,MasterChef, NFT, ERC20 } from '../assets'
import Vue from 'vue'

//import web3 from './web3Providers'
import moment from 'moment'

import Web3 from 'web3';
import { BN } from "web3-utils";

import Swal from 'sweetalert2'

//let web3 = new Web3(new Web3.providers.HttpProvider(“http://localhost:9545"))
//const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const INGOT_TOKEN_ADDRESS = process.env.VUE_APP_INGOT_TOKEN_ADDRESS;
const INGOT_NFT_ADDRESS= process.env.VUE_APP_INGOT_NFT_ADDRESS;
const INGOT_FARM_ADDRESS= process.env.VUE_APP_INGOT_FARM_ADDRESS;
const STORE_ADDRESS= process.env.VUE_APP_STORE_ADDRESS;
const PRIVATE_SALE_ADDRESS= process.env.VUE_APP_PRIVATE_SALE_ADDRESS;

const INGOT_FARM_LP_ADDRESS= process.env.VUE_APP_INGOT_FARM_LP_ADDRESS;
const INGOT_LP_ADDRESS= process.env.VUE_APP_INGOT_LP_ADDRESS



const CONTRACT_IS_DEPLOYED = (process.env.VUE_APP_CONTRACT_DEPLOYED === 'true');

const NUM_ASSET_TYPES = NFT.length;

var web3;

class ContractsServices {
     
    constructor() {
        Vue.$log.debug("constructor");
        this.NFTs = NFT;
        this.prices = {};
        this.powers = {};
        this.IngotTokenContract = null;
        this.IngotNFTContract = null;
        this.IngotFarmContract = null;
        this.storeContract = null;
        this.privateSaleContract = null;
        this.IngotFarmLPContract = null;
      }

    _initContracts(){
        if(!CONTRACT_IS_DEPLOYED) return;
        Vue.$log.debug("initContracts");
        this.IngotTokenContract = new web3.eth.Contract(IngotToken.abi, INGOT_TOKEN_ADDRESS);
        this.IngotNFTContract = new web3.eth.Contract(IngotNFT.abi, INGOT_NFT_ADDRESS);
        this.IngotFarmContract = new web3.eth.Contract(IngotFarm.abi, INGOT_FARM_ADDRESS);
        this.storeContract = new web3.eth.Contract(Store.abi, STORE_ADDRESS);
        this.privateSaleContract = new web3.eth.Contract(PrivateSale.abi, PRIVATE_SALE_ADDRESS);
        this.IngotFarmLPContract = new web3.eth.Contract(MasterChef.abi, INGOT_FARM_LP_ADDRESS);
        this.IngotLP = new web3.eth.Contract(ERC20.abi, INGOT_LP_ADDRESS);
        

      }
    async getPrice(id){
            const accounts = await web3.eth.getAccounts()
            var price = await this.storeContract.methods.priceNFT(id).call({from: accounts[0]})
            Vue.$log.debug("getPrice ", price)
        
        return web3.utils.fromWei(price);  
     }
    async getAssetPowerBatch(ids){
            const accounts = await web3.eth.getAccounts()
            var powers = (await this.IngotNFTContract.methods.assetPowerBatch(ids).call({from: accounts[0]}));
            Vue.$log.debug("getPower ", powers)
        
        return powers.map(p=> Number(p));  
     }
    async getAssetMaxMintingBatch(ids){
        const accounts = await web3.eth.getAccounts();
        var maxAmount = await this.IngotNFTContract.methods.assetMaxMintingBatch(ids).call({from: accounts[0]});
        Vue.$log.debug("getAssetMaxMintingBatch ", ids, maxAmount);
        return maxAmount.map(p=> Number(p));  
    }
    // privateSaleContract
    async buyTokens(etherAmount){
        const accounts = await web3.eth.getAccounts()
        let amountsWei = web3.utils.toWei(etherAmount)
        let response = await this.privateSaleContract.methods.buyTokens().send({from: accounts[0],value: amountsWei})
        return response.status
    }
    async getFactorWeiToken(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.RATIO_WEI_TOKEN().call({from: accounts[0]});
        Vue.$log.debug("getFactorWeiToken ", value);
        return value; 
    }
    async getweiRaised(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.weiRaised().call({from: accounts[0]});
        Vue.$log.debug("getweiRaised ", value);
        return value; 
    }
    async getisPrivateSale(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.isPrivateSale().call({from: accounts[0]});
        Vue.$log.debug("getisPresale ", value);
        return value; 
    }
    async getEthCap(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.ETH_CAP().call({from: accounts[0]});
        Vue.$log.debug("getEthCap ", value);
        return value; 
    }
    async getEthCapUser(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.MAX_ETH_USER().call({from: accounts[0]});
        Vue.$log.debug("getEthCapUser ", value);
        return value; 
    }
    async getMinEthUser(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.MIN_ETH_USER().call({from: accounts[0]});
        Vue.$log.debug("getMinEthUser ", value);
        return value; 
    }
    async getEthCapUserCurrent(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.privateSaleContract.methods.users(accounts[0]).call({from: accounts[0]});
        Vue.$log.debug("getEthCapUser ", value);
        return value; 
    }

    async getisStoreOpen(){
        const accounts = await web3.eth.getAccounts();
        var value = await this.storeContract.methods.isStoreOpen().call({from: accounts[0]});
        Vue.$log.debug("getisStoreOpen ", value);
        return value; 
    }
    async getAssetCurrMintingBatch(ids){
        const accounts = await web3.eth.getAccounts();
        var mineds = await this.IngotNFTContract.methods.assetCurrMintingBatch(ids).call({from: accounts[0]});
        Vue.$log.debug("getAssetCurrMintingBatch ", ids, mineds);
        return mineds.map(p=> Number(p));  
    }
    
    getNFTs() {return this.NFTs}
    getAllPowerOfAssets(){
        return this.NFTs;
    }

    async getBalanceOfIngotToken() {
        var balanceWei = 0;
        try {
            const accounts = await web3.eth.getAccounts()
            let balance = await this.IngotTokenContract.methods.balanceOf(accounts[0]).call({from: accounts[0]})
            Vue.$log.debug('getBalanceOfIngotToken ', accounts[0], balance)
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
    async getBalanceOfINGOTAsset() {
        const accounts = await web3.eth.getAccounts()
        const accountsData = Array(NUM_ASSET_TYPES).fill(accounts[0])
        const keysData = Array.from(Array(NUM_ASSET_TYPES).keys())
        Vue.$log.debug('getBalanceOfINGOTAsset Request', accountsData, keysData);
        let batch = await this.IngotNFTContract.methods.balanceOfBatch(accountsData, keysData).call({from: accounts[0]})
        Vue.$log.debug('getBalanceOfINGOTAsset Response', batch);
        var response = [];
        for(let i=0;i<batch.length;i++){
            response.push({
                id: i,
                number: Number(batch[i]),
            })
        }
        return response;
    }
    async transferAssetToPool(idAssets, numAssets){

        const accounts = await web3.eth.getAccounts()
        
        Vue.$log.debug('transferAssetToPool ', idAssets, numAssets, accounts[0], INGOT_FARM_ADDRESS)
        let response = await this.IngotNFTContract.methods.safeBatchTransferFrom(accounts[0], INGOT_FARM_ADDRESS, idAssets, numAssets, 0).send({from: accounts[0]})
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
            batch.push(await this.IngotFarmContract.methods.getUserNumberAsset(accountsData[i], keysData[i]).call({from: accounts[0]}))
        }
        Vue.$log.debug(response)
        
        var response = [];
        for(let i=0;i<batch.length;i++){
            response.push({
                id: i,
                number: Number(batch[i]),
            })
        }
        return response;
    }

    async getPendingReward() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("getPendingReward ", accounts[0] )
        var response = '0';
        try{
            response = await this.IngotFarmContract.methods.pendingReward().call({from: accounts[0]})
            Vue.$log.debug(response)
        }catch(e){
            Vue.$log.debug(e)
        }
        var balanceWei = web3.utils.fromWei(response)
        return balanceWei;
    }

    async getUserInfo() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("getUserInfo ", accounts[0] )
        var response = await this.IngotFarmContract.methods.getUserInfo(accounts[0]).call({from: accounts[0]})
        Vue.$log.debug("getUserInfo", response);
        return response[0];
    }

    async claimFromPool() {
        //stimateReward(address addr) public view returns(uint256){
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("claimFromPool ", accounts[0] )
        var response = await this.IngotFarmContract.methods.claim().send({from: accounts[0]})
        Vue.$log.debug(response)
        return response.status;
    }

    async getPoolShare() {
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("getPoolShare ", accounts[0] )
        var response = await this.IngotFarmContract.methods.rewardInfo().call({from: accounts[0]});
        Vue.$log.debug(response)
        return response[2];
    }

    async getRewardForBlockFarm() {
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("getRewardForBlockFarm ", accounts[0] )
        var response = await this.IngotFarmContract.methods.rewardForBlock().call({from: accounts[0]});
        Vue.$log.debug(response);
        return response;
    }

    async retrieveFromPool(idAssets, numAssets) {
    //function retrieve(uint256[] memory _ids, uint256[] memory _values) public nonReentrant {
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("retrieveFromPool ", idAssets, numAssets)
        var response = await this.IngotFarmContract.methods.retrieve(idAssets, numAssets).send({from: accounts[0]})
        Vue.$log.debug(response)
        return response.status;
    }

    async getPriceFromStore(){
        var response = {}
        const accounts = await web3.eth.getAccounts()
        for(let i=0; i<this.NFTs.length;i++){
            var price = await this.storeContract.methods.priceNFT(this.NFTs[i].id).call({from: accounts[0]})
            response[this.NFTs[i].id] = Number(web3.utils.fromWei(price));
        }
        Vue.$log.debug("getPriceFromStore ", response)
        return response   
    }

    async approveTransferToStore(amount){  
        const accounts = await web3.eth.getAccounts()
        let amountWei = web3.utils.toWei(new BN(amount));
        Vue.$log.debug("approveTransferToStore ", amount)
        Vue.$log.debug("approveTransferToStore ", amountWei.toString())
        let response = await this.IngotTokenContract.methods.approve(STORE_ADDRESS,amountWei).send({from: accounts[0]});
        return response.status;
    }
    
    async buyBatchFromStore(ids, amounts){  
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("buyBatchFromStore", ids,amounts)
        let response = await this.storeContract.methods.buyBatchNft(ids, amounts).send({from: accounts[0]})
        Vue.$log.debug("buyBatchFromStore", response)
        return response.status
    }

    // MasterChef LP

    async approveMaxToFarmLP(){  
        const accounts = await web3.eth.getAccounts()
        let amountWei = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        Vue.$log.debug("approveMaxToFarmLP ", amountWei)
        let response = await this.IngotLP.methods.approve(INGOT_FARM_LP_ADDRESS,amountWei).send({from: accounts[0]});
        return response.status;
    }

    async depositToFarmLP(pid, amount){  
        const accounts = await web3.eth.getAccounts()
        let amountWei = web3.utils.toWei(amount);
        Vue.$log.debug("depositToFarmLP ", amountWei.toString())
        let response = await this.IngotFarmLPContract.methods.deposit(pid, amountWei).send({from: accounts[0]});
        return response.status;
    }
    async withdrawToFarmLP(pid, amount){  
        const accounts = await web3.eth.getAccounts()
        let amountWei = web3.utils.toWei(amount);
        Vue.$log.debug("withdrawToFarmLP ", amountWei.toString())
        let response = await this.IngotFarmLPContract.methods.withdraw(pid, amountWei).send({from: accounts[0]});
        return response.status;
    }

    async pendingToFarmLP(pid){  
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("pendingToFarmLP", pid)
        let response = await this.IngotFarmLPContract.methods.pendingCake(pid, accounts[0]).call({from: accounts[0]});
        Vue.$log.debug("pendingToFarmLP", response);
        var balanceWei = web3.utils.fromWei(response)
        return balanceWei;
    }

    async userInfoToFarmLP(pid){  
        const accounts = await web3.eth.getAccounts()
        Vue.$log.debug("userInfoToFarmLP ")
        let response = await this.IngotFarmLPContract.methods.userInfo(pid, accounts[0]).call({from: accounts[0]});
        Vue.$log.debug("userInfoToFarmLP", response);
        return web3.utils.fromWei(response['amount']);
    }

    
    createContract = async function () {
        const web3 = await Web3()        
        if (!web3) {
            return undefined
        }

        //const accounts = await web3.eth.getAccounts()
        const contract = await new web3.eth.Contract(JSON.parse(IngotToken), INGOT_TOKEN_ADDRESS)
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
            const contract = await new web3.eth.Contract(JSON.parse(IngotToken), address)
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
            const contract = await new web3.eth.Contract(JSON.parse(IngotToken), address)
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

        const contract = await new web3.eth.Contract(JSON.parse(IngotToken), address)
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

    async getLoggedAccount() {
        const accounts = await web3.eth.getAccounts()

        return (accounts && accounts.length>0)?accounts[0]: undefined
    }

    async loadWeb3(showAlert, askAccessMetamask){
        Vue.$log.debug("loadWeb3, connecting Account...");
        if (window.ethereum) {
            try {
              if(askAccessMetamask) await window.ethereum.request({ method: 'eth_requestAccounts' });
              window.web3 = new Web3(window.ethereum);
              //web3 = window.web3;
            } catch (error) {
                // User denied account access...
                if(showAlert){ await Swal.fire('Oops','Please, allow Metamask access to your account','error');}
                console.log('User cancelled connect request. Error:', error);
            }
          } else if (window.web3) {
            try {
              window.web3 = new Web3(window.web3.currentProvider);
              //web3 = window.web3;
            } catch (err) {
              if(showAlert){ await Swal.fire('Oops','web3 error','error');}
              console.error('web3 error: ', err);
            }
          } else {
            if(showAlert){ await Swal.fire('Oops','Non-Ethereum browser detected','error');}
            console.error('Non-Ethereum browser detected. Using Infura fallback.');
          }

          if(window.web3){
            try {
                var id = await window.web3.eth.net.getId();
                console.log("NET ID: ", id);
            } catch (err) {
                console.error('web3 error: ', err);
            }
            if (id == process.env.VUE_APP_NETWORK_ID){
                web3 = window.web3;
            }else{
                if(showAlert){ await Swal.fire('Oops','Wrong Network, change it first to connect to '+process.env.VUE_APP_NETWORK_NAME,'error');}
                console.error("Invalid Network",id);}
          }
 
          if(web3){
            this._initContracts();
            return true;
          }
          return false;
        }

        async isConnected(){
            return ((await web3.eth.getAccounts()).length)>0

          }
}
export default ContractsServices