import { WebSocket, WebSocketServer } from "ws";
import { getWinner } from "./utils/helper";


const ws = new WebSocketServer({ port: 8080 });



interface gameDetails {
    id: string;
    ws: WebSocket[];
    state: string[][];
    prevSymbol: string,
    finished: boolean
}

const games: gameDetails[] = [];

ws.on("connection", (socket, req) => {

    socket.on("message", (data) => {
        const parsedData = JSON.parse(data as unknown as string);

        if (parsedData.type === "join") {
            console.log("JOINED")
            const { gameId } = parsedData;
            const gameIdx = games.findIndex(g => g.id === gameId);
            console.log(gameIdx);
            if (gameIdx === -1) {
                games.push({
                    id: parsedData.gameId,
                    ws: [socket],
                    state: Array(3).fill(null).map(() => Array(3).fill("")),
                    prevSymbol: "X",
                    finished: false
                });

                socket.send(JSON.stringify({
                    type: "allocateSymbol",
                    symbol: "0"
                }))
                return;
            }
            else {
                if (games[gameIdx]?.ws.length == 2) {
                    socket.send(JSON.stringify({
                        type: "error",
                        message: "No slot for a third player in this game. Create a new game"
                    }))
                    return;
                }
                games[gameIdx]?.ws.push(socket);
                socket.send(JSON.stringify({
                    type: "allocateSymbol",
                    symbol: "X"
                }))
                return;
            }

        }
        else if (parsedData.type === "move") {
            const { symbol, row, col, gameId }: { symbol: string, row: number, col: number, gameId: string } = parsedData;
            const game = games.find(u => u.id === gameId);
            if (!game?.state || row === undefined || col === undefined) {
                return;
            }
            if (game.prevSymbol === symbol || game.finished) {
                return;
            }
            if (row >= 0 && row < game.state.length) {
                const currentRow = game.state[row];
                if (currentRow && col >= 0 && col < currentRow.length) {
                    currentRow[col] = symbol;
                    game.prevSymbol = symbol;
                }
            }
            const isWinner = getWinner(game.state);
            if (isWinner) {
                game.finished = true;
            }
            game.ws.map(sc => {
                sc.send(JSON.stringify({
                    symbol,
                    type: "move",
                    state: game.state,
                    winner: isWinner,
                }));
            })
        }
    })
})
