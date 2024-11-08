"use client";
import { FC } from 'react';

interface MarqueeProps {
    text: string;
}

const Marquee: FC<MarqueeProps> = ({ text }) => {
    return (
        <div className="w-full overflow-hidden bg-white py-2 border-y border-black">
            <div className="animate-marquee whitespace-nowrap text-black flex">
                <span className="mr-8">{text}</span>
                <span className="mr-8">{text}</span>
                <span>{text}</span>
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                .animate-marquee {
                    display: flex;
                    animation: marquee 15s linear infinite;
                    min-width: 100%;
                }
            `}</style>
        </div>
    );
};

export default Marquee;

