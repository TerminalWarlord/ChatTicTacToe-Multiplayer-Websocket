import { MessageContextType } from "@/types/types";
import { createContext } from "react";




export const MessageContext = createContext<MessageContextType>({
    messages: [],
    socket: null,
    setSocket: ()=>{},
    sendMessage: () => { }
});



