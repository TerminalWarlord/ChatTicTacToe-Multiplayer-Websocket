"use client";

import Image from "next/image";
import { useEffect } from "react"
import Modal from "../ui/modal";
import { useRef } from "react";
import useSocket from "@/hooks/socket";

const symbolMap: { "0": string; "X": string } = {
    "0": "/icons/zero.png",
    "X": "/icons/cross.png",
}

export default function Board({ gameId, playerId, isMyTurn, updateTurn, symbol, updateSymbol }: { gameId: string, playerId: string, isMyTurn: boolean | undefined, updateTurn: (state: boolean) => void, symbol: string | undefined, updateSymbol: (sym: string) => void }) {
    const modal = useRef<{ open: () => void; close: () => void } | null>(null);
    const { errors, gameState, isWinner, socket } = useSocket({ playerId, gameId, isMyTurn, updateTurn, updateSymbol });
    console.log(isMyTurn);

    useEffect(() => {
        function openModal() {
            if (!modal.current) {
                console.error("Modal ref is not assigned.");
                return;
            }
            modal.current.open();
        }

        if (errors) {
            openModal();
        }

        if (isWinner.finished) {
            openModal();
        }
    }, [errors, isWinner]);



    function pickAGrid(row: number, col: number) {
        socket?.send(JSON.stringify({
            playerId,
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


        {isWinner.finished && <Modal
            title={isWinner.draw ? "Match Draw!" : (isWinner.won ? "You Won!" : "You Lost!")}
            subtitle={isWinner.draw ? "There was no winner. " : (isWinner.won ? "Congratulations! You have won!" : "Sorry! You have lost!")}
            ref={modal} />

        }
        <div className="w-full border-2 border-gray-100 px-16 py-2 rounded-md">
            {gameState.map((arr, row) => {
                return <div key={row} className="flex items-center rounded-lg">
                    {arr.map((x, col) => {
                        return <button
                            key={`${row}-${col}`}
                            className="border-[0.7px] border-opacity-15 border-black w-2/4 aspect-square bg-gray-200 flex justify-center items-center rounded m-0.5 text-3xl text-gray-600 disabled:cursor-not-allowed"
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