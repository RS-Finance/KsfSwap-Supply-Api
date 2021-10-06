import { NowRequest, NowResponse } from "@vercel/node";
import { getContract } from "../../utils/web3";
import bep20ABI from "../../utils/abis/bep20.json";
import { KSF } from "../../utils/constants";
import BigNumber from "bignumber.js";

const minimumBalance = 0.0001;

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const { address, block } = req.query;

  try {
    // Ksf balance in wallet.
    const ksfContract = getContract(bep20ABI, KSF, true);
    const ksfBalance = await ksfContract.methods.balanceOf(address).call(undefined, block);

    /**
     * This API is deprecated but is still used on snapshot.org. The new voting implementation uses Snapshot's API directly.
     * However, Snapshot's API calls this strategy to confirm voting power. Consequently in order for the new strategy to work
     * we need to return at least a positive number for any address queried.
     */
    const ksfBalanceAsBn = new BigNumber(ksfBalance);
    const adjustedKsfBalance = ksfBalanceAsBn.eq(0) ? minimumBalance : ksfBalanceAsBn.div(1e18).toNumber();

    res.json({ staked: adjustedKsfBalance });
  } catch (error) {
    res.json({ staked: minimumBalance });
  }
};
