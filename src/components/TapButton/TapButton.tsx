"use client";

import {FC} from 'react';

interface TapButtonProps {
    label: string;
}

const TapButton: FC<TapButtonProps> = ({ label }) => {
    return (
        <div>
            <button className="w-52 h-52 bg-red-500 rounded-full text-black text-3xl">
                TAP
            </button>
            <div className="text-sm text-black">{label}</div>
        </div>
    );
};

export default TapButton;
