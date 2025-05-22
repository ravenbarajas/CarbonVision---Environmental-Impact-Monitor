import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Carbon activity table
export const carbonActivities = pgTable("carbon_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // transport, energy, diet, shopping
  subtype: text("subtype").notNull(), // car, flight, electricity, etc.
  details: jsonb("details").notNull(), // JSON containing activity details
  emissions: integer("emissions").notNull(), // emissions in grams of CO2e
  date: timestamp("date").notNull().defaultNow(),
});

export const insertCarbonActivitySchema = createInsertSchema(carbonActivities).pick({
  userId: true,
  type: true,
  subtype: true,
  details: true,
  emissions: true,
  date: true,
});

// Goals table
export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  targetEmissions: integer("target_emissions").notNull(), // target emissions in grams
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertGoalSchema = createInsertSchema(goals).pick({
  userId: true,
  targetEmissions: true,
  startDate: true,
  endDate: true,
});

// Define activity details types
export const transportDetailsSchema = z.object({
  distance: z.number(),
  distanceUnit: z.string(),
  fuelType: z.string().optional(),
  frequency: z.string(),
  passengers: z.number().optional(),
});

export const energyDetailsSchema = z.object({
  amount: z.number(),
  unit: z.string(),
  renewable: z.boolean().optional(),
});

export const dietDetailsSchema = z.object({
  redMeatFrequency: z.number().optional(),
  dairyFrequency: z.number().optional(),
  localFood: z.number().optional(),
});

export const shoppingDetailsSchema = z.object({
  clothingItems: z.number().optional(),
  electronicsItems: z.number().optional(),
  otherItems: z.number().optional(),
  secondHand: z.boolean().optional(),
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCarbonActivity = z.infer<typeof insertCarbonActivitySchema>;
export type CarbonActivity = typeof carbonActivities.$inferSelect;

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

export type TransportDetails = z.infer<typeof transportDetailsSchema>;
export type EnergyDetails = z.infer<typeof energyDetailsSchema>;
export type DietDetails = z.infer<typeof dietDetailsSchema>;
export type ShoppingDetails = z.infer<typeof shoppingDetailsSchema>;
