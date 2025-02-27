import { Gamepad2,Copy } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function ScoreBoard({ isMyTurn }:
    { isMyTurn: boolean | undefined }) {

    const path = usePathname();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const gameLink = `${origin}${path}`;
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(gameLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const highlighter = "border-2 border-gray-500";

    return (
        <div>
            <div className="flex flex-col md:flex-row shadow h-20 border-[0.7px] border-opacity-15 border-black rounded md:space-x-1 items-center justify-between px-5 my-2">
                <div className="flex justify-center items-center md:space-x-2">
                    <Gamepad2 size={23} className="text-black" />
                    <input placeholder="You" className={`h-10 w-full sm:w-24 lg:w-full border-2 rounded-md border-gray-300 px-2 py-1 text-gray-700 font-medium ${isMyTurn ? highlighter : ""}`} />
                </div>
                <div className="flex justify-center items-center md:space-x-2 flex-row-reverse md:flex-row">
                    <input placeholder="Opponent" className={`h-10 w-full sm:w-24 lg:w-full border-2 rounded-md border-gray-300 px-2 py-1 text-gray-700 font-medium ${!isMyTurn ? highlighter : ""}`} />
                    <Gamepad2 size={23} className="text-black" />
                </div>
            </div>

            <div className="flex items-center space-x-2 my-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                        Link
                    </Label>
                    <Input id="link" value={gameLink} readOnly />
                </div>
                <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
                    <span className="sr-only">Copy</span>
                    <Copy />
                </Button>
                {copied && <span className="text-green-600 text-sm">Copied!</span>}
            </div>
        </div>
    );
}