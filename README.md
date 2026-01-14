# Football Drill Planner

A mobile-first web application designed for football coaches to design, save, and manage professional training drills. Built with modern web technologies, it offers an intuitive touch interface for creating complex field setups and drill progressions.

## Features

-   **Drill Management**: Create, edit, and organize football drills with details like titles, objectives, and field dimensions.
-   **Step-by-Step Planning**: Break down drills into progressive steps to clearly communicate training flows.
-   **Interactive Drill Designer**:
    -   **Canvas-based Editor**: Design drills visually on a virtual pitch.
    -   **Drag & Drop Interface**: Easily place players, equipment (cones, goals, ladders), and shapes.
    -   **Drawing Tools**: Draw movement lines (solid/dashed) and annotated zones.
    -   **Touch Optimized**: Full support for touch gestures (drag, resize, rotate) on mobile devices.
-   **Local Persistence**: All drills and data are saved locally to your device, ensuring privacy and offline access.
-   **Responsive Design**: Optimized for both mobile and desktop usage, with a focus on field usability.

## Tech Stack

This project is built with a modern, performance-focused stack:

-   **Framework**: [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Graphics/Canvas**: [Konva](https://konvajs.org/) & [react-konva](https://konvajs.org/docs/react/)
-   **Routing**: [React Router v7](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **UI Components**: Custom components built with accessibility in mind (using Radix UI primitives where applicable).

## Getting Started

### Prerequisites

-   Node.js (Latest LTS recommended)
-   npm or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd Football-Drill
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage Guide

1.  **Dashboard**: View your saved drills and categories.
2.  **Create Drill**: Tap "Create New Drill" to define drill metadata (Title, Date, Objective).
3.  **Step Editor**: Add steps to your drill. Each step represents a phase of the training.
4.  **Designer**: Tap on a step to open the graphical editor.
    -   Use the **Sidebar** to drag players and equipment onto the pitch.
    -   Use the **Toolbar** to toggle drawing modes.
    -   Tap an element to select it for resizing, rotating, or deleting.
    -   Changes are auto-saved to the local state.

## License

Private Project.
