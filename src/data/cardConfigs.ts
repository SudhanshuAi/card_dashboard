// src/data/cardConfigs.ts
import { CardConfig } from '../types';
import { StatCardData, Incident } from '../types';

export const customerOnboardingCardConfig: CardConfig = {
  id: 'card-1',
  title: 'Customer Onboarding',
  theme: 'green',
  layout: { rows: 2, cols: 2 },
  fields: [
    {
      id: 'f1',
      label: 'Success Rate',
      dataKey: 'successRate',
      type: 'percentage',
      position: { row: 0, col: 0 },
      style: { fontSize: '2xl', fontWeight: 'bold', color: '#16a34a' },
    },
    {
      id: 'f2',
      label: 'Total Runs',
      dataKey: 'totalRuns',
      type: 'number',
      position: { row: 0, col: 1 },
    },
    {
      id: 'f3',
      label: 'Avg Duration',
      dataKey: 'avgDuration',
      type: 'number',
      position: { row: 1, col: 0 },
    },
    {
      id: 'f4',
      label: 'Last Run',
      dataKey: 'lastRun',
      type: 'text',
      position: { row: 1, col: 1 },
    },
  ],
  markers: [
    { type: 'status', valueKey: 'status' },
    { type: 'trigger', valueKey: 'triggers' },
  ],
  actions: [
    { label: 'Pause', actionType: 'pause' },
    { label: 'Edit', actionType: 'edit' },
  ],
};

export const loanOriginationCardConfig: CardConfig = {
  id: 'loan-origination',
  title: 'Loan Origination',
  theme: 'gray',
  layout: { rows: 3, cols: 2 },
  fields: [
    { id: 'f1', label: 'Active Loans', dataKey: 'activeLoans', type: 'number', position: { row: 0, col: 0 }, style: { fontSize: 'xl', fontWeight: 'bold' } },
    { id: 'f2', label: 'Avg. Processing', dataKey: 'avgProcessing', type: 'text', position: { row: 0, col: 1 }, style: { fontSize: 'xl', fontWeight: 'bold' } },
    { id: 'f3', label: "Today's Applications", dataKey: 'todaysApplications', type: 'number', position: { row: 1, col: 0 }, style: { fontSize: 'xl', fontWeight: 'bold' } },
    { id: 'f4', label: 'Approval Rate', dataKey: 'approvalRate', type: 'percentage', position: { row: 1, col: 1 }, style: { fontSize: 'xl', fontWeight: 'bold', color: '#16a34a' } },
    { id: 'f5', label: 'Department Efficiency', dataKey: 'departmentEfficiency', type: 'percentage', position: { row: 2, col: 1 }, style: { textAlign: 'right' } },
  ],
  markers: [{ type: 'status', valueKey: 'status' }],
};

export const highValueLoanDefaultCardConfig: CardConfig = {
  id: 'high-value-loan-default',
  title: 'High-Value Loan Default Alert',
  theme: 'red',
  layout: { rows: 2, cols: 4 },
  fields: [
    { id: 'f1', label: '', dataKey: 'description', type: 'text', position: { row: 0, col: 0 }, style: { colSpan: 4 } },
    { id: 'f2', label: 'Assigned to:', dataKey: 'assignedTo', type: 'text', position: { row: 1, col: 0 } },
    { id: 'f3', label: 'Time:', dataKey: 'time', type: 'text', position: { row: 1, col: 1 } },
    { id: 'f4', label: 'Amount:', dataKey: 'amount', type: 'currency', position: { row: 1, col: 2 }, style: { color: '#16a34a', fontWeight: 'bold' } },
    { id: 'f5', label: 'Days Overdue:', dataKey: 'daysOverdue', type: 'number', position: { row: 1, col: 3 } },
  ],
  markers: [
    { type: 'status', valueKey: 'status' },
    { type: 'tag', valueKey: 'escalation' },
  ],
  actions: [
    { label: 'View', actionType: 'view' },
    { label: 'Action', actionType: 'custom' },
  ],
};

// Updated Incident Card Config for UI match
export const incidentCardConfig: CardConfig = {
  id: 'incident-generic',
  title: '', // Title is rendered from data
  theme: 'gray',
  layout: { rows: 2, cols: 4 },
  fields: [
    // Row 0: Title, Badges, Description
    { id: 'title', label: '', dataKey: 'title', type: 'text', position: { row: 0, col: 0 }, style: { fontWeight: 'bold', colSpan: 4, fontSize: '1.1rem' } },
    { id: 'description', label: '', dataKey: 'description', type: 'text', position: { row: 1, col: 0 }, style: { colSpan: 4, color: '#2563eb' } },
    // Row 1: Assigned, Time, Amount, Days Overdue
    { id: 'assignedTo', label: 'Assigned to:', dataKey: 'assignedTo', type: 'text', position: { row: 2, col: 0 }, style: { fontWeight: 'bold' } },
    { id: 'time', label: 'Time:', dataKey: 'time', type: 'text', position: { row: 2, col: 1 }, style: { fontWeight: 'bold' } },
    { id: 'amount', label: 'Amount:', dataKey: 'amount', type: 'currency', position: { row: 2, col: 2 }, style: { color: '#16a34a', fontWeight: 'bold' } },
    { id: 'daysOverdue', label: 'Days Overdue:', dataKey: 'daysOverdue', type: 'number', position: { row: 2, col: 3 }, style: { color: '#dc2626', fontWeight: 'bold' } },
  ],
  markers: [
    { type: 'status', valueKey: 'severity' },
    { type: 'status', valueKey: 'status' },
  ],
  actions: [
    { label: 'View', actionType: 'view' },
    { label: 'Action', actionType: 'custom' },
  ],
};

// Updated Stat Card Config for UI match
export const statCardConfig: CardConfig = {
  id: 'stat-generic',
  title: '', // Title is rendered from data
  theme: 'gray',
  layout: { rows: 3, cols: 2 },
  fields: [
    { id: 'activeLoans', label: 'Active Loans', dataKey: 'metric1', type: 'text', position: { row: 0, col: 0 }, style: { fontWeight: 'bold', fontSize: '1.5rem' } },
    { id: 'avgProcessing', label: 'Avg. Processing', dataKey: 'metric2', type: 'text', position: { row: 0, col: 1 }, style: { fontWeight: 'bold', fontSize: '1.5rem' } },
    { id: 'todaysApplications', label: "Today's Applications", dataKey: 'metric3', type: 'text', position: { row: 1, col: 0 }, style: { fontWeight: 'bold', fontSize: '1.5rem' } },
    { id: 'approvalRate', label: 'Approval Rate', dataKey: 'metric4', type: 'percentage', position: { row: 1, col: 1 }, style: { fontWeight: 'bold', color: '#16a34a', fontSize: '1.5rem' } },
    // Department Efficiency is rendered separately with divider
  ],
  markers: [
    { type: 'status', valueKey: 'status' },
  ],
};

// Helper to map StatCardData to Card data for statCardConfig
export function mapStatToCardData(stat: StatCardData) {
  const data = {
    ...stat,
    metric1: stat.metrics[0]?.value || '',
    metric2: stat.metrics[1]?.value || '',
    metric3: stat.metrics[2]?.value || '',
    metric4: stat.metrics[3]?.value || '',
  };
  return data;
}

// Helper to map Incident to Card data for incidentCardConfig
export function mapIncidentToCardData(incident: Incident) {
  return { ...incident };
}

export const cardConfigs = [customerOnboardingCardConfig, loanOriginationCardConfig, highValueLoanDefaultCardConfig, incidentCardConfig, statCardConfig];
