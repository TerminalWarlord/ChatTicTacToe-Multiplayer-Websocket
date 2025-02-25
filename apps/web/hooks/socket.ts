import { MessageContext } from "@/store/message-context";
import { Message } from "@/types/types";
import { useContext, useEffect, useState } from "react";


const DUMMY_DATA = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

export default function useSocket({ playerId, gameId }: { playerId: string, gameId: string }) {
    const [gameState, setGameState] = useState(DUMMY_DATA);
    const msgCtx = useContext(MessageContext);
    const [symbol, setSymbol] = useState();
    const [errors, setErrors] = useState<{ title: string, subtitle: string } | null>();
    const [isWinner, setIsWinner] = useState<{ finished: boolean, won?: boolean }>({ finished: false });

    const ws = msgCtx.socket;
    useEffect(() => {
        if (!ws) {
            return;
        }
        ws.onopen = (ev) => {
            ws.send(JSON.stringify({
                playerId,
                type: "join",
                gameId: gameId,

            }))
        }

        function closeSocket() {
            if (!ws) {
                return;
            }
            ws.close();
        }

        ws.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            if (data.type === 'allocateSymbol') {
                // console.log("ALLOCATING ", data.symbol);
                setSymbol(data.symbol);
                return;
            }
            else if (data.type === 'move') {
                setGameState(data.state);

                // console.log(data.playerId, playerId);
                if (data.winner && data.playerId === playerId) {
                    setIsWinner({
                        finished: true,
                        won: true
                    });
                }
                else if (data.winner) {
                    setIsWinner({
                        finished: true,
                        won: false
                    });
                }
                else {
                    return;
                }
            }
            else if (data.type === 'error') {
                console.log(data)
                console.log("HEueh  ")
                setErrors({ title: "Can't Join", subtitle: data.message });
                console.log(errors)
            }
            else if (data.type === 'chat') {
                const msg: Message = {
                    id: data.id,
                    gameId: data.gameId,
                    playerId: data.playerId,
                    message: data.message
                };

                msgCtx.sendMessage(msg);
                return;

            }
            closeSocket();
        }

        return () => {
            if (ws) {
                ws.close();
            }
        };


    }, [ws]);



    return {
        gameState,
        symbol,
        errors,
        isWinner,
        socket: msgCtx.socket
    }
}