import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCarbonContext } from "@/context/carbon-context";
import { calculateTransportEmissions, formatCO2 } from "@/lib/utils";

const TransportForm = () => {
  const { addActivity } = useCarbonContext();
  const [transportType, setTransportType] = useState("Car");
  const [fuelType, setFuelType] = useState("Gasoline");
  const [distance, setDistance] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [frequency, setFrequency] = useState("One time");
  const [passengers, setPassengers] = useState(1);
  const [estimatedEmissions, setEstimatedEmissions] = useState(0);

  const calculateEmissions = () => {
    // Convert distance to km if in miles
    const distanceInKm = distanceUnit === "miles" ? distance * 1.60934 : distance;
    
    const emissions = calculateTransportEmissions(
      transportType,
      fuelType,
      distanceInKm,
      frequency,
      passengers
    );
    
    setEstimatedEmissions(emissions);
    return emissions;
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setDistance(value);
  };

  const handlePassengersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setPassengers(Math.max(1, Math.min(10, value)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emissions = calculateEmissions();
    
    addActivity({
      type: "transport",
      subtype: transportType,
      details: {
        fuelType,
        distance,
        distanceUnit,
        frequency,
        passengers
      },
      emissions,
      date: new Date()
    });
  };
  
  const handleCalculate = () => {
    calculateEmissions();
  };

  const handleReset = () => {
    setTransportType("Car");
    setFuelType("Gasoline");
    setDistance(0);
    setDistanceUnit("km");
    setFrequency("One time");
    setPassengers(1);
    setEstimatedEmissions(0);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transport Type */}
        <div>
          <Label htmlFor="transport-type">Type of Transport</Label>
          <Select 
            value={transportType} 
            onValueChange={setTransportType}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select transport type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Car">Car</SelectItem>
              <SelectItem value="Public Transport">Public Transport</SelectItem>
              <SelectItem value="Flight">Flight</SelectItem>
              <SelectItem value="Train">Train</SelectItem>
              <SelectItem value="Bike">Bike</SelectItem>
              <SelectItem value="Walking">Walking</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Fuel Type */}
        {transportType === "Car" && (
          <div>
            <Label htmlFor="fuel-type">Fuel Type</Label>
            <Select 
              value={fuelType} 
              onValueChange={setFuelType}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gasoline">Gasoline</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Plug-in Hybrid">Plug-in Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Distance */}
        <div>
          <Label htmlFor="distance">Distance</Label>
          <div className="flex mt-1">
            <Input
              id="distance"
              type="number"
              min="0"
              step="0.1"
              value={distance || ""}
              onChange={handleDistanceChange}
              className="rounded-r-none"
            />
            <Select 
              value={distanceUnit} 
              onValueChange={setDistanceUnit}
            >
              <SelectTrigger className="w-24 rounded-l-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">km</SelectItem>
                <SelectItem value="miles">miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Frequency */}
        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Select 
            value={frequency} 
            onValueChange={setFrequency}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="One time">One time</SelectItem>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Passengers */}
        {(transportType === "Car" || transportType === "Public Transport") && (
          <div>
            <Label htmlFor="passengers">Passengers</Label>
            <Input
              id="passengers"
              type="number"
              min="1"
              max="10"
              value={passengers}
              onChange={handlePassengersChange}
              className="mt-1"
            />
          </div>
        )}
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
                {frequency === "One time" ? "per trip" : `per ${frequency.toLowerCase()} trip`}
              </p>
            </div>
            <div>
              <div 
                className={`inline-flex items-center px-3 py-1 rounded-full 
                ${estimatedEmissions > 50 
                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" 
                  : estimatedEmissions > 10 
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
                  {estimatedEmissions > 50 
                    ? "High Impact" 
                    : estimatedEmissions > 10 
                      ? "Medium Impact" 
                      : "Low Impact"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Alternative Suggestions */}
          {transportType === "Car" && (
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <h5 className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Alternative Options
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
                      <path d="M8 7h8m-1 3H9m2 3h2"></path>
                      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                      <path d="M4 8h16"></path>
                      <path d="M8 4v4"></path>
                      <path d="M16 4v4"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Public Transport</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">
                    {formatCO2(estimatedEmissions * 0.25)}
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
                      <circle cx="5.5" cy="17.5" r="3.5"></circle>
                      <circle cx="18.5" cy="17.5" r="3.5"></circle>
                      <path d="M15 6h2a2 2 0 0 1 2 2v7h-2l-2-5H9l-2 5H5V8a2 2 0 0 1 2-2h4"></path>
                    </svg>
                    <span className="text-sm dark:text-neutral-300">Cycling</span>
                  </div>
                  <span className="text-sm font-medium dark:text-neutral-300">0 kg CO₂e</span>
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
            disabled={distance <= 0 || estimatedEmissions <= 0}
          >
            Add to Footprint
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TransportForm;
