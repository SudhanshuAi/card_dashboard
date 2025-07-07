import React from 'react';
import { incidents } from '../data/incidents';
import { stats } from '../data/stats';
import IncidentCard from './IncidentCard';
import StatCard from './StatCard';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">

        {/* Incidents Section */}
        <div>
          <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
  <svg className="w-6 h-6 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
  Critical Loan Operations Incidents
</h2>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
