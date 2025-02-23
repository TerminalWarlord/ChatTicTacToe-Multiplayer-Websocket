import Board from "@/components/board/board";
import ChatBox from "@/components/chat/chat-box";
import ScoreBoard from "@/components/score/score-board";

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const gameId = (await params).gameId;
  return (
    <div className="w-screen bg-white ">
      <div className="flex justify-center">
        <div className="flex w-full  md:w-3/4 flex-col md:flex-row ">
          {/* left */}
          <div className="w-full  px-5 md:px-0 md:w-2/3">
            {/* <div className="w-full h-20 bg-gray-400">SCORE</div> */}
            <ScoreBoard />
            <Board gameId={gameId} />
          </div>
          {/* right */}
          {/* <div className="bg-gray-600 w-1/3">CHAT</div>
          <Cha */}
          <ChatBox />
        </div>
      </div>


    </div>
  );
}
