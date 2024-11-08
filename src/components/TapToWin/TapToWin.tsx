import {FC} from 'react';
import Marquee from '@/components/Marquee/Marquee';
import TapButton from '@/components/TapButton/TapButton';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';

const TapToWin: FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white py-2.5">
            <Marquee text="Wallet ***jwp won 21 ETH! | Wallet ***nuf won 23 ETH! | Wallet ***583 won 0,99 ETH!"/>
            <ConnectWalletButton/>
            <div className="text-center my-8 flex-col justify-between">
                <div className="relative group">
                    <h1 className="text-5xl text-black mb-40 flex items-center justify-center">
                        Tap to win!
                        <span className="relative group -mt-8 -translate-y-1">
                            <p className="text-base w-8 h-8 flex items-center justify-center m-1 bg-gray-300 rounded-full cursor-pointer">{'\u262D'}</p>
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-300 text-black text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="font-semibold mb-1">Rules:</p>
                                <span>- 3 different pools</span><br/>
                                <span>- Each tap increases the total prize fund of the pool</span><br/>
                                <span>- Random tap from 10 to 1000 receives the entire pool prize pool except for the 10% commission and transaction fee</span>
                            </div>
                        </span>
                    </h1>
                </div>
                <div className="flex space-x-16 mt-2">
                    <TapButton label="1 ETH"/>
                    <TapButton label="0.1 ETH"/>
                    <TapButton label="0.01 ETH"/>
                </div>
            </div>

            <Marquee
                text="Wallet ***jwp tapped 1 ETH! | Wallet ***nuf tapped 0,1 ETH! | Wallet ***583 tapped 0,01 ETH!"/>
        </div>
    );
};

export default TapToWin;