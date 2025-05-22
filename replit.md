# Environmental Impact Monitor

## Overview

This project is a full-stack web application designed to help users track, understand, and reduce their carbon footprint. It provides tools for logging carbon-producing activities, visualizing environmental impact data, and receiving personalized recommendations for reducing emissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Context for global state, React Query for API data fetching
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Data Visualization**: Recharts for interactive charts

### Backend

- **Server**: Express.js with TypeScript
- **Database Access**: Drizzle ORM
- **Authentication**: Session-based authentication (planned but not fully implemented)
- **API Structure**: RESTful endpoints under `/api/`

### Database

- **ORM**: Drizzle ORM
- **Schema**: 
  - Users table for authentication
  - Carbon activities for tracking emissions
  - Goals for setting and tracking carbon reduction targets
  - Database is set up to work with PostgreSQL

## Key Components

### Core Features

1. **Dashboard**: Displays summary metrics and visualizations of the user's carbon footprint
2. **Activity Calculator**: Allows users to log different types of carbon-producing activities
3. **Insights**: Provides analysis of carbon footprint data and trends
4. **Tips**: Offers recommendations for reducing environmental impact

### Frontend Components

1. **Page Components**: Main page views (Dashboard, Calculate, Insights, Tips)
2. **UI Components**: Reusable shadcn/ui components for consistent design
3. **Chart Components**: Data visualization elements using Recharts
4. **Form Components**: Input forms for different activity types
5. **Context Provider**: Global state management for carbon data

### Backend Components

1. **API Routes**: RESTful endpoints for CRUD operations on activities and goals
2. **Storage Layer**: Data access abstraction for database operations
3. **Schema Validation**: Using Zod for input validation
4. **Error Handling**: Middleware for consistent error responses

## Data Flow

1. **User Input**: Users enter activity data via specialized forms based on activity type
2. **Data Validation**: Form data is validated client-side and server-side using Zod schemas
3. **Data Storage**: Validated data is stored in the PostgreSQL database via Drizzle ORM
4. **Data Retrieval**: The frontend fetches data using React Query for dashboard and insights
5. **Visualization**: Data is processed and displayed using various chart components
6. **Goal Tracking**: The system compares current emissions with user-set goals

## External Dependencies

### Frontend Dependencies

- **@radix-ui/...**: UI component primitives
- **@tanstack/react-query**: For data fetching and caching
- **recharts**: For data visualization
- **clsx/cva**: For conditional class name composition
- **date-fns**: For date manipulation
- **react-hook-form**: For form state management

### Backend Dependencies

- **express**: Web server framework
- **drizzle-orm**: Database ORM
- **zod**: Schema validation
- **@neondatabase/serverless**: Database connector

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development**: `npm run dev` - Runs the development server
2. **Build**: `npm run build` - Builds the client with Vite and bundles the server with esbuild
3. **Production**: `npm run start` - Runs the bundled application
4. **Database**: Using Replit's PostgreSQL module
5. **Environment Variables**: 
   - DATABASE_URL: Connection string for PostgreSQL database

## Getting Started

1. Ensure the PostgreSQL database is provisioned in the Replit
2. Run `npm run db:push` to create the database schema
3. Start the development server with `npm run dev`
4. Access the application at the provided Replit URL

## Planned Enhancements

1. Complete authentication system
2. Implement user profile management
3. Add more detailed activity tracking options
4. Enhance visualization capabilities
5. Add social sharing features
6. Implement notifications for goal progress