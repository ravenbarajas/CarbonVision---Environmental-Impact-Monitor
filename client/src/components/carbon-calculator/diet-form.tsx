import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useCarbonContext } from "@/context/carbon-context";
import { calculateDietEmissions, formatCO2 } from "@/lib/utils";

const DietForm = () => {
  const { addActivity } = useCarbonContext();
  const [dietType, setDietType] = useState("Average");
  const [redMeatFrequency, setRedMeatFrequency] = useState(3); // Weekly servings
  const [dairyFrequency, setDairyFrequency] = useState(7); // Weekly servings
  const [localFood, setLocalFood] = useState(20); // Percentage
  const [estimatedEmissions, setEstimatedEmissions] = useState(0);

  const calculateEmissions = () => {
    const emissions = calculateDietEmissions(
      dietType,
      redMeatFrequency,
      dairyFrequency,
      localFood
    );
    
    setEstimatedEmissions(emissions);
    return emissions;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emissions = calculateEmissions();
    
    addActivity({
      type: "diet",
      subtype: dietType,
      details: {
        redMeatFrequency,
        dairyFrequency,
        localFood
      },
      emissions,
      date: new Date()
    });
  };
  
  const handleCalculate = () => {
    calculateEmissions();
  };

  const handleReset = () => {
    setDietType("Average");
    setRedMeatFrequency(3);
    setDairyFrequency(7);
    setLocalFood(20);
    setEstimatedEmissions(0);
  };
  
  const getRedMeatLabel = (frequency: number) => {
    if (frequency === 0) return "Never";
    if (frequency === 1) return "Once a week";
    if (frequency === 7) return "Daily";
    return `${frequency} times a week`;
  };
  
  const getDairyLabel = (frequency: number) => {
    if (frequency === 0) return "Never";
    if (frequency === 1) return "Once a week";
    if (frequency === 7) return "Daily";
    if (frequency > 7) return "Multiple times daily";
    return `${frequency} times a week`;
  };
  
  const getLocalFoodLabel = (percentage: number) => {
    return `${percentage}% locally sourced`;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="diet-type">Diet Type</Label>
        <Select 
          value={dietType} 
          onValueChange={setDietType}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select diet type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Meat-heavy">Meat-heavy</SelectItem>
            <SelectItem value="Average">Average (Mixed Diet)</SelectItem>
            <SelectItem value="Vegetarian">Vegetarian</SelectItem>
            <SelectItem value="Vegan">Vegan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {dietType !== "Vegetarian" && dietType !== "Vegan" && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="red-meat-frequency">Red Meat Consumption</Label>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {getRedMeatLabel(redMeatFrequency)}
            </span>
          </div>
          <Slider 
            id="red-meat-frequency"
            min={0} 
            max={7} 
            step={1} 
            value={[redMeatFrequency]} 
            onValueChange={(values) => setRedMeatFrequency(values[0])} 
          />
        </div>
      )}
      
      {dietType !== "Vegan" && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="dairy-frequency">Dairy Consumption</Label>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {getDairyLabel(dairyFrequency)}
            </span>
          </div>
          <Slider 
            id="dairy-frequency"
            min={0} 
            max={14} 
            step={1} 
            value={[dairyFrequency]} 
            onValueChange={(values) => setDairyFrequency(values[0])} 
          />
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="local-food">Local Food Percentage</Label>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {getLocalFoodLabel(localFood)}
          </span>
        </div>
        <Slider 
          id="local-food"
          min={0} 
          max={100} 
          step={5} 
          value={[localFood]} 
          onValueChange={(values) => setLocalFood(values[0])} 
        />
      </div>
      
      {/* Impact Preview */}
      {estimatedEmissions > 0 && (
        <div className="bg-neutral-100 rounded-lg p-4 mt-6 dark:bg-neutral-800">
          <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
            Estimated Monthly Impact
          </h4>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                {formatCO2(estimatedEmissions)}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Monthly food emissions
              </p>
            </div>
            <div>
              <div 
                className={`inline-flex items-center px-3 py-1 rounded-full 
                ${estimatedEmissions > 150 
                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" 
                  : estimatedEmissions > 100 
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" 
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span className="text-xs font-medium">
                  {estimatedEmissions > 150 
                    ? "High Impact" 
                    : estimatedEmissions > 100 
                      ? "Medium Impact" 
                      : "Low Impact"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Diet Comparisons */}
          {dietType !== "Vegan" && (
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <h5 className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Diet Comparisons
              </h5>
              <div className="space-y-2">
                {dietType !== "Vegetarian" && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-primary mr-1" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M15 11h.01"></path>
                        <path d="M11 15h.01"></path>
                        <path d="M16 16h.01"></path>
                        <path d="M2 9a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3 1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z"></path>
                        <path d="M7 9v8a3 3 0 0 0 6 0v-4"></path>
                        <circle cx="9" cy="11" r=".5"></circle>
                        <circle cx="13" cy="11" r=".5"></circle>
                      </svg>
                      <span className="text-sm dark:text-neutral-300">Vegetarian Diet</span>
                    </div>
                    <span className="text-sm font-medium dark:text-neutral-300">
                      {formatCO2(estimatedEmissions * 0.7)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-primary mr-1" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="M14.5 9.5 12 12"></path>
                      <path d="m16.25 6 1.5 1.5"></path>
                      <path d="M19 10h-1.5"></path>
                      <path d="M16.25 14l1.5-1.5"></path>
                      <path d="M14.5 14.5 12 12"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Vegan Diet</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">
                    {formatCO2(estimatedEmissions * 0.5)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCalculate}
        >
          Calculate Impact
        </Button>
        
        <div className="flex space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button 
            type="submit"
            disabled={estimatedEmissions <= 0}
          >
            Add to Footprint
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DietForm;
