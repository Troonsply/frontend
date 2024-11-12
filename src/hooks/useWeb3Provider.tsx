"use client"

import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {$account} from '@/store/accounts';

declare global {
    interface Window{
        ethereum?:MetaMaskInpageProvider
    }
}
export interface IWeb3State {
    address: string | null;
    currentChain: number | null;
    signer: JsonRpcSigner | null;
    provider: BrowserProvider | null;
    isAuthenticated: boolean;
}

const useWeb3Provider = () => {
    const initialWeb3State = {
        address: null,
        currentChain: null,
        signer: null,
        provider: null,
        isAuthenticated: false,
    };

    const [state, setState] = useState<IWeb3State>(initialWeb3State);

    const connectWallet = useCallback(async () => {
        if (state.isAuthenticated) return;

        try {
            const { ethereum } = window;
            console.log('ethereum', ethereum)
            if (!ethereum) {
                return alert('No ethereum wallet found')
            }
            const provider = new ethers.BrowserProvider(ethereum);

            const accounts: string[] = await provider.send("eth_requestAccounts", []);
            $account.set(accounts[0])
            console.log('accounts', accounts)
            if (accounts.length > 0) {
                const signer = await provider.getSigner();
                const chain = Number((await provider.getNetwork()).chainId);

                setState({
                    ...state,
                    address: accounts[0],
                    signer,
                    currentChain: chain,
                    provider,
                    isAuthenticated: true,
                });

                localStorage.setItem("isAuthenticated", "true");
            }
        } catch {}
    }, [state]);

    const disconnect = () => {
        setState(initialWeb3State);
        localStorage.removeItem("isAuthenticated");
    };

    useEffect(() => {
        if (window == null) return;

        if (localStorage.hasOwnProperty("isAuthenticated")) {
            connectWallet();
        }
    }, [connectWallet, state.isAuthenticated]);

    useEffect(() => {
        if (typeof window?.ethereum === "undefined") return;

        window?.ethereum?.on("accountsChanged", (...accounts: unknown[]) => {
            setState({ ...state, address: (accounts as string[])[0] });
        });

        window.ethereum?.on("networkChanged", (network: unknown) => {
            setState({ ...state, currentChain: Number(network) });
        });

        return () => {
            window?.ethereum?.removeAllListeners();
        };
    }, [state]);

    return {
        connectWallet,
        disconnect,
        state,
    };
};

export default useWeb3Provider;