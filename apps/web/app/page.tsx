import Board from "@/components/board/board";
import ChatBox from "@/components/chat/chat-box";
import ScoreBoard from "@/components/score/score-board";

export default function Home() {
  return (
    <div className="w-screen bg-white ">
      <div className="flex justify-center">
        <div className="flex w-3/4">
          {/* left */}
          <div className="w-2/3">
            {/* <div className="w-full h-20 bg-gray-400">SCORE</div> */}
            <ScoreBoard/>
            <Board />
          </div>
          {/* right */}
          {/* <div className="bg-gray-600 w-1/3">CHAT</div>
          <Cha */}
          <ChatBox/>
        </div>
      </div>


    </div>
  );
}
