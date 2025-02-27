
import CreateGame from '@/components/create-game';
import { MessageSquare, Users2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold tracking-tighter">
            Play Tic Tac Toe in Real-Time
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge friends to a classic game of Tic Tac Toe with integrated chat.
            Play anywhere, anytime, with real-time updates.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <CreateGame />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Users2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiplayer Gaming</h3>
            <p className="text-muted-foreground">
              Play against friends in real-time. Create private game rooms and
              invite others to join.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Chat</h3>
            <p className="text-muted-foreground">
              Chat with your opponent while playing. Share strategies, banter, or
              just have fun conversations.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M4 12h16M12 4v16" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Classic Gameplay</h3>
            <p className="text-muted-foreground">
              Enjoy the timeless game of Tic Tac Toe with a modern twist.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Tic Tac Toe Live. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}