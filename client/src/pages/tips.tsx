import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tips = () => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Reduction Tips</h2>
        <p className="text-neutral-600 dark:text-neutral-400">Actionable ways to reduce your carbon footprint</p>
      </div>
      
      {/* Featured Tip */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md mb-8">
        <div className="md:flex items-center p-6">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-primary text-sm font-medium mb-4">
              Featured Tip
            </span>
            <h3 className="text-xl font-bold mb-2">Cutting Air Travel Impact</h3>
            <p className="mb-4">
              Air travel has one of the highest carbon impacts of all activities. A single international flight can contribute several tons of CO₂ to your footprint.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-white text-primary hover:bg-neutral-100">
                Learn More
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Save for Later
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080" 
              alt="Sustainable travel concept with map and compass" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
      
      {/* Tips Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Transportation */}
        <Card className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-secondary mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6" />
                <path d="M6 9h11" />
              </svg>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Transportation</h3>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Use public transportation
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Consider carpooling
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Switch to an electric vehicle
              </li>
            </ul>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Potential Savings: Up to 1.2 tonnes CO₂e yearly
            </p>
          </CardContent>
          <div className="bg-neutral-50 dark:bg-neutral-800 px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              View All Transportation Tips
            </a>
          </div>
        </Card>
        
        {/* Energy */}
        <Card className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-yellow-500 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M13 3l-2 13l-2 -3l-7 6l1 -4l6 -4l-3 -4z" />
                <path d="M11 16l-2 3l3 2l5 -6l-3 -4l-2 6" />
              </svg>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Energy</h3>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Switch to renewable energy
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Improve home insulation
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Use energy efficient appliances
              </li>
            </ul>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Potential Savings: Up to 0.9 tonnes CO₂e yearly
            </p>
          </CardContent>
          <div className="bg-neutral-50 dark:bg-neutral-800 px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              View All Energy Tips
            </a>
          </div>
        </Card>
        
        {/* Diet */}
        <Card className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-accent mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 11v3a5 5 0 0 0 5 5h10a5 5 0 0 0 5 -5v-12h-5" />
                <path d="M12 6a2 2 0 0 1 -2 -2c0 -1.1 .9 -2 2 -2z" />
                <path d="M19 6a2 2 0 0 1 -2 -2c0 -1.1 .9 -2 2 -2z" />
                <path d="M8 4h8" />
              </svg>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Diet</h3>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Reduce meat consumption
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Buy local produce
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Minimize food waste
              </li>
            </ul>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Potential Savings: Up to 0.8 tonnes CO₂e yearly
            </p>
          </CardContent>
          <div className="bg-neutral-50 dark:bg-neutral-800 px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              View All Diet Tips
            </a>
          </div>
        </Card>
        
        {/* Shopping */}
        <Card className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-red-500 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M6 9h11a6 6 0 0 1 3.709 10.756l-.2 .224a4 4 0 0 1 -2.909 1.02h-11.6a4 4 0 0 1 -2.905 -1.02l-.2 -.224a6 6 0 0 1 2.905 -10.756" />
                <path d="M12 4v5" />
              </svg>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Shopping</h3>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Buy second-hand items
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Choose products with less packaging
              </li>
              <li className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-primary mr-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Repair instead of replace
              </li>
            </ul>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Potential Savings: Up to 0.5 tonnes CO₂e yearly
            </p>
          </CardContent>
          <div className="bg-neutral-50 dark:bg-neutral-800 px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              View All Shopping Tips
            </a>
          </div>
        </Card>
      </div>
      
      {/* Success Stories */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Success Stories</CardTitle>
          <Button variant="link" size="sm" className="text-primary">
            See All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Story 1 */}
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9" 
                alt="Person inspecting solar panels on roof" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h4 className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                  Sarah's Solar Journey
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Sarah reduced her carbon footprint by 65% by installing solar panels and making simple lifestyle changes.
                </p>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                  Read Her Story
                </a>
              </div>
            </div>
            
            {/* Story 2 */}
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8" 
                alt="Person tending to an urban garden with vegetables" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h4 className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                  Mark's Urban Garden
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Mark started growing his own food and reduced his food-related emissions by 40% in just one year.
                </p>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                  Read His Story
                </a>
              </div>
            </div>
            
            {/* Story 3 */}
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1553260169-e7fa64dc9e48" 
                alt="Person charging an electric vehicle at a charging station" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h4 className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                  The Lee Family's EV Switch
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  The Lee family cut their transportation emissions by 90% by switching to an electric vehicle.
                </p>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                  Read Their Story
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Tips;
