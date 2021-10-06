import { NowRequest, NowResponse } from "@vercel/node";
import BigNumber from "bignumber.js";
import { getContract } from "../utils/web3";
import chefABI from "../utils/abis/chef.json";

const getBalanceNumber = (balance: any, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  return displayBalance.toNumber();
};

const pending = async (pid: number, address: string) => {
  const chef = getContract(chefABI, "0x092c51b4736dee895eb5b64892dc83b230f02d82");
  const pending = await chef.methods.pendingKsf(pid, address).call();
  const poolInfo = await chef.methods.poolInfo(pid).call();
  return {
    pending: getBalanceNumber(new BigNumber(pending)),
    poolInfo,
  };
};

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const { address = "0x0F9399FC81DaC77908A2Dde54Bb87Ee2D17a3373", pid = "1" } = req.query;
  if (Array.isArray(pid)) {
    res.status(400).send({ error: "Parameter Incorrect" });
  } else {
    const data = await pending(Number(pid), address as string);
    res.status(200).send(data);
  }
};
