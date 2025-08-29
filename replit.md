# eziileave - Leave Management System

## Overview
eziileave is a comprehensive full-stack leave management system designed to streamline the handling of leave applications, compensatory off, PTO, and holidays for organizations. It supports role-based access control for administrators and employees, incorporates robust approval workflows, and accurately calculates leave earning based on pro-rata calendar days. The system's core purpose is to provide a reliable solution for fair and accurate leave accrual and usage tracking, enhancing organizational efficiency.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite.
- **Styling**: TailwindCSS with shadcn/ui for components.
- **State Management**: TanStack Query (React Query) for server-side state.
- **Routing**: Wouter.
- **Forms**: React Hook Form with Zod for validation.
- **UI/UX Decisions**: Focuses on a clean, professional aesthetic with intuitive navigation. Features include multi-step onboarding wizards, role-specific dashboards, and calendar views with visual leave/holiday indicators. Responsive design ensures full mobile optimization, including dynamic typography scaling, optimized card layouts, and responsive navigation for various screen sizes.

### Backend Architecture
- **Framework**: Express.js with TypeScript, running on Node.js 20.
- **Authentication**: Replit Auth utilizing OpenID Connect for secure, session-based role-based access control (admin, manager, employee, hr).
- **API Design**: RESTful endpoints providing JSON responses.
- **Core Functionality**: Manages leave application workflows, compensatory off, PTO, holiday scheduling, and dynamic role-based permissions.
- **Key Features**:
    - **Authentication System**: Replit Auth integration with role-based access control.
    - **Data Models**: Comprehensive models for Users, Companies, Leave Types, Leave Requests, Compensatory Off, PTO, Holidays, Workflows, and Roles.
    - **Leave Calculation Logic**: Supports "In Advance" and "After Earning" accrual methods, pro-rata calculations based on joining dates, and manages carry forward, lapse, and encashment options, including detailed slab configuration.
    - **Workflow Management**: Configurable multi-step approval processes for leave applications and withdrawals.
    - **Reporting**: Provides HR Leave Balance Report with accurate eligibility and availed calculations, and comprehensive task management for collaborative leave.
    - **Import/Export**: Excel-based import functionality for leave balances and transactions with template generation and validation.
    - **Document Management**: Integrated system for uploading and serving supporting documents.
    - **Blackout Period Management**: System to define and validate blackout periods, blocking or providing visibility for leave applications during specified times.
    - **External Module Integration**: Provides smart navigation and authentication for external platforms like `services.resolvepay.in` for payroll and `rc.resolveindia.in` for attendance/expense, utilizing JWT for secure transitions.

### Database Architecture
- **Database**: PostgreSQL 16.
- **ORM**: Drizzle ORM for type-safe queries and schema management.
- **Connection**: Neon serverless driver.
- **Data Integrity**: Multi-tenancy support with `org_id` filtering for data isolation. Stores balance and transaction data in full-day units with decimal support.

## External Dependencies

### UI and Styling
- `@radix-ui/*`: Headless UI components.
- `tailwindcss`: Utility-first CSS framework.
- `class-variance-authority`: Type-safe component variants.
- `lucide-react`: Icon library.

### Data and Forms
- `@tanstack/react-query`: Server state management.
- `react-hook-form`: Form handling and validation.
- `zod`: Schema validation.
- `drizzle-zod`: Integration between Drizzle and Zod.

### Backend Dependencies
- `@neondatabase/serverless`: PostgreSQL serverless driver.
- `connect-pg-simple`: PostgreSQL session store.
- `openid-client`: OpenID Connect authentication.
- `passport`: Authentication middleware.
- `multer`: For file handling in document uploads.
- `worker-master-leave` endpoint: External API (e.g., `https://apiv1.resolvepay.in/organization/reporting-manager/{user_id}/reportees`) for employee data and reporting manager information, authenticated via JWT.