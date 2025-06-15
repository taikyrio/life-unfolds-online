
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import GameLifePage from "./pages/game/LifePage";
import GamePeoplePage from "./pages/game/PeoplePage";
import GameWorldPage from "./pages/game/WorldPage";
import GameActionsPage from "./pages/game/ActionsPage";
import NotFound from "./pages/NotFound";
import "./styles/mobile.css";

const queryClient = new QueryClient();

const App = () => {
  // Check if it's desktop
  const isDesktop = window.innerWidth >= 769;

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center p-8 max-w-lg">
          <div className="text-8xl mb-6">📱</div>
          <h1 className="text-4xl font-bold mb-4">Mobile Only Game</h1>
          <p className="text-xl opacity-80 mb-6">
            This life simulation game is designed exclusively for mobile devices. 
            Please open this link on your phone or tablet to play!
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-sm opacity-70">
              Scan QR code or visit this URL on your mobile device
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <div className="min-h-screen h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 safe-area-top mobile-container">
            <Toaster />
            <Sonner />
            <Router>
              <Switch>
                <Route path="/" component={Index} />
                <Route path="/game/life" component={GameLifePage} />
                <Route path="/game/people" component={GamePeoplePage} />
                <Route path="/game/world" component={GameWorldPage} />
                <Route path="/game/actions" component={GameActionsPage} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
