"use client";

import {FC} from 'react';

interface TapButtonProps {
    label: string;
    tapClick:(e: any) => Promise<void>;
}

const TapButton: FC<TapButtonProps> = ({ tapClick, label }) => {

    return (
        <div className="flex flex-col items-center">
            <button
                className="
          w-52 h-52 bg-red-500 rounded-full text-black text-3xl font-bold
          shadow-lg transform transition-transform duration-200 ease-in-out
          hover:shadow-xl hover:scale-105
          active:shadow-sm active:scale-95
        "
                onClick={tapClick}
            >
                TAP
            </button>
            <div className="text-sm text-black mt-2">{label}</div>
        </div>
    );
};

export default TapButton;
