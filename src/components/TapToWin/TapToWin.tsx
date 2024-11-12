"use client"
import {FC, useMemo, useState} from 'react';
import Marquee from '@/components/Marquee/Marquee';
import TapButton from '@/components/TapButton/TapButton';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';
import RulesButton from '@/components/RulesButton/RulesButton';
import {IWeb3Context, useWeb3Context} from '@/contexts/Web3ContextProvider';
import useTapGame from '@/hooks/useTapGame';
import useInfo from '@/hooks/useInfo';

const BSCTChainID = 97;

const TapToWin: FC = () => {
    const {
        connectWallet,
        state: { currentChain },
    } = useWeb3Context() as IWeb3Context;

    const { lastMessage } = useInfo();
    const { greet} = useTapGame();

    const [newMessage] = useState<string>("");

    const correctNetwork = useMemo(() => {
        return currentChain === BSCTChainID;
    }, [currentChain]);

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        greet(newMessage);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white py-2.5">
            <Marquee
                text={!correctNetwork ? 'Wallet ***jwp tapped 1 ETH! | Wallet ***nuf tapped 0,1 ETH! | Wallet ***583 tapped 0,01 ETH!' : lastMessage ? lastMessage : "Loading..."}
            />
            <ConnectWalletButton connectWallet={connectWallet}/>
            <RulesButton/>
            <div className="text-center my-8 flex-col justify-between">
                <div className="relative group">
                    <h1 className="text-5xl text-black mb-40 flex items-center justify-center">
                        Tap to win!
                    </h1>
                </div>
                <div className="flex space-x-16 mt-2">
                    <TapButton label="1 ETH" tapClick={handleSubmit}/>
                    <TapButton label="0.1 ETH" tapClick={handleSubmit}/>
                    <TapButton label="0.01 ETH" tapClick={handleSubmit}/>
                </div>
            </div>

            <Marquee
                text={!correctNetwork ? 'Wallet ***jwp tapped 1 ETH! | Wallet ***nuf tapped 0,1 ETH! | Wallet ***583 tapped 0,01 ETH!' : lastMessage ? lastMessage : "Loading..."}
            />
        </div>
    );
};

export default TapToWin;