
import { MessageSquare } from "lucide-react";

export default function ChatBox() {
    return <div className="w-full px-5 md:px-0 md:w-1/2 bg-red-0 mt-4 md:ml-4 rounded">
        <div className="flex space-x-2 justify-center items-center py-4 border-[1px] border-black border-opacity-10 rounded">
            <MessageSquare className="text-black" />
            <p className="text-black font-bold">Chats</p>
        </div>
        <div className="h-80  border-x-[1px] border-b-[1px] border-black border-opacity-10">
        </div>
        <div className="flex px-3 py-3 border-b-[1px] border-x-[1px] border-black border-opacity-10 space-x-2">
            <input type="text" placeholder="Type a message..." className="border-[1px] border-gray-200 rounded-md py-2 px-1 md:px-4 flex-1"/>
            <button className="px-2  bg-black rounded text-white">Send</button>
        </div>
    </div>
}