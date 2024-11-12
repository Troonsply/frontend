"use client";

import {FC, useEffect, useRef, useState} from 'react';

const RulesButton: FC = () => {
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
                className="bg-gray-300 px-4 py-2 rounded-md text-black
                 font-semibold w-36 shadow-lg transform
                 transition-transform duration-200 ease-in-out
                 hover:shadow-xl hover:scale-105
                 active:shadow-sm active:scale-95"
            >
                Rules
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-96 bg-white border border-gray-300 shadow-lg rounded-md p-6" ref={modalRef}>
                        <div className="text-black">
                            <p className="font-semibold mb-1 text-black">Rules:</p>
                            <span>- 3 different pools</span><br/>
                            <span>- Each tap increases the total prize fund of the pool</span><br/>
                            <span>- Random tap from 10 to 1000 receives the entire pool prize pool except for the 10% commission and transaction fee</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RulesButton;
