
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import GameLifePage from "./pages/game/LifePage";
import GamePeoplePage from "./pages/game/PeoplePage";
import GameWorldPage from "./pages/game/WorldPage";
import GameActionsPage from "./pages/game/ActionsPage";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/game/life" component={GameLifePage} />
            <Route path="/game/people" component={GamePeoplePage} />
            <Route path="/game/world" component={GameWorldPage} />
            <Route path="/game/actions" component={GameActionsPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
