// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUniswap.sol";

contract Liquidity {
  address private constant FACTORY = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
  address private constant ROUTER = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;
  address private constant WETH = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;

  event Log(string message, uint val);

  function addLiquidity(
    address _tokenA,
    address _tokenB,
    uint _amountA,
    uint _amountB
  ) external {
    IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
    IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

    IERC20(_tokenA).approve(ROUTER, _amountA);
    IERC20(_tokenB).approve(ROUTER, _amountB);

    (uint amountA, uint amountB, uint liquidity) =
      IUniswapV2Router(ROUTER).addLiquidity(
        _tokenA,
        _tokenB,
        _amountA,
        _amountB,
        0,
        0,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
    emit Log("liquidity", liquidity);
  }

  function removeLiquidity(address _tokenA, address _tokenB) external {
    address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

    uint liquidity = IERC20(pair).balanceOf(address(this));
    IERC20(pair).approve(ROUTER, liquidity);

    (uint amountA, uint amountB) =
      IUniswapV2Router(ROUTER).removeLiquidity(
        _tokenA,
        _tokenB,
        liquidity,
        1,
        1,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
  }
}