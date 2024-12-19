"use client"

import { Contract } from "ethers";
import { useMemo } from "react";
import ABI from "@/abis/TapGame.json";
import {IWeb3Context, useWeb3Context} from '@/contexts/Web3ContextProvider';

export const address = "0xe9575E07Dc3d8f328A44D829010199a74176DA22";

const useTapGameContract = () => {
    const { state } = useWeb3Context() as IWeb3Context;

    return useMemo(
        () => state.signer && new Contract(address, ABI, state.signer),
        [state.signer]
    );
};

export default useTapGameContract;