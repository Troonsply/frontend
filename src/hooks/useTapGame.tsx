"use client"

import { useState } from "react";
import useTapGameContract from '@/hooks/useTapGameContract';

const useTapGame = () => {
    const contract = useTapGameContract();
    const [loading, setLoading] = useState(false);

    const greet = async (message: string) => {
        if (!contract) return;

        setLoading(true);

        try {
            const transaction = await contract.greet(message);

            await transaction.wait();
        } catch {
        } finally {
            setLoading(false);
        }
    };

    return { greet, loading };
};

export default useTapGame;