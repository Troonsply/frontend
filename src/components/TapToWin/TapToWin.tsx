import {FC} from 'react';
import Marquee from '@/components/Marquee/Marquee';
import TapButton from '@/components/TapButton/TapButton';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';

const TapToWin: FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white py-2.5">
            <Marquee text="Wallet ***jwp won 21 ETH! | Wallet ***nuf won 23 ETH! | Wallet ***583 won 0,99 ETH!" />
            <ConnectWalletButton />
            <div className="text-center my-8 flex-col justify-between">
                <h1 className="text-5xl text-black mb-40">Tap to win!</h1>
                <div className="flex space-x-16 mt-2">
                    <TapButton label="1 ETH" />
                    <TapButton label="0.1 ETH" />
                    <TapButton label="0.01 ETH" />
                </div>
            </div>

            <Marquee text="Wallet ***jwp tapped 1 ETH! | Wallet ***nuf tapped 0,1 ETH! | Wallet ***583 tapped 0,01 ETH!" />
        </div>
    );
};

export default TapToWin;