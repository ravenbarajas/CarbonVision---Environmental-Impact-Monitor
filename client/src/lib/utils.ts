import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCO2 = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} tonnes CO₂e`;
  }
  return `${value.toFixed(1)} kg CO₂e`;
};

export const formatPercentage = (value: number, includeSign = true) => {
  const formatted = Math.abs(value).toFixed(0) + '%';
  if (includeSign) {
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  }
  return formatted;
};

// Calculate emissions for transport
export const calculateTransportEmissions = (
  type: string,
  fuelType: string,
  distance: number,
  frequency: string,
  passengers: number
): number => {
  let emissionFactor = 0;
  
  // Emission factors in kg CO2e per km
  switch (type) {
    case 'Car':
      switch (fuelType) {
        case 'Gasoline': emissionFactor = 0.192; break;
        case 'Diesel': emissionFactor = 0.171; break;
        case 'Electric': emissionFactor = 0.053; break;
        case 'Hybrid': emissionFactor = 0.112; break;
        case 'Plug-in Hybrid': emissionFactor = 0.092; break;
        default: emissionFactor = 0.192;
      }
      // Adjust for passengers (shared emissions)
      emissionFactor = emissionFactor / Math.max(1, passengers);
      break;
    case 'Public Transport': emissionFactor = 0.041; break;
    case 'Flight': emissionFactor = 0.255; break;
    case 'Train': emissionFactor = 0.037; break;
    case 'Bike': emissionFactor = 0; break;
    case 'Walking': emissionFactor = 0; break;
    default: emissionFactor = 0.1;
  }
  
  let totalEmissions = distance * emissionFactor;
  
  // Adjust for frequency
  switch (frequency) {
    case 'Daily': totalEmissions *= 30; break; // Assuming 30 days in a month
    case 'Weekly': totalEmissions *= 4; break; // Assuming 4 weeks in a month
    case 'Monthly': totalEmissions *= 1; break;
    case 'One time': totalEmissions *= 1; break;
    default: totalEmissions *= 1;
  }
  
  return totalEmissions;
};

// Calculate emissions for energy
export const calculateEnergyEmissions = (
  type: string,
  amount: number,
  unit: string,
  renewable: boolean
): number => {
  let emissionFactor = 0;
  
  // Emission factors
  switch (type) {
    case 'Electricity':
      emissionFactor = 0.233; // kg CO2e per kWh
      if (renewable) emissionFactor *= 0.1; // 90% reduction for renewable
      break;
    case 'Natural Gas':
      emissionFactor = 0.184; // kg CO2e per kWh
      break;
    case 'Heating Oil':
      emissionFactor = 0.247; // kg CO2e per kWh
      break;
    default:
      emissionFactor = 0.2;
  }
  
  // Convert to kWh if needed
  let convertedAmount = amount;
  if (unit === 'm³' && type === 'Natural Gas') {
    convertedAmount = amount * 10.55; // Convert m³ to kWh for natural gas
  }
  
  return convertedAmount * emissionFactor;
};

// Calculate emissions for diet
export const calculateDietEmissions = (
  dietType: string,
  redMeatFrequency: number,
  dairyFrequency: number,
  localFood: number
): number => {
  let baseEmissions = 0;
  
  // Base emissions by diet type (kg CO2e per day)
  switch (dietType) {
    case 'Meat-heavy': baseEmissions = 7.19; break;
    case 'Average': baseEmissions = 5.63; break;
    case 'Vegetarian': baseEmissions = 3.81; break;
    case 'Vegan': baseEmissions = 2.89; break;
    default: baseEmissions = 5.63;
  }
  
  // Adjust for red meat frequency (weekly servings impact)
  if (dietType !== 'Vegetarian' && dietType !== 'Vegan') {
    baseEmissions += (redMeatFrequency - 3) * 0.5; // Baseline is 3 servings
  }
  
  // Adjust for dairy frequency (for vegetarians and average diets)
  if (dietType !== 'Vegan') {
    baseEmissions += (dairyFrequency - 7) * 0.2; // Baseline is daily (7 servings)
  }
  
  // Adjust for local food percentage (reduction)
  baseEmissions *= (1 - (localFood * 0.002)); // Up to 20% reduction for 100% local
  
  // Monthly emissions
  return baseEmissions * 30;
};

// Calculate emissions for shopping
export const calculateShoppingEmissions = (
  clothingItems: number,
  electronicsItems: number,
  otherItems: number,
  secondHand: boolean
): number => {
  // Base emission factors (kg CO2e per item)
  const clothingFactor = secondHand ? 6 : 20;
  const electronicsFactor = secondHand ? 30 : 100;
  const otherFactor = secondHand ? 3 : 10;
  
  return (clothingItems * clothingFactor) + 
         (electronicsItems * electronicsFactor) + 
         (otherItems * otherFactor);
};
