'use client';

import {FC, useEffect, useRef, useState} from 'react';

const ConnectWalletButton: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <div className="relative flex justify-end w-full -mt-28 mr-2">
            <button
                onClick={toggleModal}
                className="bg-gray-300 px-4 py-2 rounded-md
                text-black font-semibold shadow-lg transform
                transition-transform duration-200 ease-in-out
                hover:shadow-xl hover:scale-105
                active:shadow-sm active:scale-95"
            >
                Connect wallet
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-96 bg-white border border-gray-300 shadow-lg rounded-md p-6" ref={modalRef}>
                        <h2 className="text-lg font-semibold text-center mb-4 text-black">Select Wallet</h2>
                        <button
                            className="w-full bg-blue-500 text-white py-3 mb-3 rounded-md text-lg hover:bg-blue-600 active:bg-blue-700">
                            Wallet 1
                        </button>
                        <button
                            className="w-full bg-blue-500 text-white py-3 mb-3 rounded-md text-lg hover:bg-blue-600 active:bg-blue-700">
                            Wallet 2
                        </button>
                        <button
                            className="w-full bg-blue-500 text-white py-3 mb-3 rounded-md text-lg hover:bg-blue-600 active:bg-blue-700">
                            Wallet 3
                        </button>
                        <button
                            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 active:bg-blue-700">
                            Wallet 4
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ConnectWalletButton;
