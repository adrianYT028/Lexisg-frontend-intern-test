# Lexi Legal Assistant - Frontend Interface

## Overview

This is a React-based legal assistant interface that simulates a chat-based legal research tool. The application allows users to ask legal questions and receive AI-generated answers with citations from legal documents. Users can click on citations to view the original PDF documents at the relevant sections.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and bundling
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Chat Interface (`client/src/components/chat-interface.tsx`)
- Main chat component handling user interactions
- Manages message history and loading states
- Simulates legal assistant responses with citations
- Handles PDF modal opening for citation viewing

### PDF Viewer Modal (`client/src/components/pdf-viewer-modal.tsx`)
- Modal component for displaying PDF documents
- Simulates PDF viewing with citation highlighting
- Provides download functionality for legal documents

### UI Components (`client/src/components/ui/`)
- Complete shadcn/ui component library implementation
- Includes buttons, dialogs, cards, forms, and other interactive elements
- Consistent design system with CSS variables for theming

### Database Schema (`shared/schema.ts`)
- User authentication schema with Drizzle ORM
- PostgreSQL table definitions with type safety
- Zod validation schemas for data validation

## Data Flow

1. **User Input**: User types legal question in chat interface
2. **Simulation**: Frontend simulates API call with loading state
3. **Response Generation**: Predefined legal response with citations displayed
4. **Citation Interaction**: User clicks citation to open PDF modal
5. **PDF Display**: Modal shows simulated PDF viewer with document reference

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Headless UI components
- **wouter**: Lightweight routing
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Frontend build tool
- **tsx**: TypeScript execution
- **esbuild**: Fast JavaScript bundler
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: tsx for TypeScript execution
- Database: Neon Database with connection pooling

### Production
- Frontend: Static build output served by Express
- Backend: Compiled JavaScript with esbuild
- Database: Serverless PostgreSQL with Drizzle migrations

### Build Process
1. `npm run build`: Builds frontend with Vite and bundles backend with esbuild
2. `npm run start`: Runs production server
3. `npm run db:push`: Pushes database schema changes

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. Implemented complete legal assistant interface with:
  - ChatGPT-style chat interface with message bubbles
  - Legal assistant branding (Lexi with scales icon)
  - Simulated legal question answering
  - Clickable citations that open PDF viewer modal
  - Highlighted text in simulated PDF popup
  - Smooth animations and professional styling
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Notes

- The application currently uses simulated responses for legal queries
- PDF viewing is mocked - actual PDF integration would require additional libraries
- Database schema is set up for user authentication but not currently used in the chat interface
- The application uses Neon Database for PostgreSQL hosting
- All UI components follow the shadcn/ui design system with consistent theming