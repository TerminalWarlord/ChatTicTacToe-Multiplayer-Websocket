"use client";

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react';

const CreateGame = () => {
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        const generateId = crypto.randomUUID();
        setRoomId(generateId);
    }, []);
    if(!roomId){
        return <></>;
    }

    return (
        <Link
            href={`/game/${roomId}`}
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
            Start Playing
            <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
    )
}

export default CreateGame