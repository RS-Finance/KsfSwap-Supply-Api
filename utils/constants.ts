import { ChainId, Token } from "ksfswapsdk";

// BEP-20 addresses.
export const KSF = "0x755d74d009f656ca1652cbdc135e3b6abfccc455";
export const WKCS = "0x4446Fc4eb47f2f6586f9fAAb68B3498F86C07521";
export const DEAD = "0x000000000000000000000000000000000000dEaD";
export const LOCKED = "0xc25830cc6ace29e5dedfab773da643f71f6f5dac";

// Contract addresses.
export const KSF_KCS_FARM = "0x3d15ac92c270b9c3c3bec77fb1f0f66f138b27d2";
export const MASTERCHEF_CONTRACT = "0x092c51b4736dee895eb5b64892dc83b230f02d82";
export const LOTTERY_CONTRACT = "0x3C3f2049cc17C136a604bE23cF7E42745edf3b91";
export const MULTICALL_CONTRACT = "0x912a0a624d2d357245aa81b19cd48d3717315b53";

// KsfSwap SDK Token.
export const KSF_TOKEN = new Token(ChainId.MAINNET, KSF, 18);
export const WKCS_TOKEN = new Token(ChainId.MAINNET, WKCS, 18);
export const KSF_KCS_TOKEN = new Token(ChainId.MAINNET, KSF_KCS_FARM, 18);
