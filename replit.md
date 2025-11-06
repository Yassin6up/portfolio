# Elhardouf Portfolio Website

## Overview

This is a modern, highly animated freelance developer portfolio website for Elhardouf. The application showcases a developer's skills, projects, services, and contact information through an award-winning design featuring extensive Three.js 3D elements, GSAP animations, and parallax effects. The site is built as a full-stack application with React on the frontend and Express.js on the backend, supporting both English and Arabic languages with a dark/light theme toggle.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for managing component variants
- Custom CSS variables for theme switching (light/dark modes)

**State Management & Data Fetching**
- React Query (TanStack Query) for server state management and data fetching
- React Context API for global state (theme and i18n)
- React Hook Form with Zod for form validation

**Animation & 3D Graphics**
- Three.js for 3D background elements and the Phoenix bird model
- GSAP (GreenSock Animation Platform) with ScrollTrigger plugin for scroll-based animations, fade-ins, slide-ins, and parallax effects
- React Intersection Observer for triggering animations when sections come into view

**Internationalization**
- i18next with react-i18next for English/Arabic language support
- RTL (right-to-left) layout support for Arabic language
- Language toggle in navigation with persistence

**Design System**
- Custom color palette: Dark Blue (#0B1F3F), Neon Green (#00FF94), White (#FFFFFF)
- Typography: Montserrat/Poppins for headings, Roboto/Open Sans for body text
- Responsive design with mobile-first approach
- Consistent spacing using Tailwind's spacing scale

**Component Architecture**
- Page components: Home (single-page application), NotFound
- Section components: Hero, About, Skills, Portfolio, Services, Testimonials, Contact, Footer
- Shared components: Navigation, ThreeBackground, PhoenixBird
- UI components: Complete shadcn/ui library for buttons, forms, dialogs, cards, etc.

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type-safe server code
- Custom middleware for request logging and JSON parsing with raw body capture

**Development Setup**
- Vite middleware integration for development with HMR
- Separate production build process using esbuild for server bundling
- Hot reload support in development mode

**Storage Layer**
- In-memory storage implementation (MemStorage) with interface-based design for future database integration
- Drizzle ORM configured for PostgreSQL with schema definitions
- Schema includes users table with UUID primary keys

**API Structure**
- RESTful API endpoints prefixed with `/api`
- Request/response logging middleware
- Error handling with proper HTTP status codes

**Session Management**
- Configured for connect-pg-simple session store (for future PostgreSQL integration)
- Session-based authentication infrastructure

### External Dependencies

**Database**
- Neon Database (@neondatabase/serverless) for PostgreSQL serverless connection
- Drizzle ORM for type-safe database queries and migrations
- Drizzle Kit for schema management and migrations
- Database URL configured via environment variable (DATABASE_URL)

**3D Assets & Rendering**
- Three.js for WebGL rendering
- GLTFLoader from three-stdlib for loading 3D models
- Phoenix bird model (CC-BY-4.0 license from Sketchfab)
- Custom geometric shapes (icosahedron, octahedron, tetrahedron) for background

**Animation Libraries**
- GSAP with TextPlugin and ScrollTrigger
- React Intersection Observer for viewport detection

**UI Component Dependencies**
- Radix UI primitives (accordion, dialog, dropdown, select, toast, tooltip, etc.)
- Lucide React for icon system
- React Icons (Simple Icons) for brand/tech stack icons
- React Day Picker for calendar components
- Input OTP for one-time password inputs

**Form & Validation**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for Zod integration
- Drizzle-zod for database schema to Zod schema conversion

**Utilities**
- clsx and tailwind-merge for className manipulation
- date-fns for date formatting
- nanoid for unique ID generation

**Development Tools**
- Replit-specific plugins: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- PostCSS with Tailwind CSS and Autoprefixer

**Fonts**
- Google Fonts: Cairo, Orbitron, Architects Daughter, DM Sans, Fira Code, Geist Mono
- Preconnected font loading for performance

**Assets Management**
- Attached assets directory for static files and 3D models
- Generated images for portfolio projects and profile pictures
- Vite alias configuration for easy asset imports (@assets)