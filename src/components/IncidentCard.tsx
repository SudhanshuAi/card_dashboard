import React from 'react';
import { Incident, IncidentSeverity, IncidentStatus } from '../types';

const severityStyles: { [key in IncidentSeverity]: string } = {
  HIGH: 'bg-red-100 text-red-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-blue-100 text-blue-800',
};

const statusStyles: { [key in IncidentStatus]: string } = {
  ESCALATED: 'bg-red-500 text-white',
  'IN PROGRESS': 'bg-blue-500 text-white',
  MONITORING: 'bg-yellow-500 text-white',
  INVESTIGATING: 'bg-purple-500 text-white',
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const IncidentCard: React.FC<{ incident: Incident }> = ({ incident }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Left Section */}
        <div className="md:col-span-8">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-800">{incident.title}</h4>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severityStyles[incident.severity]}`}>
              {incident.severity}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusStyles[incident.status]}`}>
              {incident.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{incident.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Assigned to:</p>
              <p className="font-medium text-gray-800">{incident.assignedTo}</p>
            </div>
            <div>
              <p className="text-gray-500">Time:</p>
              <p className="font-medium text-gray-800">{incident.time}</p>
            </div>
            {incident.amount > 0 && (
              <div>
                <p className="text-gray-500">Amount:</p>
                <p className="font-medium text-green-500">{formatCurrency(incident.amount)}</p>
              </div>
            )}
            {incident.daysOverdue && (
               <div>
                <p className="text-gray-500">Days Overdue:</p>
                <p className="font-medium text-red-600">{incident.daysOverdue}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-4 flex md:flex-col md:items-end gap-2">
          <button className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            View
          </button>
          <button className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
            Action
          </button>
        </div>

      </div>
    </div>
  );
};

export default IncidentCard;
