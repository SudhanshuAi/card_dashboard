export interface CardConfig {
  id: string;
  title: string;
  theme: 'blue' | 'green' | 'red' | 'orange' | 'gray';
  layout: {
    rows: number;
    cols: number;
  };
  fields: FieldConfig[];
  markers?: MarkerConfig[];
  actions?: ActionConfig[];
}

export interface FieldConfig {
  id: string;
  label: string;
  dataKey: string;
  type: 'number' | 'currency' | 'percentage' | 'date' | 'badge' | 'text' | 'status';
  position: { row: number; col: number };
  style?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    colSpan?: number;
    rowSpan?: number;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface MarkerConfig {
  type: 'status' | 'trigger' | 'tag';
  valueKey: string; // key in data
  style?: any; // e.g., color mapping
}

export interface ActionConfig {
  label: string;
  actionType: 'pause' | 'edit' | 'resume' | 'view' | 'custom';
  onClick?: (data: any) => void; // callback signature
}

// Types for the Loan Operations Dashboard

export type IncidentSeverity = 'HIGH' | 'MEDIUM' | 'LOW';
export type IncidentStatus = 'ESCALATED' | 'IN PROGRESS' | 'MONITORING' | 'INVESTIGATING';

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string;
  assignedTo: string;
  time: string;
  amount: number;
  daysOverdue?: number;
}

export type StatCardStatus = 'on track' | 'attention needed';

export interface StatCardData {
  id: string;
  title: string;
  status: StatCardStatus;
  metrics: {
    label: string;
    value: string;
  }[];
  efficiency?: number;
}

