import { StatCardData } from '../types';

export const stats: StatCardData[] = [
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
  },
  {
    id: '2',
    title: 'Collections',
    status: 'on track',
    metrics: [
      { label: 'Active Loans', value: '89' },
      { label: 'Avg. Processing', value: '2.1 days' },
    ],
    efficiency: 92,
  },
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
  },
  {
    id: '4',
    title: 'Risk Management',
    status: 'on track',
    metrics: [
      { label: 'Active Loans', value: '234' },
      { label: 'Avg. Processing', value: '0.5 days' },
    ],
    efficiency: 96,
  },
];
