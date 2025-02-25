
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useContext, useEffect, useRef } from "react";
import { MessageContext } from "@/store/message-context";
import { Message } from "@/types/types";

export default function ChatBox({ messages, gameId, playerId }: { messages: Message[], gameId: string, playerId: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const msgCtx = useContext(MessageContext);
    const messageEndRef = useRef<HTMLDivElement>(null);

    function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        console.log("CLICKED");
        if (!inputRef.current) {
            console.log("NO REF");
            return;
        }
        if (!msgCtx.socket) {
            console.log("socket null")
            return;
        }
        console.log("SENDING WS");
        msgCtx.socket?.send(JSON.stringify({
            gameId,
            playerId,
            type: "chat",
            message: inputRef.current.value
        }));

        // msgCtx.sendMessage({
        //     gameId,
        //     playerId,
        //     message: inputRef.current.value,
        // })
        inputRef.current.value = "";
    }


    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return <div className="w-full px-5 md:px-0 md:w-1/2 bg-red-0 mt-4 md:ml-4 rounded">
        <div className="flex space-x-2 justify-center items-center py-4 border-[1px] border-black border-opacity-10 rounded">
            <MessageSquare className="text-black" />
            <p className="text-black font-bold">Chats</p>
        </div>
        <ScrollArea className="h-80 border-x-[1px] border-b-[1px] border-black border-opacity-10 flex flex-col p-2 space-y-1.5">
            {messages.map(m => {
                const className = m.playerId !== playerId ? "flex justify-start" : "flex justify-end";
                const msgClass = "px-2 py-1 bg-black backdrop-blur rounded-md w-fit my-0.5" + (m.playerId !== playerId ? " bg-opacity-10" : " bg-opacity-100 text-white")
                return <div className={className} ref={messageEndRef} key={m.id}>
                    <p className={msgClass}>
                        {m.message}
                    </p>
                </div>

            })}

        </ScrollArea>

        <form
            className="flex px-3 py-3 border-b-[1px] border-x-[1px] border-black border-opacity-10 space-x-2"
            onSubmit={(e) => sendMessage(e)}
        >
            <input type="text" placeholder="Type a message..." className="border-[1px] border-gray-200 rounded-md py-2 px-1 md:px-4 flex-1" ref={inputRef} />
            <button className="px-2  bg-black rounded text-white">Send</button>
        </form>
    </div>
}