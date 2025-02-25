import { Dispatch, SetStateAction } from "react";


export interface Message {
    id: string,
    gameId: string;
    playerId: string;
    message: string;
}


export interface MessageContextType {
    messages: Message[],
    socket: WebSocket | null,
    setSocket: Dispatch<SetStateAction<WebSocket | null>>,
    sendMessage: (message: Message) => void
}