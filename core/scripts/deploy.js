
const hre = require("hardhat");

async function main() {
  var owner = (await hre.ethers.getSigner()).address
  const UniswapV2Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const uniswapV2Factory = await UniswapV2Factory.deploy(owner);
  await uniswapV2Factory.deployed();
  console.log("Factory deployed to:", uniswapV2Factory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
