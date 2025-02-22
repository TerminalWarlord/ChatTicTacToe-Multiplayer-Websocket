
import { MessageSquare } from "lucide-react";

export default function ChatBox() {
    return <div className="w-1/3 bg-red-0 mt-4 ml-4 rounded">
        <div className="flex space-x-2 justify-center items-center py-4 border-[1px] border-black border-opacity-10">
            <MessageSquare className="text-black" />
            <p className="text-black font-bold">Chats</p>
        </div>
        <div className="h-80  border-x-[1px] border-b-[1px] border-black border-opacity-10">
        </div>
        <div className="flex px-3 py-4 border-b-[1px] border-x-[1px] border-black border-opacity-10">
            <input type="text" placeholder="Type a message..." className="border-[1px] border-gray-200 rounded-md py-2 px-4 flex-1"/>
            <button className="px-2 py-2 bg-black rounded">Send</button>
        </div>
    </div>
}