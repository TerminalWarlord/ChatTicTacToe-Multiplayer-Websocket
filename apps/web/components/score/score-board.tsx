import { Gamepad2, Trophy } from "lucide-react";

export default function ScoreBoard() {
    return <div className="flex shadow h-20 border-[0.7px] border-opacity-15 border-black rounded space-x-1 items-center justify-between px-5 my-4">
        <div className="flex justify-center items-center space-x-2">
            <Gamepad2 size={23} className="text-black" />
            <input placeholder="Player 1" className="h-10 border-2 rounded-md border-gray-300 px-2 py-1 text-gray-700 font-medium" />
        </div>
        <div className="flex space-x-1 justify-center items-center">
            <Trophy size={23} className="text-orange-300" />
            <p className="text-black text-xl font-bold">122</p>
        </div>

    </div>
}