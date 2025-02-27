import { MessageContext } from "@/store/message-context";
import { Message } from "@/types/types";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


const DUMMY_DATA = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]


export default function useSocket({ playerId, gameId, isMyTurn, updateTurn, updateSymbol }: {
    playerId: string, 
    gameId: string,
    isMyTurn: boolean | undefined, 
    updateTurn: (state:boolean)=>void,
    updateSymbol: (sym: string)=>void
}) {
    const [gameState, setGameState] = useState(DUMMY_DATA);
    const msgCtx = useContext(MessageContext);
    // const [symbol, setSymbol] = useState();

    const [errors, setErrors] = useState<{ title: string, subtitle: string } | null>();
    const [isWinner, setIsWinner] = useState<{ finished: boolean, won?: boolean, draw?: boolean }>({ finished: false });

    const ws = msgCtx.socket;
    console.log(isMyTurn);

    // useEffect(() => {
        
    //     if (isMyTurn === undefined) {
    //         updateTurn(symbol==='0');
    //     }
    // }, [symbol]);

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

        // function closeSocket() {
        //     if (!ws) {
        //         return;
        //     }
        //     ws.close();
        // }

        ws.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            if (data.type === 'allocateSymbol') {
                // console.log("ALLOCATING ", data.symbol);
                updateSymbol(data.symbol);
                updateTurn(data.symbol==='0');
                return;
            }
            else if (data.type === 'move') {
                setGameState(data.state);
                if (data.playerId === playerId) {
                    console.log("should get changed to false");
                    updateTurn(false);
                }
                else {
                    console.log("should get changed to true");

                    updateTurn(true);
                }

                // console.log(data.playerId, playerId);
                if (data.draw) {
                    setIsWinner({
                        finished: true,
                        draw: true,
                    })
                }
                else if (data.winner && data.playerId === playerId) {
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
            // closeSocket();
        }

        return () => {
            if (ws) {
                ws.send(JSON.stringify({
                    gameId,
                    type: "close"
                }))
                // ws.close();
            }
        };


    }, [ws]);



    return {
        gameState,
        errors,
        isWinner,
        socket: msgCtx.socket
    }
}