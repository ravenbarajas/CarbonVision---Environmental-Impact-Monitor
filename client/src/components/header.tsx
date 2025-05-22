import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-primary mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.71 9.47l4.29 4.3 4.29-4.3a1 1 0 0 1 1.42 1.42l-5 5a1 1 0 0 1-1.42 0l-5-5a1 1 0 1 1 1.42-1.42z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 10a6 6 0 0 1 8 0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="text-xl font-semibold text-neutral-800 dark:text-white">
              Environmental Impact Monitor
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard">
              <a className={`font-medium hover:text-primary transition-colors ${
                location === "/dashboard" ? "text-primary" : "text-neutral-800 dark:text-neutral-200"
              }`}>
                Dashboard
              </a>
            </Link>
            <Link href="/calculate">
              <a className={`font-medium hover:text-primary transition-colors ${
                location === "/calculate" ? "text-primary" : "text-neutral-800 dark:text-neutral-200"
              }`}>
                Calculate
              </a>
            </Link>
            <Link href="/insights">
              <a className={`font-medium hover:text-primary transition-colors ${
                location === "/insights" ? "text-primary" : "text-neutral-800 dark:text-neutral-200"
              }`}>
                Insights
              </a>
            </Link>
            <Link href="/tips">
              <a className={`font-medium hover:text-primary transition-colors ${
                location === "/tips" ? "text-primary" : "text-neutral-800 dark:text-neutral-200"
              }`}>
                Reduction Tips
              </a>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
