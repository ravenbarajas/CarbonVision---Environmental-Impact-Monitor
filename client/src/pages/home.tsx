import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Home = () => {
  return (
    <section>
      <div className="py-12 md:py-24 lg:py-32 space-y-8 md:space-y-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              Track Your Environmental Impact
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Understand and reduce your carbon footprint with personalized insights and actionable recommendations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link href="/dashboard">
                <Button size="lg" className="text-base">
                  View Your Dashboard
                </Button>
              </Link>
              <Link href="/calculate">
                <Button size="lg" variant="outline" className="text-base">
                  Calculate Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6 text-center">
              <div className="flex justify-center">
                <svg
                  className="w-12 h-12 text-primary mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6v6l4 2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Track in Real-Time</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Log your daily activities and see the immediate impact on your carbon footprint with our intuitive tracker.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6 text-center">
              <div className="flex justify-center">
                <svg
                  className="w-12 h-12 text-primary mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12h5l2-8 2 4 2-2 4 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 12h4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Visualize Your Data</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Interactive charts and graphs help you understand your carbon footprint across different categories and over time.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6 text-center">
              <div className="flex justify-center">
                <svg
                  className="w-12 h-12 text-primary mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3a6 6 0 0 0-6 6c0 7 6 12 6 12s6-5 6-12a6 6 0 0 0-6-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9" r="1" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Get Personalized Tips</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Receive tailored recommendations to help you reduce your environmental impact based on your specific activities.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Start tracking your carbon footprint today and join thousands of people taking action for a more sustainable future.
              </p>
              <Link href="/calculate">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-neutral-100 hover:text-primary-dark"
                >
                  Start Calculating Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Environmental Impact Images */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 text-center mb-8">
            Environmental Sustainability in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg overflow-hidden h-60 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9" 
                alt="Solar panels on house roof promoting sustainable energy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-60 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b" 
                alt="Electric vehicle charging station showing green transportation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-60 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf" 
                alt="Organic garden with vegetables promoting sustainable food systems"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-60 bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
                alt="Clean beach landscape representing environmental conservation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
