"use client";
import {FC} from 'react';

interface MarqueeProps {
    text: string;
}

const Marquee: FC<MarqueeProps> = ({ text }) => {
    return (
        <div className="w-full overflow-hidden bg-white py-2 border-y-black border border-solid">
            <div className="animate-marquee whitespace-nowrap text-black">
                {text}
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
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Marquee;
