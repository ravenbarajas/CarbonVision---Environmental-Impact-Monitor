import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCarbonActivitySchema, insertGoalSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Middleware to handle Zod validation errors
  const validateRequest = (schema: z.ZodType<any, any>) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        next(error);
      }
    };
  };

  // Carbon Activities Endpoints
  
  // Get all activities for a user
  apiRouter.get("/activities", async (req, res) => {
    // For demo purposes, we'll use user ID 1
    const userId = 1;
    const activities = await storage.getCarbonActivities(userId);
    res.json(activities);
  });
  
  // Get activities by type
  apiRouter.get("/activities/type/:type", async (req, res) => {
    const userId = 1;
    const { type } = req.params;
    const activities = await storage.getCarbonActivitiesByType(userId, type);
    res.json(activities);
  });
  
  // Get activities by date range
  apiRouter.get("/activities/date-range", async (req, res) => {
    const userId = 1;
    const startDateParam = req.query.startDate as string;
    const endDateParam = req.query.endDate as string;
    
    if (!startDateParam || !endDateParam) {
      return res.status(400).json({ message: "startDate and endDate query parameters are required" });
    }
    
    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    
    const activities = await storage.getCarbonActivitiesByDateRange(userId, startDate, endDate);
    res.json(activities);
  });
  
  // Create a new activity
  apiRouter.post("/activities", validateRequest(insertCarbonActivitySchema), async (req, res) => {
    // For demo purposes, we'll use user ID 1
    const userId = 1;
    const activity = await storage.createCarbonActivity({
      ...req.body,
      userId
    });
    res.status(201).json(activity);
  });
  
  // Delete an activity
  apiRouter.delete("/activities/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }
    
    const success = await storage.deleteCarbonActivity(id);
    
    if (!success) {
      return res.status(404).json({ message: "Activity not found" });
    }
    
    res.status(204).end();
  });
  
  // Goals Endpoints
  
  // Get all goals for a user
  apiRouter.get("/goals", async (req, res) => {
    // For demo purposes, we'll use user ID 1
    const userId = 1;
    const goals = await storage.getGoals(userId);
    res.json(goals);
  });
  
  // Create a new goal
  apiRouter.post("/goals", validateRequest(insertGoalSchema), async (req, res) => {
    // For demo purposes, we'll use user ID 1
    const userId = 1;
    const goal = await storage.createGoal({
      ...req.body,
      userId
    });
    res.status(201).json(goal);
  });
  
  // Update goal completion status
  apiRouter.patch("/goals/:id/completion", async (req, res) => {
    const id = parseInt(req.params.id);
    const { completed } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid goal ID" });
    }
    
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "completed field must be a boolean" });
    }
    
    const updatedGoal = await storage.updateGoalCompletion(id, completed);
    
    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    
    res.json(updatedGoal);
  });
  
  // Metrics endpoint (for dashboard)
  apiRouter.get("/metrics", async (req, res) => {
    const userId = 1;
    const activities = await storage.getCarbonActivities(userId);
    
    // Calculate total emissions
    const totalEmissions = activities.reduce((sum, activity) => sum + activity.emissions, 0) / 1000; // Convert to kg
    
    // Calculate emissions by type
    const transportEmissions = activities
      .filter(a => a.type === "transport")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
      
    const energyEmissions = activities
      .filter(a => a.type === "energy")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
      
    const dietEmissions = activities
      .filter(a => a.type === "diet")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
      
    const shoppingEmissions = activities
      .filter(a => a.type === "shopping")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
    
    // Mock change percentage for now (in a real app, this would compare to previous period)
    const metrics = {
      totalEmissions,
      totalEmissionsChange: 12,
      transportEmissions,
      transportEmissionsChange: 8,
      energyEmissions,
      energyEmissionsChange: -5,
      dietEmissions,
      dietEmissionsChange: -3,
      shoppingEmissions,
      shoppingEmissionsChange: 1
    };
    
    res.json(metrics);
  });
  
  // Chart data endpoints
  apiRouter.get("/chart/emissions-breakdown", async (req, res) => {
    const userId = 1;
    const activities = await storage.getCarbonActivities(userId);
    
    // Calculate emissions by type
    const transportEmissions = activities
      .filter(a => a.type === "transport")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
      
    const energyEmissions = activities
      .filter(a => a.type === "energy")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
      
    const dietEmissions = activities
      .filter(a => a.type === "diet")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
      
    const shoppingEmissions = activities
      .filter(a => a.type === "shopping")
      .reduce((sum, activity) => sum + activity.emissions, 0) / 1000;
    
    const totalEmissions = transportEmissions + energyEmissions + dietEmissions + shoppingEmissions;
    
    // Create chart data
    const chartData = [
      {
        name: "Transportation",
        value: transportEmissions,
        percentage: Math.round((transportEmissions / totalEmissions) * 100) || 0
      },
      {
        name: "Energy",
        value: energyEmissions,
        percentage: Math.round((energyEmissions / totalEmissions) * 100) || 0
      },
      {
        name: "Diet",
        value: dietEmissions,
        percentage: Math.round((dietEmissions / totalEmissions) * 100) || 0
      },
      {
        name: "Shopping",
        value: shoppingEmissions,
        percentage: Math.round((shoppingEmissions / totalEmissions) * 100) || 0
      }
    ];
    
    res.json(chartData);
  });
  
  apiRouter.get("/chart/emissions-trend", async (req, res) => {
    const userId = 1;
    const view = req.query.view as string || "weekly";
    
    // For now, return some sample data - in a real app, this would analyze activities by date
    let chartData;
    
    switch (view) {
      case "daily":
        chartData = [
          { name: "Mon", emissions: 2.3 },
          { name: "Tue", emissions: 3.1 },
          { name: "Wed", emissions: 1.8 },
          { name: "Thu", emissions: 2.5 },
          { name: "Fri", emissions: 3.9 },
          { name: "Sat", emissions: 1.2 },
          { name: "Sun", emissions: 0.8 }
        ];
        break;
      case "weekly":
        chartData = [
          { name: "Week 1", emissions: 15.6 },
          { name: "Week 2", emissions: 13.2 },
          { name: "Week 3", emissions: 16.8 },
          { name: "Week 4", emissions: 14.5 }
        ];
        break;
      case "monthly":
        chartData = [
          { name: "Jan", emissions: 68.5 },
          { name: "Feb", emissions: 62.3 },
          { name: "Mar", emissions: 58.1 },
          { name: "Apr", emissions: 63.7 },
          { name: "May", emissions: 55.2 },
          { name: "Jun", emissions: 53.9 }
        ];
        break;
      case "yearly":
        chartData = [
          { name: "2020", emissions: 820 },
          { name: "2021", emissions: 740 },
          { name: "2022", emissions: 620 },
          { name: "2023", emissions: 580 }
        ];
        break;
      default:
        chartData = [
          { name: "Week 1", emissions: 15.6 },
          { name: "Week 2", emissions: 13.2 },
          { name: "Week 3", emissions: 16.8 },
          { name: "Week 4", emissions: 14.5 }
        ];
    }
    
    res.json(chartData);
  });
  
  apiRouter.get("/chart/comparison", async (req, res) => {
    const userId = 1;
    const activities = await storage.getCarbonActivities(userId);
    
    // Calculate total emissions
    const userEmissions = activities.reduce((sum, activity) => sum + activity.emissions, 0) / 1000; // Convert to kg
    
    // In a real app, these would be fetched from a database or external API
    const chartData = [
      { name: "Your Footprint", emissions: userEmissions || 3.6 },
      { name: "National Avg", emissions: 5.2 },
      { name: "Global Avg", emissions: 4.7 }
    ];
    
    res.json(chartData);
  });
  
  // Mount API routes under /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
