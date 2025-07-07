import React from 'react';
import { StatCardData, StatCardStatus } from '../types';

const statusStyles: { [key in StatCardStatus]: string } = {
  'on track': 'bg-green-100 text-green-800',
  'attention needed': 'bg-yellow-100 text-red-800',
};

const StatCard: React.FC<{ data: StatCardData }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{data.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[data.status]}`}>
            {data.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          {data.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className={`text-2xl font-semibold ${metric.label === 'Approval Rate' ? 'text-green-600' : 'text-gray-900'}`}>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
      {data.efficiency && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Department Efficiency</p>
            <p className="text-sm font-semibold text-gray-900">{data.efficiency}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
