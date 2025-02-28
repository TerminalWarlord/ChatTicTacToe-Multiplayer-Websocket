"use client";

import React, { useEffect, useState } from "react"
import Board from "../board/board"
import ChatBox from "../chat/chat-box"
import ScoreBoard from "../score/score-board"
import { MessageContext } from "@/store/message-context"
import { Message } from "@/types/types";




const GameUI: React.FC<{ gameId: string, playerId: string }> = ({ gameId, playerId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [symbol, setSymbol] = useState<string | undefined>();
    const [isMyTurn, setIsMyTurn] = useState<boolean | undefined>();

    function handleTurns(state: boolean) {
        setIsMyTurn(state);
    }

    function updateSymbol(sym: string) {
        setSymbol(sym);
    }

    useEffect(() => {
        const ws = new WebSocket("wss://tictactoe.joybiswas.com/game/");
        setSocket(ws);
    }, []);


    function handleSendMessage(message: Message) {
        setMessages(prevState => {
            return [...prevState, message];
        });
    }
    console.log(messages);

    return <MessageContext.Provider value={{
        messages: messages,
        socket: socket,
        setSocket: setSocket,
        sendMessage: handleSendMessage
    }}>

        <div className="flex w-full  md:w-3/4 flex-col md:flex-row ">
            <div className="w-full  px-5 md:px-0 md:w-2/3">
                <ScoreBoard isMyTurn={isMyTurn} />
                <Board gameId={gameId} playerId={playerId} isMyTurn={isMyTurn} updateTurn={handleTurns} symbol={symbol} updateSymbol={updateSymbol} />
            </div>
            <ChatBox gameId={gameId} playerId={playerId} messages={messages} />
        </div>
    </MessageContext.Provider>
}

export default GameUI;