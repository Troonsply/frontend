"use client"

import { useEffect, useState } from "react";
import useTapGameContract from "./useTapGameContract";

const useInfo = () => {
    const contract = useTapGameContract();
    const [lastMessage, setLastMessage] = useState<string | null>(null);
    const [lastGreeter, setLastGreeter] = useState<string | null>(null);

    useEffect(() => {
        if (!contract) return;
        let mounted = true;

        const getLastMessage = async () => {
            try {
                const response = await contract.getMessage();

                setLastMessage(response);
            } catch {}
        };

        const getLastGreeter = async () => {
            try {
                const response = await contract.getLastGreeter();

                setLastGreeter(response);
            } catch {}
        };

        if (mounted) {
            getLastMessage();
            getLastGreeter();
        }

        return () => {
            mounted = false;
        };
    }, [contract]);

    return { lastMessage, lastGreeter };
};

export default useInfo;