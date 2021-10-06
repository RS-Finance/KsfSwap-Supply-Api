import BigNumber from "bignumber.js";
import { getContract } from "./web3";
import { KSF, DEAD, LOCKED } from "./constants";
import bep20 from "./abis/bep20.json";

const contract = getContract(bep20, KSF);

export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await contract.methods.totalSupply().call();

  return new BigNumber(supply);
};

export const getBurnedSupply = async (): Promise<BigNumber> => {
  const balance = await contract.methods.balanceOf(DEAD).call();

  return new BigNumber(balance);
};

export const getLockedSupply = async (): Promise<BigNumber> => {
  const balance = await contract.methods.balanceOf(LOCKED).call();

  return new BigNumber(balance);
};