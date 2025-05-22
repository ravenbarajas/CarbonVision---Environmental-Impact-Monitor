import { Link, useLocation } from "wouter";

const MobileNavigation = () => {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50 dark:bg-neutral-800 dark:border-neutral-700">
      <div className="flex justify-around">
        <Link href="/dashboard">
          <a className={`flex flex-col items-center py-2 ${
            location === "/dashboard" ? "text-primary" : "text-neutral-500 dark:text-neutral-400"
          } hover:text-primary`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="text-xs mt-1">Dashboard</span>
          </a>
        </Link>
        <Link href="/calculate">
          <a className={`flex flex-col items-center py-2 ${
            location === "/calculate" ? "text-primary" : "text-neutral-500 dark:text-neutral-400"
          } hover:text-primary`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z"></path>
              <path d="M9 7h6"></path>
              <path d="M9 11h6"></path>
              <path d="M9 15h6"></path>
            </svg>
            <span className="text-xs mt-1">Calculate</span>
          </a>
        </Link>
        <Link href="/insights">
          <a className={`flex flex-col items-center py-2 ${
            location === "/insights" ? "text-primary" : "text-neutral-500 dark:text-neutral-400"
          } hover:text-primary`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12h5l2-8 2 4 2-2 4 12"></path>
              <path d="M18 12h4"></path>
            </svg>
            <span className="text-xs mt-1">Insights</span>
          </a>
        </Link>
        <Link href="/tips">
          <a className={`flex flex-col items-center py-2 ${
            location === "/tips" ? "text-primary" : "text-neutral-500 dark:text-neutral-400"
          } hover:text-primary`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0-6 6c0 7 6 12 6 12s6-5 6-12a6 6 0 0 0-6-6"></path>
              <circle cx="12" cy="9" r="1"></circle>
            </svg>
            <span className="text-xs mt-1">Tips</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
