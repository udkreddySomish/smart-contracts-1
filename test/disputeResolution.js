const { assert } = require("chai");
const Market = artifacts.require("MockMarket");
const Plotus = artifacts.require("Plotus");
const Master = artifacts.require("Master");
const PlotusToken = artifacts.require("PlotusToken");
const TokenController = artifacts.require("MockTokenController");
const MockchainLinkBTC = artifacts.require("MockChainLinkAggregator");
const Governance = artifacts.require("Governance");
const ProposalCategory = artifacts.require('ProposalCategory');
const MemberRoles = artifacts.require('MemberRoles');
const BLOT = artifacts.require("BLOT");
const web3 = Market.web3;
const increaseTime = require("./utils/increaseTime.js").increaseTime;
const { assertRevert } = require('./utils/assertRevert');
contract("Market", ([ab1, ab2, ab3, ab4, dr1, dr2, dr3, notMember]) => {
  it("1.if DR panel accepts", async () => {
    let masterInstance = await Master.deployed();
    let tokenControllerAdd  = await masterInstance.getLatestAddress(web3.utils.toHex("TC"));
    let tokenController = await TokenController.at(tokenControllerAdd);
    let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
    let plotusNewInstance = await Plotus.at(plotusNewAddress);
    const openMarkets = await plotusNewInstance.getOpenMarkets();
    marketInstance = await Market.at(openMarkets["_openMarkets"][0]);
    await increaseTime(10001);
    assert.ok(marketInstance);
    let nxms = await Master.deployed();
    let nxmToken = await PlotusToken.deployed();
    let address = await nxms.getLatestAddress(web3.utils.toHex("GV"));
    let plotusToken = await PlotusToken.deployed();
    let gv = await Governance.at(address);
    address = await nxms.getLatestAddress(web3.utils.toHex("PC"));
    let pc = await ProposalCategory.at(address);
    address = await nxms.getLatestAddress(web3.utils.toHex("MR"));
    let mr = await MemberRoles.at(address);
    let tc = await TokenController.at(await nxms.getLatestAddress(web3.utils.toHex("MR")));
    await plotusToken.approve(mr.address, "10000000000000000000000");
   
    await plotusToken.transfer(ab2, "50000000000000000000000");
    await plotusToken.transfer(ab3, "50000000000000000000000");
    await plotusToken.transfer(ab4, "50000000000000000000000");
    await plotusToken.transfer(dr1, "50000000000000000000000");
    await plotusToken.transfer(dr2, "50000000000000000000000");
    await plotusToken.transfer(dr3, "50000000000000000000000");
   
    await mr.addInitialABandDRMembers([ab2, ab3, ab4], [dr1, dr2, dr3], { from: ab1 });
    
    // cannot raise dispute if market is open
    await plotusToken.approve(marketInstance.address, "10000000000000000000000");
    await assertRevert(marketInstance.raiseDispute(14000,"raise dispute","this is short desc.","this is description","this is solution hash"));
    
    await increaseTime(3601);
    // cannot raise dispute if market is closed but result is not out
    await plotusToken.approve(marketInstance.address, "10000000000000000000000");
    await assertRevert(marketInstance.raiseDispute(14000,"raise dispute","this is short desc.","this is description","this is solution hash"));
   
    await increaseTime(3600);
    await marketInstance.calculatePredictionResult(1000);
     // cannot raise dispute with less than minimum stake
    await plotusToken.approve(marketInstance.address, "10000000000000000000000");
    await assertRevert(marketInstance.raiseDispute(14000,"raise dispute","this is short desc.","this is description","this is solution hash",{from : notMember}));
    //can raise dispute in cooling period and stake
    await plotusToken.approve(marketInstance.address, "10000000000000000000000");
    await marketInstance.raiseDispute(14000,"raise dispute","this is short desc.","this is description","this is solution hash");
    await increaseTime(901);
     // cannot raise dispute if market cool time is over
    await plotusToken.approve(marketInstance.address, "10000000000000000000000");
    await assertRevert(marketInstance.raiseDispute(14000,"raise dispute","this is short desc.","this is description","this is solution hash"));
    
    let winningOption_af = await marketInstance.getMarketResults()
    console.log("winningOption",winningOption_af[0]/1)
    let proposalId = await gv.getProposalLength()-1;
    console.log("proposalId",proposalId/1)
    let userBalBefore = await plotusToken.balanceOf(ab1);
    console.log("balance before accept proposal",userBalBefore/1)
    
    await plotusToken.approve(tokenController.address, "100000000000000000000000");
    await tokenController.lock("0x4452","20000000000000000000000",(86400*20),{from : dr1});
    
    await plotusToken.approve(tokenController.address, "100000000000000000000000");
    await tokenController.lock("0x4452","20000000000000000000000",(86400*20),{from : dr2});
    
    await plotusToken.approve(tokenController.address, "100000000000000000000000");
    await tokenController.lock("0x4452","20000000000000000000000",(86400*20),{from : dr3});
    await gv.submitVote(proposalId, 1, {from:dr1});
    await gv.submitVote(proposalId, 1, {from:dr2});
    await gv.submitVote(proposalId, 1, {from:dr3});
    await gv.closeProposal(proposalId);
    await increaseTime(86401);
    await gv.triggerAction(proposalId);
    let userBalAfter = await plotusToken.balanceOf(ab1);
    console.log("balance before accept proposal",userBalAfter/1)
    let winningOption_afterVote = await marketInstance.getMarketResults()
    console.log("winningOption After accept proposal",winningOption_afterVote[0]/1);
  });
});
contract("Market", ([ab1, ab2, ab3, ab4, dr1, dr2, dr3, notMember]) => {
  it("2.if DR panel rejects", async () => {
    let masterInstance = await Master.deployed();
    let tokenControllerAdd  = await masterInstance.getLatestAddress(web3.utils.toHex("TC"));
    let tokenController = await TokenController.at(tokenControllerAdd);
    let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
    let plotusNewInstance = await Plotus.at(plotusNewAddress);
    const openMarkets = await plotusNewInstance.getOpenMarkets();
    marketInstance = await Market.at(openMarkets["_openMarkets"][0]);
    await increaseTime(10001);
    assert.ok(marketInstance);
    let nxms = await Master.deployed();
    let nxmToken = await PlotusToken.deployed();
    let address = await nxms.getLatestAddress(web3.utils.toHex("GV"));
    let plotusToken = await PlotusToken.deployed();
    let gv = await Governance.at(address);
    address = await nxms.getLatestAddress(web3.utils.toHex("PC"));
    let pc = await ProposalCategory.at(address);
    address = await nxms.getLatestAddress(web3.utils.toHex("MR"));
    let mr = await MemberRoles.at(address);
    let tc = await TokenController.at(await nxms.getLatestAddress(web3.utils.toHex("MR")));
    
    await plotusToken.approve(mr.address, "100000000000000000000000");
     
    await plotusToken.transfer(ab2, "50000000000000000000000");
    await plotusToken.transfer(ab3, "50000000000000000000000");
    await plotusToken.transfer(ab4, "50000000000000000000000");
    await plotusToken.transfer(dr1, "50000000000000000000000");
    await plotusToken.transfer(dr2, "50000000000000000000000");
    await plotusToken.transfer(dr3, "50000000000000000000000");
     
    await mr.addInitialABandDRMembers([ab2, ab3, ab4], [dr1, dr2, dr3], { from: ab1 });
    
    await increaseTime(7201);
    await marketInstance.calculatePredictionResult(1000);
    //can raise dispute in cooling period and stake
    await plotusToken.approve(marketInstance.address, "10000000000000000000000");
    await marketInstance.raiseDispute(14000,"raise dispute","this is short desc.","this is description","this is solution hash");
    let winningOption_af = await marketInstance.getMarketResults()
    console.log("winningOption",winningOption_af[0]/1)
    let proposalId = await gv.getProposalLength()-1;
    console.log("proposalId",proposalId/1)
    let userBalBefore = await plotusToken.balanceOf(ab1);
    console.log("balance before reject proposal",userBalBefore/1)
    await plotusToken.approve(tokenController.address, "100000000000000000000000");
    await tokenController.lock("0x4452","20000000000000000000000",(86400*20),{from : dr1});
    
    await plotusToken.approve(tokenController.address, "100000000000000000000000");
    await tokenController.lock("0x4452","20000000000000000000000",(86400*20),{from : dr2});
    
    await plotusToken.approve(tokenController.address, "100000000000000000000000");
    await tokenController.lock("0x4452","20000000000000000000000",(86400*20),{from : dr3});
    await gv.submitVote(proposalId, 0, {from:dr1});
    await gv.submitVote(proposalId, 0, {from:dr2});
    await gv.submitVote(proposalId, 0, {from:dr3});
    await increaseTime(9 * 86401);
    await gv.closeProposal(proposalId);
    await increaseTime(86401);
    let userBalAfter = await plotusToken.balanceOf(ab1);
    console.log("balance before reject proposal",userBalAfter/1)
    let winningOption_afterVote = await marketInstance.getMarketResults()
    console.log("winningOption After reject proposal",winningOption_afterVote[0]/1);
  });
});