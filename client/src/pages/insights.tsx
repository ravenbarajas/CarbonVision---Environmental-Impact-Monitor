import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCarbonContext } from "@/context/carbon-context";
import { formatCO2 } from "@/lib/utils";

const Insights = () => {
  const { activities } = useCarbonContext();
  const [activeView, setActiveView] = useState<string>("all");

  // Format the activity date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "transport":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        );
      case "energy":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        );
      case "diet":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        );
      case "shopping":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        );
    }
  };

  // Get color based on activity type
  const getActivityColor = (type: string) => {
    switch (type) {
      case "transport":
        return "bg-secondary-light text-white";
      case "energy":
        return "bg-yellow-500 text-white";
      case "diet":
        return "bg-accent-light text-white";
      case "shopping":
        return "bg-red-400 text-white";
      default:
        return "bg-neutral-500 text-white";
    }
  };

  // Filter activities based on active view
  const filteredActivities = activeView === "all" 
    ? activities 
    : activities.filter(activity => activity.type === activeView);

  // Sort activities by date (newest first)
  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get activity subtype display name
  const getActivitySubtype = (activity: any) => {
    if (activity.type === "transport") {
      return `${activity.subtype} Trip`;
    } else if (activity.type === "energy") {
      return `${activity.subtype} Usage`;
    } else if (activity.type === "diet") {
      return `Food Consumption (${activity.subtype})`;
    } else if (activity.type === "shopping") {
      return `${activity.subtype}`;
    }
    return activity.subtype;
  };

  // Get activity details as string
  const getActivityDetails = (activity: any) => {
    if (activity.type === "transport") {
      return `${activity.details.distance} ${activity.details.distanceUnit} ${activity.details.frequency.toLowerCase() !== "one time" ? activity.details.frequency.toLowerCase() : ""}`;
    } else if (activity.type === "energy") {
      return `${activity.details.amount} ${activity.details.unit}`;
    } else if (activity.type === "diet") {
      if (activity.details.redMeatFrequency) {
        return `Red meat ${activity.details.redMeatFrequency} times per week`;
      }
      return `${activity.subtype} diet`;
    } else if (activity.type === "shopping") {
      const items = [];
      if (activity.details.clothingItems) items.push(`${activity.details.clothingItems} clothing items`);
      if (activity.details.electronicsItems) items.push(`${activity.details.electronicsItems} electronics`);
      if (activity.details.otherItems) items.push(`${activity.details.otherItems} other items`);
      return items.join(", ") || "Various items";
    }
    return "";
  };

  // Get activity category
  const getActivityCategory = (activity: any) => {
    if (activity.type === "transport") {
      return activity.details.frequency === "Daily" ? "Commuting" : "Travel";
    } else if (activity.type === "energy") {
      return "Home Energy";
    } else if (activity.type === "diet") {
      return "Diet";
    } else if (activity.type === "shopping") {
      return "Shopping";
    }
    return activity.type;
  };

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Insights & Activity</h2>
        <p className="text-neutral-600 dark:text-neutral-400">Track your activities and see their impact</p>
      </div>
      
      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Recent Activities */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant={activeView === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveView("all")}
                >
                  All
                </Button>
                <Button 
                  variant={activeView === "transport" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveView("transport")}
                >
                  Transport
                </Button>
                <Button 
                  variant={activeView === "energy" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveView("energy")}
                >
                  Energy
                </Button>
                <Button 
                  variant={activeView === "diet" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveView("diet")}
                >
                  Diet
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedActivities.length > 0 ? (
                  sortedActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    >
                      <div 
                        className={`h-10 w-10 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                              {getActivitySubtype(activity)}
                            </h4>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                              {getActivityDetails(activity)}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                            {formatCO2(activity.emissions)}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-neutral-500 dark:text-neutral-500">
                            {formatDate(activity.date)}
                          </span>
                          <span className="mx-2 text-neutral-300 dark:text-neutral-600">•</span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-500">
                            {getActivityCategory(activity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-neutral-500 dark:text-neutral-400">No activities found.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveView("all")}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Carbon Hotspots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Carbon Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Areas with the highest impact on your carbon footprint
              </p>
              
              <div className="space-y-4">
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
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
                        <path d="M19 12h2L12 3L3 12h2" />
                        <path d="M19 12v9H5v-9" />
                        <path d="M11 12h2" />
                        <path d="M9 12v5h6v-5" />
                      </svg>
                      <h4 className="text-base font-medium text-neutral-800 dark:text-neutral-200">Air Travel</h4>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      Critical
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    Your recent flight to New York contributed to 32% of your quarterly emissions.
                  </p>
                  <div>
                    <h5 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Reduction Options:
                    </h5>
                    <ul className="list-disc list-inside text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>Consider train travel for shorter distances</li>
                      <li>Offset your flights through verified carbon projects</li>
                      <li>Combine trips to reduce frequency of air travel</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-orange-500 mr-2" 
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
                      <h4 className="text-base font-medium text-neutral-800 dark:text-neutral-200">
                        Daily Commuting
                      </h4>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                      High
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    Your car-based commute accounts for 28% of your monthly transportation emissions.
                  </p>
                  <div>
                    <h5 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Reduction Options:
                    </h5>
                    <ul className="list-disc list-inside text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>Use public transportation 2-3 days per week</li>
                      <li>Consider carpooling with colleagues</li>
                      <li>Work from home when possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Sidebar */}
        <div>
          {/* Progress & Goals */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Monthly Goal */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Monthly Goal
                  </span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">75% Complete</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="mt-1 flex justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Current: 240 kg CO₂e
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Target: 320 kg CO₂e
                  </span>
                </div>
              </div>
              
              {/* Year-over-Year */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Year-over-Year Reduction
                  </span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">-18%</span>
                </div>
                <Progress value={18} className="h-2 bg-neutral-200 dark:bg-neutral-700">
                  <div className="h-full bg-green-500 rounded-full" />
                </Progress>
                <div className="mt-1 flex justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Last Year: 4.4 tonnes
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Current: 3.6 tonnes
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Sustainability Tips */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Personalized Tips</CardTitle>
              <Button variant="ghost" size="sm">
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2 mt-0.5" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M13 3L12 9v7.5m-6.2-3.31a6.5 6.5 0 0 0 10.4 0"/>
                      <path d="M12 3c.66 0 1.33.1 2 .28 3.37.94 5.97 3.6 6.75 7.04.18.74.18 1.54.06 2.32-.12.8-.38 1.59-.7 2.36"/>
                      <path d="M12 3a10 10 0 0 0-2 .28 8.3 8.3 0 0 0-2.09.84c-.79.5-1.46 1.13-2.01 1.92-1.14 1.56-1.79 3.6-1.85 5.66v.01c0 2.67 1.08 5.02 2.86 6.62"/>
                      <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Switch to Renewable Energy
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        Based on your energy usage, switching to a renewable provider could reduce your footprint by 0.7 tonnes per year.
                      </p>
                      <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs font-medium text-primary dark:text-primary">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2 mt-0.5" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="5.5" cy="17.5" r="3.5"/>
                      <circle cx="18.5" cy="17.5" r="3.5"/>
                      <path d="M15 6h2a2 2 0 0 1 2 2v7h-2l-2-5H9l-2 5H5V8a2 2 0 0 1 2-2h4"/>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Bike to Work Challenge
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        Your commute is 8 km - perfect for cycling! Try biking to work twice a week to save 22 kg of CO₂e weekly.
                      </p>
                      <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs font-medium text-primary dark:text-primary">
                        Accept Challenge
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary mr-2 mt-0.5" 
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
                    <div>
                      <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Meatless Mondays
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        Reducing meat consumption one day per week can lower your food emissions by 15%.
                      </p>
                      <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs font-medium text-primary dark:text-primary">
                        Get Recipes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Insights;
