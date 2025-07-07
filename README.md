# Pluggable Data-Driven Card System

This project is a modular and extensible React card component system that dynamically renders data using configurable layouts, fields, markers, and actions. It's designed to be easily integrated into a larger React codebase.

## Features

- **Data-Driven:** Cards are rendered based on a JSON configuration and a data object.
- **Configurable Layouts:** Use CSS Grid to define the layout of fields within a card.
- **Extensible Field Types:** Easily add new field types with custom rendering logic.
- **Dynamic Markers:** Display status badges, triggers, and tags based on data values.
- **Configurable Actions:** Add action buttons with customizable labels and onClick handlers.
- **Themable:** Cards can be styled with different color themes.
- **Drag-and-Drop Card Designer:** Visually create, edit, and export/import card configs as JSON.

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
  - `Card.tsx`: The main pluggable card component.
  - `CardDesigner.tsx`: Visual designer for card configs.
  - `Dashboard.tsx`: Example dashboard using cards and configs.
- `src/data`: Contains mock data and card configurations as JSON files.
  - `customerOnboardingCardConfig.json`, `incidents.json`, `stats.json`, etc.
- `src/types`: Contains TypeScript interfaces for the card system.
  - `index.ts`: Defines the shapes of the configuration and data objects.
- `src/App.tsx`: The main application component that renders the dashboard and designer.

## How to Use

The main application entry point is `src/App.tsx`, which lets you switch between the `Dashboard` and the `CardDesigner` via navigation tabs.

### Using the Card Designer

- **Add/Edit Fields:** Add, remove, reorder, and edit all field properties (label, dataKey, type, style, etc.).
- **Markers:** Add, remove, and edit markers (status, trigger, tag) and their data keys.
- **Actions:** Add, remove, and edit action buttons (label, type).
- **Card Meta:** Edit card title, theme, and layout (rows/cols).
- **Custom Data Transform:** Add a JS function body to compute or transform data for the card.
- **Export/Import:**
  - Export your card config as JSON for use in the dashboard.
  - Import any valid card config JSON to edit or extend it.
- **Default Data:** The designer uses realistic mock data for preview and export.

### Using JSON Card Configs in the Dashboard

1. **Export** your card config as JSON from the Card Designer.
2. **Save** the JSON file in `src/data/` (e.g., `customerOnboardingCardConfig.json`).
3. **Import** the JSON in your dashboard code:
   ```typescript
   import customerOnboardingCardConfig from '../data/customerOnboardingCardConfig.json';
   ```
4. **TypeScript:** If you see a type error, use `as CardConfig`:
   ```typescript
   import { CardConfig } from '../types';
   const config = customerOnboardingCardConfig as CardConfig;
   ```
5. **Provide data** for the card:
   ```typescript
   const customerOnboardingData = {
     successRate: 97,
     totalRuns: 120,
     avgDuration: 2.3,
     lastRun: '2024-07-07',
     status: 'on track',
     triggers: 'auto'
   };
   ```
6. **Render the card:**
   ```tsx
   <Card config={config} data={customerOnboardingData} />
   ```

## Example Card Config JSON

```json
{
  "id": "card-1",
  "title": "Customer Onboarding",
  "theme": "green",
  "layout": { "rows": 2, "cols": 2 },
  "fields": [
    { "id": "f1", "label": "Success Rate", "dataKey": "successRate", "type": "percentage", "position": { "row": 0, "col": 0 }, "style": { "fontSize": "2xl", "fontWeight": "bold", "color": "#16a34a" } },
    { "id": "f2", "label": "Total Runs", "dataKey": "totalRuns", "type": "number", "position": { "row": 0, "col": 1 } },
    { "id": "f3", "label": "Avg Duration", "dataKey": "avgDuration", "type": "number", "position": { "row": 1, "col": 0 } },
    { "id": "f4", "label": "Last Run", "dataKey": "lastRun", "type": "text", "position": { "row": 1, "col": 1 } }
  ],
  "markers": [
    { "type": "status", "valueKey": "status" },
    { "type": "trigger", "valueKey": "triggers" }
  ],
  "actions": [
    { "label": "Pause", "actionType": "pause" },
    { "label": "Edit", "actionType": "edit" }
  ]
}
```

## Extensibility

### Adding a New Field, Marker, or Action Type

- Update the `FieldConfig`, `MarkerConfig`, or `ActionConfig` interface in `src/types/index.ts` to include the new type or property.
- Update the configuration in your JSON file to use the new type or property as needed.
- The generic `Card` component in `src/components/Card.tsx` will automatically render new types if you add the appropriate rendering logic there.

No need to create or edit separate renderer files—everything is now handled via config and the pluggable Card component.

## Bonus Features

### Drag-and-Drop Card Designer UI

A visual Card Designer is available in `src/components/CardDesigner.tsx`. This tool allows you to:
- Add, edit, remove, and reorder card fields (drag-and-drop)
- Edit all field properties, markers, actions, and card meta
- Export the current card config as JSON
- Import a card config from JSON
- Add a custom data transform (JS function body)

To use the designer, render the `CardDesigner` component in your app and pass an initial config if desired, or use the navigation tabs to switch between the dashboard and designer.

### Export/Import Card Configs as JSON

- Use the export button in the Card Designer to download the current config as a JSON file.
- Paste a JSON config into the import area and click Import to load it into the designer.

### Custom Data Transformations

You can add a `transform` function or key to your card config to support computed fields, aggregations, or filters. This can be edited as a JS function body in the Card Designer.

---

**For more examples and advanced usage, see the code and comments in the project.**
