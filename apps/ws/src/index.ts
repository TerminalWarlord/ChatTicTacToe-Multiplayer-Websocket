import { WebSocketServer } from "ws";


const ws = new WebSocketServer({port: 8080});



ws.on("connection", (socket, req)=>{

    socket.on("message", (data)=>{
        console.log(data);
        socket.send("pong");
    })
})
