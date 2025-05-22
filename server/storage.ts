import { 
  users, 
  type User, 
  type InsertUser, 
  carbonActivities, 
  type CarbonActivity, 
  type InsertCarbonActivity, 
  goals, 
  type Goal, 
  type InsertGoal 
} from "@shared/schema";

// Storage interface for all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Carbon activities operations
  getCarbonActivities(userId: number): Promise<CarbonActivity[]>;
  getCarbonActivitiesByType(userId: number, type: string): Promise<CarbonActivity[]>;
  getCarbonActivitiesByDateRange(userId: number, startDate: Date, endDate: Date): Promise<CarbonActivity[]>;
  createCarbonActivity(activity: InsertCarbonActivity): Promise<CarbonActivity>;
  deleteCarbonActivity(id: number): Promise<boolean>;
  
  // Goals operations
  getGoals(userId: number): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoalCompletion(id: number, completed: boolean): Promise<Goal | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private activities: Map<number, CarbonActivity>;
  private goals: Map<number, Goal>;
  private userId: number;
  private activityId: number;
  private goalId: number;
  
  // Helper method to ensure userId is never undefined
  private ensureUserId(userId?: number | null): number | null {
    return userId === undefined ? null : userId;
  }

  constructor() {
    this.users = new Map();
    this.activities = new Map();
    this.goals = new Map();
    this.userId = 1;
    this.activityId = 1;
    this.goalId = 1;
    
    // Add a demo user
    this.createUser({
      username: "demo",
      password: "password"
    });
    
    // Add some sample activities for the demo user
    this.seedDemoActivities();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Carbon activities operations
  async getCarbonActivities(userId: number): Promise<CarbonActivity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => activity.userId === userId,
    );
  }
  
  async getCarbonActivitiesByType(userId: number, type: string): Promise<CarbonActivity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => activity.userId === userId && activity.type === type,
    );
  }
  
  async getCarbonActivitiesByDateRange(
    userId: number, 
    startDate: Date, 
    endDate: Date
  ): Promise<CarbonActivity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => 
        activity.userId === userId && 
        new Date(activity.date) >= startDate && 
        new Date(activity.date) <= endDate,
    );
  }
  
  async createCarbonActivity(insertActivity: InsertCarbonActivity): Promise<CarbonActivity> {
    const id = this.activityId++;
    const activity = { 
      ...insertActivity, 
      id,
      userId: this.ensureUserId(insertActivity.userId),
      date: insertActivity.date || new Date()
    } as CarbonActivity;
    this.activities.set(id, activity);
    return activity;
  }
  
  async deleteCarbonActivity(id: number): Promise<boolean> {
    return this.activities.delete(id);
  }
  
  // Goals operations
  async getGoals(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.userId === userId,
    );
  }
  
  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.goalId++;
    const goal = { 
      ...insertGoal, 
      id,
      userId: this.ensureUserId(insertGoal.userId),
      completed: false
    } as Goal;
    this.goals.set(id, goal);
    return goal;
  }
  
  async updateGoalCompletion(id: number, completed: boolean): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updatedGoal: Goal = {
      ...goal,
      completed
    };
    this.goals.set(id, updatedGoal);
    return updatedGoal;
  }
  
  // Seed some demo activities
  private seedDemoActivities() {
    // Transport activities
    this.createCarbonActivity({
      userId: 1,
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
    });
    
    // Energy activities
    this.createCarbonActivity({
      userId: 1,
      type: "energy",
      subtype: "Electricity",
      details: {
        amount: 180,
        unit: "kWh",
        renewable: false
      },
      emissions: 32400,
      date: new Date(Date.now() - 86400000 * 5) // 5 days ago
    });
    
    // Diet activities
    this.createCarbonActivity({
      userId: 1,
      type: "diet",
      subtype: "Average",
      details: {
        redMeatFrequency: 2,
        dairyFrequency: 7,
        localFood: 20
      },
      emissions: 12600,
      date: new Date(Date.now() - 86400000 * 7) // 7 days ago
    });
    
    // Create a goal
    this.createGoal({
      userId: 1,
      targetEmissions: 320000, // 320 kg CO2e monthly target
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000 * 30) // 30 days from now
    });
  }
}

export const storage = new MemStorage();
