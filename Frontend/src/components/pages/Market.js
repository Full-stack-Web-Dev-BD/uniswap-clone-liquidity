import { useEffect, useState } from "react";
import Web3 from "web3";
import { getWalletAddressOrConnect, web3 } from "../../wallet";
import Contract from "web3-eth-contract";
const Market = () => {
  const [tokenABalance, setTokenABalance] = useState(0)
  const [tokenBBalance, setTokenBBalance] = useState(0)
  const web3 = new Web3()
  useEffect(() => {
    start()
  }, [])

  const start = async (e) => {
    var acc = await getWalletAddressOrConnect();
    console.log("mywc is ", acc);
    if (typeof window.web3 !== "undefined") {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      var web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      window.web3 = new Web3(web3Provider);
    }
    Contract.setProvider(window.web3.currentProvider);
    var liquidity = new Contract(require("./Liquidity.json").abi, '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707');

    var tokena = new Contract(require("./TokenA.json").abi, '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');
    var tokenb = new Contract(require("./TokenB.json").abi, '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9');
    setTokenABalance(await tokena.methods.balanceOf(acc).call({ from: acc }))
    setTokenBBalance(await tokenb.methods.balanceOf(acc).call({ from: acc }))
  }
  
  const addLiquidity = async (e) => {
    var acc = await getWalletAddressOrConnect();
    console.log("mywc is ", acc);
    if (typeof window.web3 !== "undefined") {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      var web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      window.web3 = new Web3(web3Provider);
    }
    Contract.setProvider(window.web3.currentProvider);
    var lp  = new Contract(require("./Liquidity.json").abi, '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707');
    var tx =  await lp.methods.addLiquidity('0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9','0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9' , 20000, 20000).send({from:acc})
    console.log(tx)

  }
  return (
    <div>
      <div className="pt-4 text-center">
        <h4>Token A Balance : {tokenABalance} </h4>
        <h4>Token B Balance : {tokenBBalance} </h4>
        <button className="btn btn-success" onClick={e => addLiquidity(e)} >Add Liquidity </button>
      </div>
    </div>
  );
};
export default Market;
