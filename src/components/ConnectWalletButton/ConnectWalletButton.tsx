"use client";

import {FC, useState} from 'react';

const ConnectWalletButton: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="relative flex justify-end w-full -mt-28">
            <button
                onClick={toggleModal}
                className="bg-gray-300 px-4 py-2 rounded-md text-black font-semibold"
            >
                Connect wallet
            </button>

            {isModalOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md p-4">
                    <button className="w-full bg-blue-500 text-white py-2 mb-2 rounded-md">Wallet 1</button>
                    <button className="w-full bg-blue-500 text-white py-2 mb-2 rounded-md">Wallet 2</button>
                    <button className="w-full bg-blue-500 text-white py-2 mb-2 rounded-md">Wallet 3</button>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md">Wallet 4</button>
                </div>
            )}
        </div>
    );
};

export default ConnectWalletButton;
