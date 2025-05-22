import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCarbonContext } from "@/context/carbon-context";
import { calculateEnergyEmissions, formatCO2 } from "@/lib/utils";

const EnergyForm = () => {
  const { addActivity } = useCarbonContext();
  const [energyType, setEnergyType] = useState("Electricity");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("kWh");
  const [renewable, setRenewable] = useState(false);
  const [estimatedEmissions, setEstimatedEmissions] = useState(0);

  const calculateEmissions = () => {
    const emissions = calculateEnergyEmissions(
      energyType,
      amount,
      unit,
      renewable
    );
    
    setEstimatedEmissions(emissions);
    return emissions;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emissions = calculateEmissions();
    
    addActivity({
      type: "energy",
      subtype: energyType,
      details: {
        amount,
        unit,
        renewable
      },
      emissions,
      date: new Date()
    });
  };
  
  const handleCalculate = () => {
    calculateEmissions();
  };

  const handleReset = () => {
    setEnergyType("Electricity");
    setAmount(0);
    setUnit("kWh");
    setRenewable(false);
    setEstimatedEmissions(0);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Energy Type */}
        <div>
          <Label htmlFor="energy-type">Type of Energy</Label>
          <Select 
            value={energyType} 
            onValueChange={setEnergyType}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select energy type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electricity">Electricity</SelectItem>
              <SelectItem value="Natural Gas">Natural Gas</SelectItem>
              <SelectItem value="Heating Oil">Heating Oil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Amount and Unit */}
        <div>
          <Label htmlFor="amount">Consumption Amount</Label>
          <div className="flex mt-1">
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.1"
              value={amount || ""}
              onChange={handleAmountChange}
              className="rounded-r-none"
            />
            <Select 
              value={unit} 
              onValueChange={setUnit}
            >
              <SelectTrigger className="w-24 rounded-l-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kWh">kWh</SelectItem>
                {energyType === "Natural Gas" && <SelectItem value="m³">m³</SelectItem>}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Renewable Energy Option */}
      {energyType === "Electricity" && (
        <div className="flex items-center space-x-2">
          <Switch 
            id="renewable-energy" 
            checked={renewable} 
            onCheckedChange={setRenewable} 
          />
          <Label htmlFor="renewable-energy">Renewable Energy Source</Label>
        </div>
      )}
      
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
                for this energy usage
              </p>
            </div>
            <div>
              <div 
                className={`inline-flex items-center px-3 py-1 rounded-full 
                ${estimatedEmissions > 100 
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
                  {estimatedEmissions > 100 
                    ? "High Impact" 
                    : estimatedEmissions > 50 
                      ? "Medium Impact" 
                      : "Low Impact"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Suggestions */}
          {energyType === "Electricity" && !renewable && (
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
                      <path d="M12 3v10"></path>
                      <path d="m19 10-7 7-7-7"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Switch to Renewable Energy</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">
                    -{formatCO2(estimatedEmissions * 0.9)}
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
                      <path d="M8 4h13v9H8z"></path>
                      <path d="M4 8v7h3a4 4 0 0 0 4-4V8z"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Use Energy Efficient Appliances</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">
                    -{formatCO2(estimatedEmissions * 0.3)}
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
            disabled={amount <= 0 || estimatedEmissions <= 0}
          >
            Add to Footprint
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EnergyForm;
