const Market  = artifacts.require('Market');
const Plotus = artifacts.require('Plotus');
const Master = artifacts.require('Master');
const web3 = Market.web3
const market = artifacts.require('Market');
const utils = require('./utils')
const BN = web3.utils.BN;
const { ether, toHex, toWei } = require('./utils/ethTools');
const { assertRevert } =  require('./utils/assertRevert');
const increaseTime = require('./utils/increaseTime.js').increaseTime;
const latestTime  = require('./utils/latestTime.js').latestTime;
const helper = require('./utils/helper.js');
var  snapShot 
var snapshotId

const ONE_DAY = 24*3600

contract('weekly Market', function([
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  operator2,
  operator
]) {
  let MarketInstance   
    beforeEach(async () => {
    })
    it('get option price',async function(){

        let nowTime = new Date()/1000;
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,0,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)
        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
        // console.log((await marketInstance._getDistance(1))/1)

        // await marketInstance.placeBet(1,{value: 0,from: user1});
        const getPrice = await marketInstance.getPrice(1);
        // console.log(getPrice/1)
        assert.equal(getPrice/1,4)
        const afterPlaceBetUser1 = await web3.eth.getBalance(user1);
        // const getbrttingpoint  = await,0);
        // const getprice

        // await marketInstance.placeBet(2,{value: 0,from: user2});
        const getPrice1 = await marketInstance.getPrice(2);
        // console.log(getPrice1/1)
        assert.equal(getPrice1,9)
        // const getbrttingpoint1 = await marketInstance.userBettingPoints(user2,2);
        // assert.equal(getbrttingpoint1/1,0);
  
        // await marketInstance.placeBet(3,{value: 0,from: user3});
        const getPrice2 = await marketInstance.getPrice(3);
        // console.log(getPrice2/1)
        assert.equal(getPrice2,13);
        // const getbrttingpoint2 = await marketInstance.userBettingPoints(user3,3);
        // assert.equal(getbrttingpoint2/1,0);
  

        // await marketInstance.placeBet(4,{value: 0,from: user4});
        const getPrice3 = await marketInstance.getPrice(4);
        // console.log(getPrice3/1)
        assert.equal(getPrice3,18)
        // const getbrttingpoint3 = await marketInstance.userBettingPoints(user4,4);
        // assert.equal(getbrttingpoint3/1,0);
  
      
        // await marketInstance.placeBet(5,{value: 0,from: user5});
        const getPrice4 = await marketInstance.getPrice(5);
        // console.log(getPrice4/1);
        assert.equal(getPrice4,23)
        const getPrice5 = await marketInstance.getPrice(6);
        assert.equal(getPrice5,27)

        const getPrice6 = await marketInstance.getPrice(7);
        assert.equal(getPrice6,23)
    })

    // 3 test case when all users bet on option 1 and all wins but the pool have zero balance. users will have own ether
    it('3. place bet from nine users with  and all users are correct. but pool have zero balance',async function(){

        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,0,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)

        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
      
        const getPrice0 = await marketInstance.getPrice(2);
        assert.equal(getPrice0/1,9)
        await marketInstance.placeBet(2,{value: 4e18,from: user1});
        const getPrice = await marketInstance.getPrice(2);
        assert.equal(getPrice,9)
        const afterPlaceBetUser1 = await web3.eth.getBalance(user1);
        const getbrttingpoint  = await marketInstance.userBettingPoints(user1,2);
        assert.equal(((getbrttingpoint/1)/1e6).toFixed(6),(444.444444).toFixed(6));

        const getPrice11 = await marketInstance.getPrice(2);
        assert.equal(getPrice11/1,9)
        await marketInstance.placeBet(2,{value: 6e18,from: user2});
        const getPrice1 = await marketInstance.getPrice(2);
        assert.equal(getPrice1,9)
        const getbrttingpoint1 = await marketInstance.userBettingPoints(user2,2);
        assert.equal(((getbrttingpoint1/1)/1e6).toFixed(6),(666.666666).toFixed(6));
  
        
        const getPrice21 = await marketInstance.getPrice(2);
        assert.equal(getPrice21/1,9)
        await marketInstance.placeBet(2,{value: 2e18,from: user3});
        const getPrice2 = await marketInstance.getPrice(2);
        assert.equal(getPrice2,9)
        const getbrttingpoint2 = await marketInstance.userBettingPoints(user3,2);
        assert.equal(((getbrttingpoint2/1)/1e6).toFixed(6),(222.222222).toFixed(6));
        
        const getPrice31 = await marketInstance.getPrice(2);
        assert.equal(getPrice31/1,9)
        await marketInstance.placeBet(2,{value: 1e19,from: user4});
        const getPrice3 = await marketInstance.getPrice(2);
        assert.equal(getPrice3/1,259)
        const getbrttingpoint3 = await marketInstance.userBettingPoints(user4,2);
        assert.equal(((getbrttingpoint3/1)/1e6).toFixed(6),(1111.111111).toFixed(6));
  
        
        const getPrice14 = await marketInstance.getPrice(2);
        assert.equal(getPrice14,259)
        await marketInstance.placeBet(2,{value: 3e18,from: user5});
        const getPrice4 = await marketInstance.getPrice(2);
        assert.equal(getPrice4/1,259)//52
        const getbrttingpoint4  = await marketInstance.userBettingPoints(user5,2);
        assert.equal(((getbrttingpoint4/1)/1e6).toFixed(6),(11.583011).toFixed(6));
  
        
        const getPrice51 = await marketInstance.getPrice(2);
        
        assert.equal(getPrice51/1,259)
        await marketInstance.placeBet(2,{value: 2e18,from: user6});
        const getPrice5 = await marketInstance.getPrice(2);
        assert.equal(getPrice5,259)//73
        const getbrttingpoint5 = await marketInstance.userBettingPoints(user6,2);
        assert.equal(((getbrttingpoint5/1)/1e6).toFixed(6),(7.722007).toFixed(6));
  
        
        const getPrice61 = await marketInstance.getPrice(2);
        assert.equal(getPrice61/1,259)
        await marketInstance.placeBet(2,{value: 5e18,from: user7});
        const getPrice62 = await marketInstance.getPrice(2);
        assert.equal(getPrice62/1,259)
        const getbrttingpoint6 = await marketInstance.userBettingPoints(user7,2);
        assert.equal(((getbrttingpoint6/1)/1e6).toFixed(6),(19.305019).toFixed(6));
  
        
        const getPrice71 = await marketInstance.getPrice(2);
        assert.equal(getPrice71/1,259)
        await marketInstance.placeBet(2,{value: 5e18,from: user8});
        const getPrice7 = await marketInstance.getPrice(2);
        assert.equal(getPrice7/1,259)
        const getbrttingpoint7 = await marketInstance.userBettingPoints(user8,2);
        assert.equal(((getbrttingpoint7/1)/1e6).toFixed(6),(19.305019).toFixed(6));
  
        
        const getPrice81 = await marketInstance.getPrice(2);
        
        assert.equal(getPrice81/1,259)
        await marketInstance.placeBet(2,{value: 7e18,from: user9}); 
        const getPrice8 = await marketInstance.getPrice(2);
        assert.equal(getPrice8/1,259);
        const getbrttingpoint8 = await marketInstance.userBettingPoints(user9,2);
        assert.equal(((getbrttingpoint8/1)/1e6).toFixed(6),(27.027027).toFixed(6))
        const ClaimDonation = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        await increaseTime(504000);
        await marketInstance._closeBet(9790);

        const WinningOption = await marketInstance.WinningOption()
        assert.equal(WinningOption/1,2);
        const ClaimDonation1 = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        assert.equal(ClaimDonation1/1,ClaimDonation/1);
        // const RewardUser1 = await marketInstance.getReward(user1);
        // assert.equal((RewardUser1/1)/1e18,0)
        // const RewardUser2 = await marketInstance.getReward(user2);
        // assert.equal((RewardUser2/1)/1e18,0)
        // const RewardUser3 = await marketInstance.getReward(user3);
        // assert.equal((RewardUser3/1)/1e18,0)
        // const RewardUser4 = await marketInstance.getReward(user4);
        // assert.equal((RewardUser4/1)/1e18,0);
        // const RewardUser5 = await marketInstance.getReward(user5);
        // assert.equal((RewardUser5/1)/1e18,0);
        // const RewardUser6 = await marketInstance.getReward(user6);
        // assert.equal((RewardUser6/1)/1e18,0);
        // const RewardUser7 = await marketInstance.getReward(user7);
        // assert.equal((RewardUser7/1)/1e18,0);
        // const RewardUser8 = await marketInstance.getReward(user8);
        // assert.equal((RewardUser8/1)/1e18,0);
        // const RewardUser9 = await marketInstance.getReward(user9);
        // assert.equal((RewardUser9/1)/1e18,0);

         await marketInstance.claimReward({from: user1});
        const claimEvent  = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user1}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser1= claimEvent[0].returnValues[2];
        assert.equal((RewardUser1/1)/1e18,0);
        const stakedUser1= claimEvent[0].returnValues[3];
        assert.equal((stakedUser1/1)/1e18,4)

        await marketInstance.claimReward({from: user2});
        const claimEvent1 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user2}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser2 = claimEvent1[0].returnValues[2];
        assert.equal((RewardUser2/1)/1e18,0);
        const stakedUser2 = claimEvent1[0].returnValues[3];
        assert.equal((stakedUser2/1)/1e18,6)

        await marketInstance.claimReward({from: user3});
        const claimEvent2 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user3}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser3 = claimEvent2[0].returnValues[2];
        assert.equal((RewardUser3/1)/1e18,0);
        const stakedUser3 = claimEvent2[0].returnValues[3];
        assert.equal((stakedUser3/1)/1e18,2)

        await marketInstance.claimReward({from: user4});
        const claimEvent3 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user4}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser4 = claimEvent3[0].returnValues[2];
        assert.equal((RewardUser4/1)/1e18,0);
        const stakedUser4 = claimEvent3[0].returnValues[3];
        assert.equal((stakedUser4/1)/1e18,10)

        await marketInstance.claimReward({from: user5});
        const claimEvent4 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user5}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser5 = claimEvent4[0].returnValues[2];
        assert.equal((RewardUser5/1)/1e18,0);
        const stakedUser5 = claimEvent4[0].returnValues[3];
        assert.equal((stakedUser5/1)/1e18,3)

        await marketInstance.claimReward({from: user6});
        const claimEvent5 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user6}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser6 = claimEvent5[0].returnValues[2];
        assert.equal((RewardUser6/1)/1e18,0);
        const stakedUser6 = claimEvent5[0].returnValues[3];
        assert.equal((stakedUser6/1)/1e18,2)

        await marketInstance.claimReward({from: user7});
        const claimEvent6 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user7}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser7 = claimEvent6[0].returnValues[2];
        assert.equal((RewardUser7/1)/1e18,0);
        const stakedUser7 = claimEvent6[0].returnValues[3];
        assert.equal((stakedUser7/1)/1e18,5)

        await marketInstance.claimReward({from: user8});
        const claimEvent7 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user8}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser8 = claimEvent7[0].returnValues[2];
        assert.equal((RewardUser8/1)/1e18,0);
        const stakedUser8 = claimEvent7[0].returnValues[3];
        assert.equal((stakedUser8/1)/1e18,5)
        
        await marketInstance.claimReward({from: user9});
        const claimEvent8 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user9}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser9 = claimEvent8[0].returnValues[2];
        assert.equal((RewardUser9/1)/1e18,0);
        const stakedUser9 = claimEvent8[0].returnValues[3];
        assert.equal((stakedUser9/1)/1e18,7)


        // assert.equal(RewardUser5,5.946902655);

        // const balanceOfPoolAfterCliam = await web3.eth.getBalance(addressOfMarket)
        // assert.equal(balanceOfPoolAfterCliam/1,(balanceOfPool/1));
        // const beforeClaimUser1 = await web3.eth.getBalance(user1);
        // await marketInstance.claimReward({from: user1});
        // // .0020087 
        // const afterClaimUser1 = await web3.eth.getBalance(user1);
        // assert.equal(((afterClaimUser1)/1e18).toFixed(2),(((beforeClaimUser1)/1e18)/1+4-.0020087).toFixed(2))
  
        // const beforeClaimUser2 = await web3.eth.getBalance(user2);
        // await marketInstance.claimReward({from: user2}); 
        // // 0.00117928
        // const afterClaimUser2 = await web3.eth.getBalance(user2);
        // assert.equal(((afterClaimUser2)/1e18).toFixed(2),(((beforeClaimUser2)/1e18)/1+6-0.0014087).toFixed(2))
  
        // const beforeClaimUser3 = await web3.eth.getBalance(user3);
        // await marketInstance.claimReward({from: user3});
        // const afterClaimUser3 = await web3.eth.getBalance(user3);
        // assert.equal(((afterClaimUser3)/1e18).toFixed(2),(((beforeClaimUser3)/1e18)/1+2-0.0014087).toFixed(2))
  
        // const beforeClaimUser4 = await web3.eth.getBalance(user4);
        // await marketInstance.claimReward({from: user4});
        // const afterClaimUser4 = await web3.eth.getBalance(user4);
        // assert.equal(((afterClaimUser4)/1e18).toFixed(2),(((beforeClaimUser4)/1e18)/1+10-0.0014087).toFixed(2))
        
        // const beforeClaimUser5 = await web3.eth.getBalance(user5);
        // await marketInstance.claimReward({from: user5});
        // const afterClaimUser5 = await web3.eth.getBalance(user5);
        // assert.equal(((afterClaimUser5)/1e18).toFixed(2),(((beforeClaimUser5)/1e18)/1+3-0.0014087).toFixed(2))
        
        // const beforeClaimUser6 = await web3.eth.getBalance(user6);
        // await marketInstance.claimReward({from: user6});
        // const afterClaimUser6 = await web3.eth.getBalance(user6);
        // assert.equal(((afterClaimUser6)/1e18).toFixed(2),(((beforeClaimUser6)/1e18)/1+2-0.0014087).toFixed(2))
        
        // const beforeClaimUser7 = await web3.eth.getBalance(user7);
        // await marketInstance.claimReward({from: user7});
        // const afterClaimUser7 = await web3.eth.getBalance(user7);
        // assert.equal(((afterClaimUser7)/1e18).toFixed(2),(((beforeClaimUser7)/1e18)/1+5-0.0014087).toFixed(2))
        
        // const beforeClaimUser8 = await web3.eth.getBalance(user8);
        // await marketInstance.claimReward({from: user8});
        // const afterClaimUser8 = await web3.eth.getBalance(user8);
        // assert.equal(((afterClaimUser8)/1e18).toFixed(2),(((beforeClaimUser8)/1e18)/1+5-0.0014087).toFixed(2))
  
        // const beforeClaimUser9 = await web3.eth.getBalance(user9);
        // await marketInstance.claimReward({from: user9});
        // const afterClaimUser9 = await web3.eth.getBalance(user9);
        // const round = Math.round((afterClaimUser9/1)/1e18);
        // assert.equal(round.toFixed(2),round.toFixed(2));   
    })

    // // 4 test case for when all users place bet on option 2 and option 1 wins. with 2% Donation and 2% Commision 
    it('4. place bet from nine users with 2% commision and donation and all are wrong.',async function(){

        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const balancePlBefore11 = await web3.eth.getBalance(plotusNewAddress);
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,0,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)
        
        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
        // console.log((await marketInstance._getDistance(1))/1)
      
        const getPrice0 = await marketInstance.getPrice(2);
        assert.equal(getPrice0/1,9)
        // const user1BalanceBeforeBet = await web3.eth.getBalance(user1)
        await marketInstance.placeBet(2,{value: 4e18,from: user1});
        // const user1BalanceAfterBet = await web3.eth.getBalance(user1)
        const getPrice = await marketInstance.getPrice(2);
        assert.equal(getPrice,9)
        const afterPlaceBetUser1 = await web3.eth.getBalance(user1);
        const getbrttingpoint  = await marketInstance.userBettingPoints(user1,2);
        assert.equal(((getbrttingpoint/1)/1e6).toFixed(6),(444.444444).toFixed(6));

        const getPrice11 = await marketInstance.getPrice(2);
        assert.equal(getPrice11/1,9)
        await marketInstance.placeBet(2,{value: 6e18,from: user2});
        const getPrice1 = await marketInstance.getPrice(2);
        assert.equal(getPrice1,9)
        const getbrttingpoint1 = await marketInstance.userBettingPoints(user2,2);
        assert.equal(((getbrttingpoint1/1)/1e6).toFixed(6),(666.666666).toFixed(6));
  
        
        const getPrice21 = await marketInstance.getPrice(2);
        assert.equal(getPrice21/1,9)
        await marketInstance.placeBet(2,{value: 2e18,from: user3});
        const getPrice2 = await marketInstance.getPrice(2);
        assert.equal(getPrice2,9)
        const getbrttingpoint2 = await marketInstance.userBettingPoints(user3,2);
        assert.equal(((getbrttingpoint2/1)/1e6).toFixed(6),(222.222222).toFixed(6));
        
        const getPrice31 = await marketInstance.getPrice(2);
        assert.equal(getPrice31/1,9)
        await marketInstance.placeBet(2,{value: 1e19,from: user4});
        const getPrice3 = await marketInstance.getPrice(2);
        assert.equal(getPrice3/1,259)
        const getbrttingpoint3 = await marketInstance.userBettingPoints(user4,2);
        assert.equal(((getbrttingpoint3/1)/1e6).toFixed(6),(1111.111111).toFixed(6));
  
        
        const getPrice14 = await marketInstance.getPrice(2);
        assert.equal(getPrice14,259)
        await marketInstance.placeBet(2,{value: 3e18,from: user5});
        const getPrice4 = await marketInstance.getPrice(2);
        assert.equal(getPrice4/1,259)//52
        const getbrttingpoint4  = await marketInstance.userBettingPoints(user5,2);
        assert.equal(((getbrttingpoint4/1)/1e6).toFixed(6),(11.583011).toFixed(6));
  
        
        const getPrice51 = await marketInstance.getPrice(2);
        
        assert.equal(getPrice51/1,259)
        await marketInstance.placeBet(2,{value: 2e18,from: user6});
        const getPrice5 = await marketInstance.getPrice(2);
        assert.equal(getPrice5,259)//73
        const getbrttingpoint5 = await marketInstance.userBettingPoints(user6,2);
        assert.equal(((getbrttingpoint5/1)/1e6).toFixed(6),(7.722007).toFixed(6));
  
        
        const getPrice61 = await marketInstance.getPrice(2);
        assert.equal(getPrice61/1,259)
        await marketInstance.placeBet(2,{value: 5e18,from: user7});
        const getPrice62 = await marketInstance.getPrice(2);
        assert.equal(getPrice62/1,259)
        const getbrttingpoint6 = await marketInstance.userBettingPoints(user7,2);
        assert.equal(((getbrttingpoint6/1)/1e6).toFixed(6),(19.305019).toFixed(6));
  
        
        const getPrice71 = await marketInstance.getPrice(2);
        assert.equal(getPrice71/1,259)
        await marketInstance.placeBet(2,{value: 5e18,from: user8});
        const getPrice7 = await marketInstance.getPrice(2);
        assert.equal(getPrice7/1,259)
        const getbrttingpoint7 = await marketInstance.userBettingPoints(user8,2);
        assert.equal(((getbrttingpoint7/1)/1e6).toFixed(6),(19.305019).toFixed(6));
  
        
        const getPrice81 = await marketInstance.getPrice(2);
        assert.equal(getPrice81/1,259)
        await marketInstance.placeBet(2,{value: 7e18,from: user9}); 
        const getPrice8 = await marketInstance.getPrice(2);
        assert.equal(getPrice8/1,259);
        const getbrttingpoint8 = await marketInstance.userBettingPoints(user9,2);
        assert.equal(((getbrttingpoint8/1)/1e6).toFixed(6),(27.027027).toFixed(6))
       
        const ClaimDonation = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        await increaseTime(504000);
        // await marketInstance._closeBet(9790);
        const balanceOfPool = await web3.eth.getBalance(length);
        const balancePlBefore = await web3.eth.getBalance(plotusNewAddress);
        await marketInstance._closeBet(100);
        // const tx = await web3.eth.getTransaction(txInfo.tx);
        // const gasCost1 = tx.gasPrice * txInfo.receipt.gasUsed;
        // console.log("gas ",(gasCost1/1)/1e18);
        const WinningOption = await marketInstance.WinningOption()
        assert.equal(WinningOption/1,1);
        const ClaimDonation1 = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        assert.equal(ClaimDonation1/1,ClaimDonation/1+1.76e+18);

        const balancePlAfter = await web3.eth.getBalance(plotusNewAddress);

        const balanceOfPoolAfterClose = await web3.eth.getBalance(length);
        assert.equal(balanceOfPoolAfterClose/1,0);
        assert.equal((balancePlAfter/1)/1e18,(balancePlBefore/1)/1e18+42.24);
        // assert.equal(BeforeTrans2/1+(10*1e18),AfterTrans2/1);
        // const totalPlotusBalance = balancePlBefore/1+(44*1e18)
        // const round =Math.round(totalPlotusBalance);
        // console.log("balance of plotus after bet close",totalPlotusBalance/1)
        // assert.equal(balancePlAfter/1,balancePlBefore/1+(44*1e18));
        // assert.equal((balancePlAfter/1)/1e18,(totalPlotusBalance/1)/1e18-0.00316252)
        // assert.equal(ClaimDonation1/1,ClaimDonation/1);
        // const commisionAfterClose = await marketInstance1.commision();
        // const donationAfterClose =await marketInstance1.donation();
        // const optionOneWinning = await marketInstance1.WinningOption();
        // assert.equal(optionOneWinning/1,1)
        // assert.equal((commisionAfterClose/1)/1e18,(commisionBeforeClose/1)/1e18+0.76);
        // assert.equal((donationAfterClose/1)/1e18,(donationBeforeClose/1)/1e18+0.76);
        // assert.equal(balanceOfPoolAfterClose/1,0)
        // // const ClaimDonation1 = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        const balancePlBefore1 = await web3.eth.getBalance(plotusNewAddress);
        assert.equal(((balancePlBefore1/1)/1e18).toFixed(6),(((balancePlBefore11/1)/1e18)/1+42.24).toFixed(6))
      
    })
    // // 5 test case for when opion 2 win but all sers placing bet on option 2.
    it('5. place bet from nine users all users win the bet and pool have balance',async function() {
      
        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const balancePlBefore11 = await web3.eth.getBalance(plotusNewAddress);
        console.log(balancePlBefore11/1)
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,0,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length);
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)
        
        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
        // console.log((await marketInstance._getDistance(1))/1)

        const getPrice0 = await marketInstance.getPrice(2);
        assert.equal(getPrice0/1,9)
        // const user1BalanceBeforeBet = await web3.eth.getBalance(user1)
        await marketInstance.placeBet(2,{value: 4e18,from: user1});
        // const user1BalanceAfterBet = await web3.eth.getBalance(user1)
        const getPrice = await marketInstance.getPrice(2);
        assert.equal(getPrice,9)
        const afterPlaceBetUser1 = await web3.eth.getBalance(user1);
        const getbrttingpoint  = await marketInstance.userBettingPoints(user1,2);
        assert.equal(((getbrttingpoint/1)/1e6).toFixed(6),(444.444444).toFixed(6));

        const getPrice11 = await marketInstance.getPrice(2);
        assert.equal(getPrice11/1,9)
        await marketInstance.placeBet(2,{value: 6e18,from: user2});
        const getPrice1 = await marketInstance.getPrice(2);
        assert.equal(getPrice1,9)
        const getbrttingpoint1 = await marketInstance.userBettingPoints(user2,2);
        assert.equal(((getbrttingpoint1/1)/1e6).toFixed(6),(666.666666).toFixed(6));
  
        
        const getPrice21 = await marketInstance.getPrice(2);
        assert.equal(getPrice21/1,9)
        await marketInstance.placeBet(2,{value: 2e18,from: user3});
        const getPrice2 = await marketInstance.getPrice(2);
        assert.equal(getPrice2,9)
        const getbrttingpoint2 = await marketInstance.userBettingPoints(user3,2);
        assert.equal(((getbrttingpoint2/1)/1e6).toFixed(6),(222.222222).toFixed(6));
        
        const getPrice31 = await marketInstance.getPrice(2);
        assert.equal(getPrice31/1,9)
        await marketInstance.placeBet(2,{value: 1e19,from: user4});
        const getPrice3 = await marketInstance.getPrice(2);
        assert.equal(getPrice3/1,259)
        const getbrttingpoint3 = await marketInstance.userBettingPoints(user4,2);
        assert.equal(((getbrttingpoint3/1)/1e6).toFixed(6),(1111.111111).toFixed(6));
  
        
        const getPrice14 = await marketInstance.getPrice(2);
        assert.equal(getPrice14,259)
        await marketInstance.placeBet(2,{value: 3e18,from: user5});
        const getPrice4 = await marketInstance.getPrice(2);
        assert.equal(getPrice4/1,259)//52
        const getbrttingpoint4  = await marketInstance.userBettingPoints(user5,2);
        assert.equal(((getbrttingpoint4/1)/1e6).toFixed(6),(11.583011).toFixed(6));
  
        
        const getPrice51 = await marketInstance.getPrice(2);
        assert.equal(getPrice51/1,259)
        await marketInstance.placeBet(2,{value: 2e18,from: user6});
        const getPrice5 = await marketInstance.getPrice(2);
        assert.equal(getPrice5,259)//73
        const getbrttingpoint5 = await marketInstance.userBettingPoints(user6,2);
        assert.equal(((getbrttingpoint5/1)/1e6).toFixed(6),(7.722007).toFixed(6));
  
        
        const getPrice61 = await marketInstance.getPrice(2);
        assert.equal(getPrice61/1,259)
        await marketInstance.placeBet(2,{value: 5e18,from: user7});
        const getPrice62 = await marketInstance.getPrice(2);
        assert.equal(getPrice62/1,259)
        const getbrttingpoint6 = await marketInstance.userBettingPoints(user7,2);
        assert.equal(((getbrttingpoint6/1)/1e6).toFixed(6),(19.305019).toFixed(6));
  
        
        const getPrice71 = await marketInstance.getPrice(2);
        assert.equal(getPrice71/1,259)
        await marketInstance.placeBet(2,{value: 5e18,from: user8});
        const getPrice7 = await marketInstance.getPrice(2);
        assert.equal(getPrice7/1,259)
        const getbrttingpoint7 = await marketInstance.userBettingPoints(user8,2);
        assert.equal(((getbrttingpoint7/1)/1e6).toFixed(6),(19.305019).toFixed(6));
  
        
        const getPrice81 = await marketInstance.getPrice(2);
        assert.equal(getPrice81/1,259)
        await marketInstance.placeBet(2,{value: 7e18,from: user9}); 
        const getPrice8 = await marketInstance.getPrice(2);
        assert.equal(getPrice8/1,259);
        const getbrttingpoint8 = await marketInstance.userBettingPoints(user9,2);
        assert.equal(((getbrttingpoint8/1)/1e6).toFixed(6),(27.027027).toFixed(6))

        const ClaimDonation = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567");
        await increaseTime(504000);
        const balanceOfPool = await web3.eth.getBalance(length);

        const balancePlBefore = await web3.eth.getBalance(plotusNewAddress);
        await marketInstance._closeBet(9790);
        const optionTwoWinning11 = await marketInstance.WinningOption();
        assert.equal(optionTwoWinning11/1,2)

        const ClaimDonation1 = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567");
        assert.equal(ClaimDonation1/1,ClaimDonation/1);

        // const RewardUser1 = await marketInstance.getReward(user1);
        // console.log("user 1 RewardUser1",RewardUser1/1)
        // // assert.equal((RewardUser1/1)/1e18,0.00888)
        // const RewardUser2 = await marketInstance.getReward(user2); 
        // assert.equal((RewardUser2/1)/1e18,0.01332)      
        // const RewardUser3 = await marketInstance.getReward(user3);
        // assert.equal((RewardUser3/1)/1e18,0.00444)
        // const RewardUser4 = await marketInstance.getReward(user4);
        // assert.equal((RewardUser4/1)/1e18,0.02222)
        // const RewardUser5 = await marketInstance.getReward(user5);
        // assert.equal((RewardUser5/1)/1e18,0.00022)
        // const RewardUser6 = await marketInstance.getReward(user6)
        // assert.equal((RewardUser6/1)/1e18,0.00014)
        // const RewardUser7 = await marketInstance.getReward(user7);
        // assert.equal((RewardUser7/1)/1e18,0.00038)
        // const RewardUser8 = await marketInstance.getReward(user8);
        // assert.equal((RewardUser8/1)/1e18,0.00038)
        // const RewardUser9 = await marketInstance.getReward(user9);
        // assert.equal((RewardUser9/1)/1e18,0.00054);

        await marketInstance.claimReward({from: user1});
        const claimEvent  = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user1}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser1= claimEvent[0].returnValues[2];
        assert.equal((RewardUser1/1)/1e18,0.00888888888);
        const stakedUser1= claimEvent[0].returnValues[3];
        assert.equal((stakedUser1/1)/1e18,4)

        await marketInstance.claimReward({from: user2});
        const claimEvent1 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user2}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser2 = claimEvent1[0].returnValues[2];
        assert.equal((RewardUser2/1)/1e18,0.01333333332);
        const stakedUser2 = claimEvent1[0].returnValues[3];
        assert.equal((stakedUser2/1)/1e18,6)

        await marketInstance.claimReward({from: user3});
        const claimEvent2 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user3}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser3 = claimEvent2[0].returnValues[2];
        assert.equal((RewardUser3/1)/1e18,0.00444444444);
        const stakedUser3 = claimEvent2[0].returnValues[3];
        assert.equal((stakedUser3/1)/1e18,2)

        await marketInstance.claimReward({from: user4});
        const claimEvent3 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user4}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser4 = claimEvent3[0].returnValues[2];
        assert.equal((RewardUser4/1)/1e18,0.02222222222);
        const stakedUser4 = claimEvent3[0].returnValues[3];
        assert.equal((stakedUser4/1)/1e18,10)

        await marketInstance.claimReward({from: user5});
        const claimEvent4 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user5}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser5 = claimEvent4[0].returnValues[2];
        assert.equal((RewardUser5/1)/1e18,0.00023166022);
        const stakedUser5 = claimEvent4[0].returnValues[3];
        assert.equal((stakedUser5/1)/1e18,3)

        await marketInstance.claimReward({from: user6});
        const claimEvent5 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user6}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser6 = claimEvent5[0].returnValues[2];
        assert.equal((RewardUser6/1)/1e18,0.00015444014);
        const stakedUser6 = claimEvent5[0].returnValues[3];
        assert.equal((stakedUser6/1)/1e18,2)

        await marketInstance.claimReward({from: user7});
        const claimEvent6 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user7}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser7 = claimEvent6[0].returnValues[2];
        assert.equal((RewardUser7/1)/1e18,0.00038610038);
        const stakedUser7 = claimEvent6[0].returnValues[3];
        assert.equal((stakedUser7/1)/1e18,5)

        await marketInstance.claimReward({from: user8});
        const claimEvent7 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user8}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser8 = claimEvent7[0].returnValues[2];
        assert.equal((RewardUser8/1)/1e18,0.00038610038);
        const stakedUser8 = claimEvent7[0].returnValues[3];
        assert.equal((stakedUser8/1)/1e18,5)

        await marketInstance.claimReward({from: user9});
        const claimEvent8 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user9}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser9 = claimEvent8[0].returnValues[2];
        assert.equal((RewardUser9/1)/1e18,0.00054054054);
        const stakedUser9 = claimEvent8[0].returnValues[3];
        assert.equal((stakedUser9/1)/1e18,7)

        // claimReward.logs[0].args
        // addNewMarket.logs[0].args.marketAdd
        // 3.544e+16

        // const beforeClaimUser1 = await web3.eth.getBalance(user1);
        // await marketInstance.claimReward({from: user1});
        // const afterClaimUser1 = await web3.eth.getBalance(user1);
        // console.log("after Claim User1",(afterClaimUser1/1)/1e18)
        // // 0.00160414
        // assert.equal(((afterClaimUser1)/1e18).toFixed(2),(((beforeClaimUser1)/1e18)/1+4.008-0.00220414).toFixed(2));

        // const beforeClaimUser2 = await web3.eth.getBalance(user2);
        // await marketInstance.claimReward({from: user2});
        // const afterClaimUser2 = await web3.eth.getBalance(user2);
        // assert.equal(((afterClaimUser2)/1e18).toFixed(1),(((beforeClaimUser2)/1e18)/1+6.006-0.00160414).toFixed(1))

        // const beforeClaimUser3 = await web3.eth.getBalance(user3);
        // await marketInstance.claimReward({from: user3});
        // const afterClaimUser3 = await web3.eth.getBalance(user3);
        // assert.equal(((afterClaimUser3)/1e18).toFixed(1),(((beforeClaimUser3)/1e18)/1+2.00132-0.00160414).toFixed(1))

        // const beforeClaimUser4 = await web3.eth.getBalance(user4);
        // await marketInstance.claimReward({from: user4});
        // const afterClaimUser4 = await web3.eth.getBalance(user4)
        // assert.equal(((afterClaimUser4)/1e18).toFixed(1),(((beforeClaimUser4)/1e18)/1+10.002-0.00160414).toFixed(1))

        // const beforeClaimUser5 = await web3.eth.getBalance(user5);
        // await marketInstance.claimReward({from: user5});
        // const afterClaimUser5 = await web3.eth.getBalance(user5);
        // assert.equal(((afterClaimUser5)/1e18).toFixed(1),(((beforeClaimUser5)/1e18)/1+3.0012-0.00160414).toFixed(1))

        // const beforeClaimUser6 = await web3.eth.getBalance(user6);
        // await marketInstance.claimReward({from: user6});
        // const afterClaimUser6 = await web3.eth.getBalance(user6);
        // assert.equal(((afterClaimUser6)/1e18).toFixed(1),(((beforeClaimUser6)/1e18)/1+2.002-0.00160414).toFixed(1))

        // const beforeClaimUser7 = await web3.eth.getBalance(user7);
        // await marketInstance.claimReward({from: user7});
        // const afterClaimUser7 = await web3.eth.getBalance(user7);
        // assert.equal(((afterClaimUser7)/1e18).toFixed(1),(((beforeClaimUser7)/1e18)/1+5.00332-0.00160414).toFixed(1))

        // const beforeClaimUser8 = await web3.eth.getBalance(user8);
        // await marketInstance.claimReward({from: user8});
        // const afterClaimUser8 = await web3.eth.getBalance(user8);
        // assert.equal(((afterClaimUser8)/1e18).toFixed(1),(((beforeClaimUser8)/1e18)/1+5.005-0.00160414).toFixed(1))

        // const beforeClaimUser9 = await web3.eth.getBalance(user9);
        // await marketInstance.claimReward({from: user9});
        // // console.log("reward of user9",(await marketInstance.getReward(user9)/1)/1e18)
        // const afterClaimUser9 = await web3.eth.getBalance(user9)
        // assert.equal(((afterClaimUser9)/1e18).toFixed(1),(((beforeClaimUser9)/1e18)/1+7.0028-0.00160414).toFixed(1));
        // const balancePlAfter = await web3.eth.getBalance(plotusNewAddress);
        const balancePlBefore1 = await web3.eth.getBalance(plotusNewAddress);
        console.log(balancePlBefore1/1)
        assert.equal((((balancePlBefore1/1e18)+0.05058773052)/1).toFixed(9),((balancePlBefore11/1e18)/1).toFixed(9))
    })

    
    it('1. place bet from nine users with 2% commision and 2% donation',async function(){

        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const balancePlBefore11 = await web3.eth.getBalance(plotusNewAddress);
        console.log(balancePlBefore11/1)
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,0,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)

        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
        
      
        const getPrice0 = await marketInstance.getPrice(1);
        assert.equal(getPrice0/1,4)
        
        await marketInstance.placeBet(1,{value: 4e18,from: user1});
        const user1BalanceAfterBet = await web3.eth.getBalance(user1)
        const getPrice = await marketInstance.getPrice(1);
        assert.equal(getPrice,4)
        const afterPlaceBetUser1 = await web3.eth.getBalance(user1);
        const getbrttingpoint  = await marketInstance.userBettingPoints(user1,1);
        
        assert.equal((getbrttingpoint/1)/1e6,1000);
        
  
        
        const getPrice11 = await marketInstance.getPrice(2);
        assert.equal(getPrice11/1,9)
        await marketInstance.placeBet(2,{value: 6e18,from: user2});
        const getPrice1 = await marketInstance.getPrice(2);
        assert.equal(getPrice1,9)
        const getbrttingpoint1 = await marketInstance.userBettingPoints(user2,2);
        assert.equal((getbrttingpoint1/1)/1e6,666.666666);
        
  
        
        const getPrice21 = await marketInstance.getPrice(3);
        assert.equal(getPrice21/1,13)
        await marketInstance.placeBet(3,{value: 2e18,from: user3});
        const getPrice2 = await marketInstance.getPrice(3);
        assert.equal(getPrice2,13)
        const getbrttingpoint2 = await marketInstance.userBettingPoints(user3,3);
        assert.equal((getbrttingpoint2/1)/1e6,153.846153);     
        const getPrice31 = await marketInstance.getPrice(4);
        assert.equal(getPrice31/1,18)
        await marketInstance.placeBet(4,{value: 1e19,from: user4});
        const getPrice3 = await marketInstance.getPrice(4);
        assert.equal(getPrice3/1,132)
        const getbrttingpoint3 = await marketInstance.userBettingPoints(user4,4);
        assert.equal((getbrttingpoint3/1)/1e6,555.555555);
        
  
        
        const getPrice14 = await marketInstance.getPrice(1);
        assert.equal(getPrice14,50)
        await marketInstance.placeBet(1,{value: 3e18,from: user5});
        const getPrice4 = await marketInstance.getPrice(1);
        assert.equal(getPrice4/1,74)//52
       
        const getbrttingpoint4  = await marketInstance.userBettingPoints(user5,1);
        assert.equal((getbrttingpoint4/1)/1e6,60);
        
  
        
        const getPrice51 = await marketInstance.getPrice(2);
        assert.equal(getPrice51/1,69)
        await marketInstance.placeBet(2,{value: 2e18,from: user6});
        const getPrice5 = await marketInstance.getPrice(2);
        assert.equal(getPrice5,83)//73
        const getbrttingpoint5 = await marketInstance.userBettingPoints(user6,2);
        assert.equal((getbrttingpoint5/1)/1e6,28.985507);
        
  
        
        const getPrice61 = await marketInstance.getPrice(5);
        assert.equal(getPrice61/1,23)
        await marketInstance.placeBet(5,{value: 5e18,from: user7});
        const getPrice62 = await marketInstance.getPrice(5);
        assert.equal(getPrice62/1,62)
        const getbrttingpoint6 = await marketInstance.userBettingPoints(user7,5);
        assert.equal((getbrttingpoint6/1)/1e6,217.391304);
        
  
        
        const getPrice71 = await marketInstance.getPrice(6);
        assert.equal(getPrice71/1,27)
        await marketInstance.placeBet(6,{value: 5e18,from: user8});
        const getPrice7 = await marketInstance.getPrice(6);
        assert.equal(getPrice7/1,61)
        const getbrttingpoint7 = await marketInstance.userBettingPoints(user8,6);
        assert.equal((getbrttingpoint7/1)/1e6,185.185185);
        
  
        
        const getPrice81 = await marketInstance.getPrice(7);
        assert.equal(getPrice81/1,23)
        await marketInstance.placeBet(7,{value: 7e18,from: user9}); 
        const getPrice8 = await marketInstance.getPrice(7);
        assert.equal(getPrice8/1,62);
        const getbrttingpoint8 = await marketInstance.userBettingPoints(user9,7);
        assert.equal((getbrttingpoint8/1)/1e6,304.347826);
        


        const ClaimDonation = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        await increaseTime(504000);
        await marketInstance._closeBet(100);
        const ClaimDonation1 = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        assert.equal(ClaimDonation1/1,ClaimDonation/1+1.48e+18);
        // const check = await marketInstance.getReward(user1);
       
        // const RewardUser1 = await marketInstance.getReward(user1);
        // assert.equal((RewardUser1/1)/1e18,24);
        // const RewardUser5 = await marketInstance.getReward(user5);
        // // console.log((RewardUser5/1)/1e18)
        // assert.equal(((RewardUser5/1)/1e18).toFixed(6),(5.010566038).toFixed(6));
        // const beforeClaimUser1 = await web3.eth.getBalance(user1);
        // await marketInstance.claimReward({from: user1});
        // // console.log("reward of user5",await marketInstance.getReward(user1)/1)
        // // const txInfo = await marketInstance.getReward(user1);
        // // const tx = await web3.eth.getTransaction(txInfo.tx);
        // // const gasCost1 = tx.gasPrice * txInfo.receipt.gasUsed;
        // // console.log("gas ",(gasCost1/1)/1e18);
        // const afterClaimUser1 = await web3.eth.getBalance(user1);
        // // console
        // assert.equal(((afterClaimUser1)/1e18).toFixed(2),(((beforeClaimUser1)/1e18)/1+24-0.00108296).toFixed(2))
        // // const beforeClaimUser5 = await web3.eth.getBalance(user5);
        // await marketInstance.claimReward({from: user5});
        await marketInstance.claimReward({from: user1});
        const claimEvent = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user1}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser1 = claimEvent[0].returnValues[2];
        assert.equal(((RewardUser1/1)/1e18),20);
        const stakedUser1 = claimEvent[0].returnValues[3];
        assert.equal((stakedUser1/1)/1e18,4)

        await marketInstance.claimReward({from: user5});
        const claimEvent1 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user5}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser5 = claimEvent1[0].returnValues[2];
        assert.equal(((RewardUser5/1)/1e18).toFixed(13),2.0105660377358);
        const stakedUser5 = claimEvent1[0].returnValues[3];
        assert.equal((stakedUser5/1)/1e18,3)
        
        const balancePlBefore1 = await web3.eth.getBalance(plotusNewAddress);
        console.log(balancePlBefore1/1)
        assert.equal(((balancePlBefore1/1e18)/1).toFixed(7),(((balancePlBefore11/1e18)+13.50943396)/1).toFixed(7))
        // assert.equal(((balancePlBefore1/1e18)/1).toFixed(9),(((balancePlBefore11/1e18)+13.50943396)/1).toFixed(9))
    })
    
    it('2. place bet from nine users with 0% commision and 0% donation',async function(){

        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const balancePlBefore11 = await web3.eth.getBalance(plotusNewAddress);
        console.log(balancePlBefore11/1)
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,0,7,1000000000000000,10000,0,0,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)

        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
        // console.log((await marketInstance._getDistance(1))/1)
      
        const getPrice0 = await marketInstance.getPrice(1);
        assert.equal(getPrice0/1,4)
        await marketInstance.placeBet(1,{value: 4e18,from: user1});
        const user1BalanceAfterBet = await web3.eth.getBalance(user1)
        const getPrice = await marketInstance.getPrice(1);
        assert.equal(getPrice,4)
        const afterPlaceBetUser1 = await web3.eth.getBalance(user1);
        const getbrttingpoint  = await marketInstance.userBettingPoints(user1,1);
        assert.equal((getbrttingpoint/1)/1e6,1000);    
  
        
        const getPrice11 = await marketInstance.getPrice(2);
        assert.equal(getPrice11/1,9)
        await marketInstance.placeBet(2,{value: 6e18,from: user2});
        const getPrice1 = await marketInstance.getPrice(2);
        assert.equal(getPrice1,9)
        const getbrttingpoint1 = await marketInstance.userBettingPoints(user2,2);
        assert.equal((getbrttingpoint1/1)/1e6,666.666666); 
        
        const getPrice21 = await marketInstance.getPrice(3);
        assert.equal(getPrice21/1,13)
        await marketInstance.placeBet(3,{value: 2e18,from: user3});
        const getPrice2 = await marketInstance.getPrice(3);
        assert.equal(getPrice2,13)
        const getbrttingpoint2 = await marketInstance.userBettingPoints(user3,3);
        assert.equal((getbrttingpoint2/1)/1e6,153.846153);
        
        const getPrice31 = await marketInstance.getPrice(4);
        assert.equal(getPrice31/1,18)
        await marketInstance.placeBet(4,{value: 1e19,from: user4});
        const getPrice3 = await marketInstance.getPrice(4);
        assert.equal(getPrice3/1,132)
        const getbrttingpoint3 = await marketInstance.userBettingPoints(user4,4);
        assert.equal((getbrttingpoint3/1)/1e6,555.555555);
        
        const getPrice14 = await marketInstance.getPrice(1);
        assert.equal(getPrice14,50)
        await marketInstance.placeBet(1,{value: 3e18,from: user5});
        const getPrice4 = await marketInstance.getPrice(1);
        assert.equal(getPrice4/1,74)
        const getbrttingpoint4  = await marketInstance.userBettingPoints(user5,1);
        assert.equal((getbrttingpoint4/1)/1e6,60);  
        
        const getPrice51 = await marketInstance.getPrice(2);
        assert.equal(getPrice51/1,69)
        await marketInstance.placeBet(2,{value: 2e18,from: user6});
        const getPrice5 = await marketInstance.getPrice(2);
        assert.equal(getPrice5,83)
        const getbrttingpoint5 = await marketInstance.userBettingPoints(user6,2);
        assert.equal((getbrttingpoint5/1)/1e6,28.985507);
        
        const getPrice61 = await marketInstance.getPrice(5);
        assert.equal(getPrice61/1,23)
        await marketInstance.placeBet(5,{value: 5e18,from: user7});
        const getPrice62 = await marketInstance.getPrice(5);
        assert.equal(getPrice62/1,62)
        const getbrttingpoint6 = await marketInstance.userBettingPoints(user7,5);
        assert.equal((getbrttingpoint6/1)/1e6,217.391304);
        
        const getPrice71 = await marketInstance.getPrice(6);
        assert.equal(getPrice71/1,27)
        await marketInstance.placeBet(6,{value: 5e18,from: user8});
        const getPrice7 = await marketInstance.getPrice(6);
        assert.equal(getPrice7/1,61)
        const getbrttingpoint7 = await marketInstance.userBettingPoints(user8,6);
        assert.equal((getbrttingpoint7/1)/1e6,185.185185);
        
        const getPrice81 = await marketInstance.getPrice(7);
        assert.equal(getPrice81/1,23)
        await marketInstance.placeBet(7,{value: 7e18,from: user9}); 
        const getPrice8 = await marketInstance.getPrice(7);
        assert.equal(getPrice8/1,62);
        const getbrttingpoint8 = await marketInstance.userBettingPoints(user9,7);
        assert.equal((getbrttingpoint8/1)/1e6,304.347826)

        const ClaimDonation = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        
        await increaseTime(504000);
        await marketInstance._closeBet(100);
        const ClaimDonation1 = await web3.eth.getBalance("0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567")
        assert.equal(ClaimDonation1/1,ClaimDonation/1);
        // const RewardUser1 = await marketInstance.getReward(user1);
        // assert.equal((RewardUser1/1)/1e18,24);
        // const RewardUser5 = await marketInstance.getReward(user5);
        // // console.log((RewardUser5/1)/1e18)
        // assert.equal(((RewardUser5/1)/1e18).toFixed(6),(5.094339623).toFixed(6));
        // const beforeClaimUser1 = await web3.eth.getBalance(user1);
        // await marketInstance.claimReward({from: user1});
        // // console.log("reward of user5",await marketInstance.getReward(user1)/1)
        // // const txInfo = await marketInstance.getReward(user1);
        // // const tx = await web3.eth.getTransaction(txInfo.tx);
        // // const gasCost1 = tx.gasPrice * txInfo.receipt.gasUsed;
        // // console.log("gas ",(gasCost1/1)/1e18);
        // const afterClaimUser1 = await web3.eth.getBalance(user1);
        // // console
        // assert.equal(((afterClaimUser1)/1e18).toFixed(2),(((beforeClaimUser1)/1e18)/1+24-0.00108296).toFixed(2))
        // // const beforeClaimUser5 = await web3.eth.getBalance(user5);

        await marketInstance.claimReward({from: user1});
        const claimEvent = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user5}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser1 = claimEvent[0].returnValues[2];
        assert.equal((RewardUser1/1)/1e18,20);
        const stakedUser1 = claimEvent[0].returnValues[3];
        assert.equal((stakedUser1/1)/1e18,4)

        await marketInstance.claimReward({from: user5});
        const claimEvent1 = await plotusNewInstance.getPastEvents( 'Claimed', {marketAdd:marketInstance.address, user: user5}, { fromBlock: 0, toBlock: 'latest' } )
        const RewardUser5 = claimEvent1[0].returnValues[2];
        assert.equal(((RewardUser5/1)/1e18).toFixed(13),2.0943396226415);
        const stakedUser5 = claimEvent1[0].returnValues[3];
        assert.equal((stakedUser5/1)/1e18,3);
        const balancePlBefore1 = await web3.eth.getBalance(plotusNewAddress);
        console.log(balancePlBefore1/1)
        // assert.equal(((balancePlBefore1/1e18)/1).toFixed(9),(((balancePlBefore11/1e18)+14.90566038)/1).toFixed(9))
        assert.equal(((balancePlBefore1/1e18)/1).toFixed(7),(((balancePlBefore11/1e18)+14.90566038)/1).toFixed(7))

    })
        
    it("6. If user invest large amount of ether.",async function(){
        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,1,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)

        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
      
        const getPrice0 = await marketInstance.getPrice(1);
        assert.equal(getPrice0/1,4)

        await marketInstance.placeBet(1,{value: 1e19,from: user1});
        const getPrice = await marketInstance.getPrice(1);
        assert.equal(getPrice/1,4)
        const getbrttingpoint1  = await marketInstance.userBettingPoints(user1,1);
        assert.equal((getbrttingpoint1/1)/1e6,2500);


        await marketInstance.placeBet(1,{value: 1e19,from: user1});
        const getPrice1 = await marketInstance.getPrice(1);
        assert.equal(getPrice1/1,4)
        const getbrttingpoint2  = await marketInstance.userBettingPoints(user1,1);
        assert.equal((getbrttingpoint2/1)/1e6,5000);



        await marketInstance.placeBet(1,{value: 1e19,from: user1});
        const getPrice3 = await marketInstance.getPrice(1);
        assert.equal(getPrice3/1,254)
        const getbrttingpoint3  = await marketInstance.userBettingPoints(user1,1);
        assert.equal((getbrttingpoint3/1)/1e6,7500);
        await marketInstance.placeBet(1,{value: 1e19,from: user1});
        const getPrice2 = await marketInstance.getPrice(1);
        assert.equal(getPrice2/1,254)
        const getbrttingpoint4  = await marketInstance.userBettingPoints(user1,1);
        assert.equal((getbrttingpoint4/1)/1e6,(7539.370078).toFixed(6));
        await marketInstance.placeBet(1,{value: 1e19,from: user1});
        const getbrttingpoint  = await marketInstance.userBettingPoints(user1,1);
        assert.equal(((getbrttingpoint/1)/1e6).toFixed(6),(7578.740156).toFixed(6));

    })

    it("7. If user invest large amount of ether.",async function(){
        let nowTime = await latestTime();
        nowTime = parseInt(nowTime);
        const start = nowTime/1 + 10;
        masterInstance = await Master.deployed();
        plotusNewAddress = await masterInstance.plotusAddress(); 
        plotusNewInstance = await Plotus.at(plotusNewAddress);
        const addNewMarket = await plotusNewInstance.addNewMarket([start,2,2,1,7,1000000000000000,10000,2,2,100,5,10],"firstBet","0x47",["0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567","0xcd7e5d0cF2908850D185Ee9cc6377D6bb6DF0567"])
        const length = addNewMarket.logs[0].args.marketAdd; 
        console.log("market",length)
        marketInstance = await Market.at(length);
        assert.ok(marketInstance);
        const addressOfMarket = marketInstance.address;
        const options1 = await marketInstance.optionsAvailable(1);
        assert.equal(options1[0]/1,0)
        assert.equal(options1[1]/1,9749)
        const options2 = await marketInstance.optionsAvailable(2);
        assert.equal(options2[0]/1,9750)
        assert.equal(options2[1]/1,9849)
        const options3 = await marketInstance.optionsAvailable(3);
        assert.equal(options3[0]/1,9850)
        assert.equal(options3[1]/1,9949)
        const options4 = await marketInstance.optionsAvailable(4);
        assert.equal(options4[0]/1,9950)
        assert.equal(options4[1]/1,10050)
        const options5 = await marketInstance.optionsAvailable(5);
        assert.equal(options5[0]/1,10051)
        assert.equal(options5[1]/1,10150)
        const options6 = await marketInstance.optionsAvailable(6);
        assert.equal(options6[0]/1,10151)
        assert.equal(options6[1]/1,10250)
        const options7 = await marketInstance.optionsAvailable(7);
        assert.equal(options7[0]/1,10251)
        assert.equal(options7[1]/1,1.157920892373162e+77)

        await increaseTime(100800+11);
        await marketInstance.setCurrentPrice(10215);
      
        const getPrice0 = await marketInstance.getPrice(1);
        assert.equal(getPrice0/1,4)
        await marketInstance.placeBet(1,{value: 5e19,from: user2});
        const getPrice = await marketInstance.getPrice(1);
        assert.equal(getPrice/1,254)
        const getbrttingpoint1  = await marketInstance.userBettingPoints(user2,1);
        assert.equal(((getbrttingpoint1/1)/1e6).toFixed(6),(7578.740156).toFixed(6));
    })
        
 })