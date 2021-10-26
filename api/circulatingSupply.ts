import { NowRequest, NowResponse } from "@vercel/node";
import { getBurnedSupply, getTotalSupply, getLockedSupply } from "../utils/supply";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  let burnedSupply = await getBurnedSupply();
  burnedSupply = burnedSupply.div(1e18);

  let lockedSupply = await getLockedSupply();
  lockedSupply = lockedSupply.div(1e18);

  const circulatingSupply = totalSupply.minus(burnedSupply).minus(lockedSupply);

  res.json({
    circulatingSupply: circulatingSupply.toNumber(),
  });
};
