import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileNavigation from "@/components/mobile-navigation";
import Dashboard from "@/pages/dashboard";
import Calculate from "@/pages/calculate";
import Insights from "@/pages/insights";
import Tips from "@/pages/tips";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/calculate" component={Calculate} />
      <Route path="/insights" component={Insights} />
      <Route path="/tips" component={Tips} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Router />
            </div>
          </main>
          <Footer />
          <MobileNavigation />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
