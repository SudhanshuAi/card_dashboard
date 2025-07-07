# Pluggable Data-Driven Card System

This project is a modular and extensible React card component system that dynamically renders data using configurable layouts, fields, markers, and actions. It's designed to be easily integrated into a larger React codebase.

## Features

- **Data-Driven:** Cards are rendered based on a JSON configuration and a data object.
- **Configurable Layouts:** Use CSS Grid to define the layout of fields within a card.
- **Extensible Field Types:** Easily add new field types with custom rendering logic.
- **Dynamic Markers:** Display status badges, triggers, and tags based on data values.
- **Configurable Actions:** Add action buttons with customizable labels and onClick handlers.
- **Themable:** Cards can be styled with different color themes.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd card_system
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm start
```

This will open the application in your default browser at `http://localhost:3000`.

## Project Structure

- `src/components`: Contains the reusable React components for the card system.
  - `Card.tsx`: The main card component.
  - `FieldRenderer.tsx`: Renders different types of fields.
  - `MarkerRenderer.tsx`: Renders markers like status badges and tags.
  - `ActionRenderer.tsx`: Renders action buttons.
- `src/data`: Contains mock data and card configurations.
  - `mockData.ts`: Sample data for the cards.
  - `cardConfigs.ts`: Configuration files for different card types.
- `src/types`: Contains TypeScript interfaces for the card system.
  - `index.ts`: Defines the shapes of the configuration and data objects.
- `src/App.tsx`: The main application component that renders the example cards.

## How to Use

1.  **Define a Card Configuration:** Create a `CardConfig` object in `src/data/cardConfigs.ts`. This object defines the card's title, theme, layout, fields, markers, and actions.
2.  **Provide Data:** Add a corresponding data object in `src/data/mockData.ts`.
3.  **Render the Card:** In your application, import the `Card` component and pass the configuration and data as props:

```jsx
import Card from './components/Card';
import { myCardConfig } from './data/cardConfigs';
import { myCardData } from './data/mockData';

function MyApp() {
  return <Card config={myCardConfig} data={myCardData} />;
}
```

## Extensibility

### Adding a New Field Type

1.  Update the `FieldConfig` interface in `src/types/index.ts` to include the new field type.
2.  In `src/components/FieldRenderer.tsx`, add a new case to the `switch` statement to handle the rendering of the new field type.

### Adding a New Marker Type

1.  Update the `MarkerConfig` interface in `src/types/index.ts`.
2.  In `src/components/MarkerRenderer.tsx`, add a new case to the `switch` statement for the new marker type.

### Adding a New Action Type

1.  Update the `ActionConfig` interface in `src/types/index.ts`.
2.  In `src/components/ActionRenderer.tsx`, you can add new styles for the action type in the `themeClasses` object.
