import GameUI from "@/components/main-game/game-ui";

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const gameId = (await params).gameId;
  const playerId = crypto.randomUUID();
  return (
    <div className="w-screen bg-white ">
      <div className="flex justify-center">
        <GameUI gameId={gameId} playerId={playerId} />
      </div>


    </div>
  );
}
