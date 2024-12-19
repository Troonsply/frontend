"use client";

import {FC, useEffect, useState} from 'react';
import Marquee from "@/components/Marquee/Marquee";
import TapButton from "@/components/TapButton/TapButton";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import RulesButton from "@/components/RulesButton/RulesButton";
import { IWeb3Context, useWeb3Context } from "@/contexts/Web3ContextProvider";
import { $account } from "@/store/accounts";
import { useStore } from "@nanostores/react";
import Image from "next/image";
import accountAvatar from "@/images/account-avatar.svg";
import { ethers } from "ethers";
import { address } from "@/hooks/useTapGameContract";

const CONTRACT_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_developerWallet",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "developer",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "feeAmount",
                type: "uint256"
            }
        ],
        name: "DeveloperFeePaid",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "player",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tapCount",
                type: "uint256"
            }
        ],
        name: "Tapped",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "winner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "Winner",
        type: "event"
    },
    {
        inputs: [],
        name: "DEVELOPER_FEE_PERCENT",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "TAP_PRICE",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "developerWallet",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "getPoolBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "lastWinBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "lastWinner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "tap",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "tapCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalPool",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
const CONTRACT_ADDRESS = address;

const TapToWin: FC = () => {
    const { connectWallet } = useWeb3Context() as IWeb3Context;

    const [marqueeText, setMarqueeText] = useState<string>("Loading...");
    const [totalPool, setTotalPool] = useState<string>("0");
    const account = useStore($account);

    useEffect(() => {
        const fetchContractData = async () => {
            if (!window.ethereum) return;

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            try {
                const pool = await contract.totalPool();
                setTotalPool(ethers.formatEther(pool));
            } catch (error) {
                console.error("Error fetching total pool:", error);
            }

            contract.on("Tapped", (player: string, tapCount: ethers.BigNumberish) => {
                const newMessage = `Wallet ${player} tapped ${ethers.formatEther(tapCount)} ETH!`;
                setMarqueeText((prev) => `${newMessage} | ${prev}`);
            });

            contract.on("Winner", (winner: string, amount: ethers.BigNumberish) => {
                const newMessage = `Winner ${winner} won ${ethers.formatEther(amount)} ETH!`;
                setMarqueeText((prev) => `${newMessage} | ${prev}`);
            });
        };

        if (account) {
            fetchContractData();
        }

        return () => {
            const cleanupListeners = async () => {
                if (!window.ethereum) return;
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                contract.removeAllListeners("Tapped");
                contract.removeAllListeners("Winner");
            };
            cleanupListeners();
        };
    }, [account]);

    const handleSend = async (amount: number) => {
        try {
            if (!window.ethereum) {
                console.error("MetaMask is not installed.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const valueToSend = ethers.parseEther(amount.toString());
            const tx = await contract.tap({ value: valueToSend });

            console.log("Transaction sent:", tx.hash);
            await tx.wait();
            console.log("Transaction confirmed.");
        } catch (error) {
            console.error("Error while sending transaction:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white py-2.5">
            <Marquee text={marqueeText} />

            {account ? (
                <>
                    <div className="w-full flex justify-end items-end text-black -mt-16">
                        <Image
                            src={accountAvatar}
                            width={30}
                            height={30}
                            alt="Account Avatar"
                        />
                        <span className="w-36 overflow-ellipsis overflow-hidden">{account}</span>
                    </div>

                    <RulesButton />

                    <div className="text-center my-8 flex-col justify-between text-black">
                        <div className="relative group">
                            <h1 className="text-5xl text-black mb-40 flex items-center justify-center">
                                Tap to win!
                            </h1>
                        </div>
                        <p className="text-gray-600 mb-4">Total Pool: {totalPool} ETH</p>

                        <div className="flex space-x-16 mt-2">
                            <TapButton label="1 ETH" tapClick={() => handleSend(1)} />
                            <TapButton label="0.1 ETH" tapClick={() => handleSend(0.1)} />
                            <TapButton label="0.01 ETH" tapClick={() => handleSend(0.01)} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center mt-10">
                    <h2 className="text-2xl text-gray-700 mb-4">
                        Connect MetaMask to continue
                    </h2>
                    <ConnectWalletButton connectWallet={connectWallet} />
                </div>
            )}

            <Marquee text={marqueeText} />
        </div>
    );
};

export default TapToWin;