import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <svg
                className="w-5 h-5 text-primary-light mr-2"
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
              <h3 className="text-lg font-semibold">Environmental Impact Monitor</h3>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Helping you understand and reduce your carbon footprint through data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard">
                  <a className="text-neutral-400 hover:text-white transition-colors">Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/calculate">
                  <a className="text-neutral-400 hover:text-white transition-colors">Carbon Calculator</a>
                </Link>
              </li>
              <li>
                <Link href="/insights">
                  <a className="text-neutral-400 hover:text-white transition-colors">Activity Tracking</a>
                </Link>
              </li>
              <li>
                <Link href="/tips">
                  <a className="text-neutral-400 hover:text-white transition-colors">Personalized Tips</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Reports & Analytics
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Emissions Database
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Sustainability Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Carbon Offsetting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-neutral-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Environmental Impact Monitor. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-y-2 gap-x-4">
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
