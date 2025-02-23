"use client";

import Image from "next/image";
import { useEffect, useState } from "react"
import Modal from "../ui/modal";
import { useRef } from "react";


const DUMMY_DATA = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const symbolMap: { "0": string; "X": string } = {
    "0": "/icons/zero.png",
    "X": "/icons/cross.png",
}

export default function Board({ gameId }: { gameId: string }) {
    const [gameState, setGameState] = useState(DUMMY_DATA);
    const modal = useRef(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [symbol, setSymbol] = useState("0");
    const [errors, setErrors] = useState<{ title: string, subtitle: string } | null>();
    const [isWinner, setIsWinner] = useState<boolean | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);

        ws.onopen = (ev) => {
            ws.send(JSON.stringify({
                type: "join",
                gameId: gameId

            }))
        }

        ws.onmessage = (ev) => {
            const data = JSON.parse(ev.data);

            if (data.type === 'allocateSymbol') {
                setSymbol(data.symbol);
            }
            else if (data.type === 'move') {
                setGameState(data.state);
                if (data.winner && data.symbol === symbol) {
                    setIsWinner(true);
                }

                console.log(isWinner, data);
            }
            else if (data.type === 'error') {
                // setGameState(data.state);
                console.log(data)
                console.log("HEueh  ")
                setErrors({ title: "Can't Join", subtitle: data.message });

                console.log(errors)
                if (!modal.current) {
                    return;
                }
                modal.current.open();
            }
        }

    }, []);

    function pickAGrid(row: number, col: number) {
        socket?.send(JSON.stringify({
            row,
            col,
            symbol,
            gameId,
            type: "move"
        }))

    }

    return <>
        {errors && <>
            <Modal title={errors.title} subtitle={errors.subtitle} ref={modal} />
        </>}

        {isWinner === true && <>
            <Modal title="YOU WON" subtitle="Congrats!" ref={modal} />
        </>}

        {isWinner === false && <>
            <Modal title="YOU LOST" subtitle="SORRY!" ref={modal} />
        </>}
        <div className="w-full border-2 border-gray-100 px-16 py-2 rounded-md">
            {gameState.map((arr, row) => {
                return <div className="flex items-center rounded-lg">
                    {arr.map((x, col) => {
                        return <button
                            className="border-[0.7px] border-opacity-15 border-black w-2/4 aspect-square bg-gray-200 flex justify-center items-center rounded m-0.5 text-3xl text-gray-600"
                            onClick={() => pickAGrid(row, col)}
                            disabled={gameState[row][col] !== ""}
                        >
                            {x === "" ? "" : <Image alt="Symbol" src={symbolMap[x as unknown as "0" | "X"] as unknown as string} width={100} height={100}></Image>}
                        </button>
                    })}
                </div>
            })}
        </div>
    </>
}