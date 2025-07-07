import { Incident } from '../types';

export const incidents: Incident[] = [
  {
    id: '1',
    title: 'High-Value Loan Default Alert',
    severity: 'HIGH',
    status: 'ESCALATED',
    description: 'Commercial loan #LA-2024-9847 ($1.8M) missed payment - immediate action required',
    assignedTo: 'Senior Collections Manager',
    time: '8 minutes ago',
    amount: 1800000,
    daysOverdue: 15,
  },
  {
    id: '2',
    title: 'Compliance Review Backlog',
    severity: 'MEDIUM',
    status: 'IN PROGRESS',
    description: '23 loans pending regulatory compliance review before disbursement',
    assignedTo: 'Compliance Team',
    time: '45 minutes ago',
    amount: 4200000,
  },
  {
    id: '3',
    title: 'Automated Underwriting System Lag',
    severity: 'MEDIUM',
    status: 'MONITORING',
    description: 'Credit scoring API experiencing delays - manual review required',
    assignedTo: 'IT Operations',
    time: '2 hours ago',
    amount: 0, // No specific amount for this type of incident
  },
  {
    id: '4',
    title: 'Fraud Detection Alert',
    severity: 'HIGH',
    status: 'INVESTIGATING',
    description: 'Suspicious application pattern detected - 5 applications from same IP',
    assignedTo: 'Fraud Prevention Team',
    time: '3 hours ago',
    amount: 150000,
  },
];
