const hre = require("hardhat");

async function main() {
  const factoryAddress='0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  const WETH = await hre.ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  await weth.deployed()
  console.log("WETH deployed to :",weth.address);
  const wethAddress=  weth.address
  
  const UniswapV2Router02 = await hre.ethers.getContractFactory("UniswapV2Router02");
  const uniswapV2Router02 = await UniswapV2Router02.deploy(factoryAddress , wethAddress);
  await uniswapV2Router02.deployed();
  console.log("UniswapV2Router02 deployed to:", uniswapV2Router02.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
