import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Activity types
export type ActivityType = "transport" | "energy" | "diet" | "shopping";

export interface Activity {
  id?: number;
  type: ActivityType;
  subtype: string;
  details: any;
  emissions: number;
  date: Date;
}

// Metrics interface
interface Metrics {
  totalEmissions: number;
  totalEmissionsChange: number;
  transportEmissions: number;
  transportEmissionsChange: number;
  energyEmissions: number;
  energyEmissionsChange: number;
  dietEmissions: number;
  dietEmissionsChange: number;
  shoppingEmissions: number;
  shoppingEmissionsChange: number;
}

// Chart data interfaces
interface EmissionsBreakdownItem {
  name: string;
  value: number;
  percentage: number;
}

interface EmissionsTrendItem {
  name: string;
  emissions: number;
}

interface ComparisonItem {
  name: string;
  emissions: number;
}

interface CarbonContextType {
  activities: Activity[];
  metrics: Metrics;
  emissionsData: EmissionsBreakdownItem[];
  emissionsTrend: EmissionsTrendItem[];
  comparisonData: ComparisonItem[];
  addActivity: (activity: Activity) => Promise<void>;
  removeActivity: (id: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

// Default metrics state
const defaultMetrics: Metrics = {
  totalEmissions: 3.6,
  totalEmissionsChange: 12,
  transportEmissions: 1.8,
  transportEmissionsChange: 8,
  energyEmissions: 0.9,
  energyEmissionsChange: -5,
  dietEmissions: 0.7,
  dietEmissionsChange: -3,
  shoppingEmissions: 0.2,
  shoppingEmissionsChange: 1
};

// Create context
const CarbonContext = createContext<CarbonContextType | undefined>(undefined);

export const CarbonProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [metrics, setMetrics] = useState<Metrics>(defaultMetrics);
  const [emissionsData, setEmissionsData] = useState<EmissionsBreakdownItem[]>([]);
  const [emissionsTrend, setEmissionsTrend] = useState<EmissionsTrendItem[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch all data
  const fetchData = async () => {
    try {
      // Fetch activities
      const activitiesResponse = await fetch("/api/activities");
      if (!activitiesResponse.ok) throw new Error("Failed to fetch activities");
      const activitiesData = await activitiesResponse.json();
      setActivities(activitiesData);
      
      // Fetch metrics
      const metricsResponse = await fetch("/api/metrics");
      if (!metricsResponse.ok) throw new Error("Failed to fetch metrics");
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData);
      
      // Fetch emissions breakdown data
      const breakdownResponse = await fetch("/api/chart/emissions-breakdown");
      if (!breakdownResponse.ok) throw new Error("Failed to fetch emissions breakdown");
      const breakdownData = await breakdownResponse.json();
      setEmissionsData(breakdownData);
      
      // Fetch emissions trend data
      const trendResponse = await fetch("/api/chart/emissions-trend?view=weekly");
      if (!trendResponse.ok) throw new Error("Failed to fetch emissions trend");
      const trendData = await trendResponse.json();
      setEmissionsTrend(trendData);
      
      // Fetch comparison data
      const comparisonResponse = await fetch("/api/chart/comparison");
      if (!comparisonResponse.ok) throw new Error("Failed to fetch comparison data");
      const comparisonData = await comparisonResponse.json();
      setComparisonData(comparisonData);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load carbon footprint data. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };
  
  // Add a new activity
  const addActivity = async (activity: Activity) => {
    try {
      const response = await apiRequest("POST", "/api/activities", activity);
      if (!response.ok) throw new Error("Failed to add activity");
      
      toast({
        title: "Activity added",
        description: "Your carbon footprint has been updated."
      });
      
      // Refresh data after adding activity
      await fetchData();
    } catch (error) {
      console.error("Error adding activity:", error);
      toast({
        title: "Error",
        description: "Failed to add activity. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Remove an activity
  const removeActivity = async (id: number) => {
    try {
      const response = await apiRequest("DELETE", `/api/activities/${id}`);
      if (!response.ok) throw new Error("Failed to remove activity");
      
      toast({
        title: "Activity removed",
        description: "Your carbon footprint has been updated."
      });
      
      // Refresh data after removing activity
      await fetchData();
    } catch (error) {
      console.error("Error removing activity:", error);
      toast({
        title: "Error",
        description: "Failed to remove activity. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Refresh all data
  const refreshData = async () => {
    setLoading(true);
    await fetchData();
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  // Handle loading state
  if (loading && activities.length === 0) {
    // Replace with sample data to avoid empty state
    setActivities([
      {
        id: 1,
        type: "transport",
        subtype: "Car",
        details: {
          fuelType: "Gasoline",
          distance: 35,
          distanceUnit: "km",
          frequency: "Daily",
          passengers: 1
        },
        emissions: 8200,
        date: new Date(Date.now() - 86400000 * 2) // 2 days ago
      },
      {
        id: 2,
        type: "energy",
        subtype: "Electricity",
        details: {
          amount: 180,
          unit: "kWh",
          renewable: false
        },
        emissions: 32400,
        date: new Date(Date.now() - 86400000 * 5) // 5 days ago
      },
      {
        id: 3,
        type: "diet",
        subtype: "Average",
        details: {
          redMeatFrequency: 2,
          dairyFrequency: 7,
          localFood: 20
        },
        emissions: 12600,
        date: new Date(Date.now() - 86400000 * 7) // 7 days ago
      }
    ]);
  }
  
  return (
    <CarbonContext.Provider
      value={{
        activities,
        metrics,
        emissionsData,
        emissionsTrend,
        comparisonData,
        addActivity,
        removeActivity,
        refreshData
      }}
    >
      {children}
    </CarbonContext.Provider>
  );
};

export const useCarbonContext = () => {
  const context = useContext(CarbonContext);
  if (context === undefined) {
    throw new Error("useCarbonContext must be used within a CarbonProvider");
  }
  return context;
};
