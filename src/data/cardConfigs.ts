// src/data/cardConfigs.ts
import { CardConfig } from '../types';

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


export const cardConfigs = [customerOnboardingCardConfig, loanOriginationCardConfig, highValueLoanDefaultCardConfig];
