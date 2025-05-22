import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCarbonContext } from "@/context/carbon-context";
import { calculateShoppingEmissions, formatCO2 } from "@/lib/utils";

const ShoppingForm = () => {
  const { addActivity } = useCarbonContext();
  const [clothingItems, setClothingItems] = useState(0);
  const [electronicsItems, setElectronicsItems] = useState(0);
  const [otherItems, setOtherItems] = useState(0);
  const [secondHand, setSecondHand] = useState(false);
  const [estimatedEmissions, setEstimatedEmissions] = useState(0);

  const calculateEmissions = () => {
    const emissions = calculateShoppingEmissions(
      clothingItems,
      electronicsItems,
      otherItems,
      secondHand
    );
    
    setEstimatedEmissions(emissions);
    return emissions;
  };

  const handleClothingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setClothingItems(Math.max(0, value));
  };

  const handleElectronicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setElectronicsItems(Math.max(0, value));
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setOtherItems(Math.max(0, value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emissions = calculateEmissions();
    
    addActivity({
      type: "shopping",
      subtype: "General Shopping",
      details: {
        clothingItems,
        electronicsItems,
        otherItems,
        secondHand
      },
      emissions,
      date: new Date()
    });
  };
  
  const handleCalculate = () => {
    calculateEmissions();
  };

  const handleReset = () => {
    setClothingItems(0);
    setElectronicsItems(0);
    setOtherItems(0);
    setSecondHand(false);
    setEstimatedEmissions(0);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clothing Items */}
        <div>
          <Label htmlFor="clothing-items">Clothing Items</Label>
          <Input
            id="clothing-items"
            type="number"
            min="0"
            value={clothingItems || ""}
            onChange={handleClothingChange}
            className="mt-1"
          />
          <p className="text-xs text-neutral-500 mt-1 dark:text-neutral-400">
            Number of clothing items purchased
          </p>
        </div>
        
        {/* Electronics Items */}
        <div>
          <Label htmlFor="electronics-items">Electronics Items</Label>
          <Input
            id="electronics-items"
            type="number"
            min="0"
            value={electronicsItems || ""}
            onChange={handleElectronicsChange}
            className="mt-1"
          />
          <p className="text-xs text-neutral-500 mt-1 dark:text-neutral-400">
            Number of electronic devices purchased
          </p>
        </div>
        
        {/* Other Items */}
        <div>
          <Label htmlFor="other-items">Other Items</Label>
          <Input
            id="other-items"
            type="number"
            min="0"
            value={otherItems || ""}
            onChange={handleOtherChange}
            className="mt-1"
          />
          <p className="text-xs text-neutral-500 mt-1 dark:text-neutral-400">
            Number of other items purchased
          </p>
        </div>
      </div>
      
      {/* Second-hand Option */}
      <div className="flex items-center space-x-2">
        <Switch 
          id="second-hand" 
          checked={secondHand} 
          onCheckedChange={setSecondHand} 
        />
        <Label htmlFor="second-hand">Purchased items are second-hand/refurbished</Label>
      </div>
      
      {/* Impact Preview */}
      {estimatedEmissions > 0 && (
        <div className="bg-neutral-100 rounded-lg p-4 mt-6 dark:bg-neutral-800">
          <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
            Estimated Impact
          </h4>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                {formatCO2(estimatedEmissions)}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Shopping emissions
              </p>
            </div>
            <div>
              <div 
                className={`inline-flex items-center px-3 py-1 rounded-full 
                ${estimatedEmissions > 150 
                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" 
                  : estimatedEmissions > 50 
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
                    : estimatedEmissions > 50 
                      ? "Medium Impact" 
                      : "Low Impact"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Shopping Suggestions */}
          {!secondHand && estimatedEmissions > 0 && (
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <h5 className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Reduction Tips
              </h5>
              <div className="space-y-2">
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
                      <path d="M9 20h6a2 2 0 0 0 2-2v-2H7v2a2 2 0 0 0 2 2Z"></path>
                      <path d="M3 12h6l1-2h4l1 2h6"></path>
                      <path d="M11.8 7.9 10 7V4l-7 4 7 4v-3l1.8-.9"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Buy Second-hand</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">
                    -{formatCO2(estimatedEmissions * 0.7)}
                  </span>
                </div>
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
                      <path d="M8.8 20v-4.1l1.9 1.9"></path>
                      <path d="M11.6 12.4 15 9"></path>
                      <path d="M20 4 9 15"></path>
                      <path d="m15 9 5-5"></path>
                      <path d="M4 20h4.1"></path>
                      <path d="M4 15.9V20"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Repair and Reuse</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">
                    -{formatCO2(estimatedEmissions * 0.9)}
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
            disabled={(clothingItems + electronicsItems + otherItems <= 0) || estimatedEmissions <= 0}
          >
            Add to Footprint
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ShoppingForm;
