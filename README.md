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
  - `Card.tsx`: The main pluggable card component.
- `src/data`: Contains mock data and card configurations.
  - `mockData.ts`: Sample data for the cards.
  - `cardConfigs.ts`: Configuration files for different card types.
- `src/types`: Contains TypeScript interfaces for the card system.
  - `index.ts`: Defines the shapes of the configuration and data objects.
- `src/App.tsx`: The main application component that renders the example cards.

## How to Use

The main application entry point is `src/App.tsx`, which renders the `Dashboard` component. The dashboard is composed of generic `Card` components configured via `cardConfigs.ts` and data from `incidents.ts` and `stats.ts`.

To modify the content of the dashboard, you can edit these data files and/or the card configuration in `cardConfigs.ts`.

### Example Configurations & Data

Here are three examples of the data structures used to render the cards in the dashboard.

#### 1. Loan Origination Stat Card

This card displays key metrics for a department. The `status` field controls the color of the tag, and the `metrics` array is rendered in a 2-column grid.

**File:** `src/data/stats.ts`

```typescript
{
  id: '1',
  title: 'Loan Origination',
  status: 'on track',
  metrics: [
    { label: 'Active Loans', value: '156' },
    { label: 'Avg. Processing', value: '3.2 days' },
    { label: "Today's Applications", value: '23' },
    { label: 'Approval Rate', value: '78%' },
  ],
  efficiency: 89,
}
```

#### 2. High-Value Loan Default Incident Card

This card is used for critical alerts. It includes `severity` and `status` fields that are rendered as colored tags. It also conditionally displays fields like `daysOverdue` and will hide the `amount` field if it is 0.

> **Note:** The badge colors for `HIGH` and `ESCALATED` are now `bg-red-100 text-red-500`.

**File:** `src/data/incidents.ts`

```typescript
{
  id: '1',
  title: 'High-Value Loan Default Alert',
  severity: 'HIGH',
  status: 'ESCALATED',
  description: 'Commercial loan #LA-2024-9847 ($1.8M) missed payment - immediate action required',
  assignedTo: 'Senior Collections Manager',
  time: '8 minutes ago',
  amount: 1800000, // If 0, this field is hidden in the UI
  daysOverdue: 15,
}
```

#### 3. Underwriting Stat Card

This example shows a stat card with the `attention needed` status, which changes the color of the status tag to indicate that the department requires review.

**File:** `src/data/stats.ts`

```typescript
{
  id: '3',
  title: 'Underwriting',
  status: 'attention needed',
  metrics: [
    { label: 'Active Loans', value: '67' },
    { label: 'Avg. Processing', value: '1.8 days' },
    { label: "Today's Applications", value: '45' },
    { label: 'Approval Rate', value: '76%' },
  ],
  efficiency: 85,
}
```

## Extensibility

### Adding a New Field, Marker, or Action Type

- Update the `FieldConfig`, `MarkerConfig`, or `ActionConfig` interface in `src/types/index.ts` to include the new type or property.
- Update the configuration in `src/data/cardConfigs.ts` to use the new type or property as needed.
- The generic `Card` component in `src/components/Card.tsx` will automatically render new types if you add the appropriate rendering logic there.

No need to create or edit separate renderer files—everything is now handled via config and the pluggable Card component.

## Bonus Features

### Drag-and-Drop Card Designer UI

A visual Card Designer is available in `src/components/CardDesigner.tsx`. This tool allows you to:
- View and reorder card fields (drag-and-drop editing coming soon)
- Export the current card config as JSON
- Import a card config from JSON

To use the designer, render the `CardDesigner` component in your app and pass an initial config if desired.

### Export/Import Card Configs as JSON

- Use the export button in the Card Designer to download the current config as a JSON file.
- Paste a JSON config into the import area and click Import to load it into the designer.

### Custom Data Transformations

You can add a `transform` function or key to your card config to support computed fields, aggregations, or filters. See `cardConfigs.ts` for examples of mapping helpers.
