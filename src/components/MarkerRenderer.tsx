import React from 'react';
import { MarkerConfig } from '../types';

interface MarkerRendererProps {
  marker: MarkerConfig;
  data: any;
}

const MarkerRenderer: React.FC<MarkerRendererProps> = ({ marker, data }) => {
  const { type, valueKey } = marker;
  const value = data[valueKey];

  const renderMarker = () => {
    switch (type) {
      case 'status': {
        const statusValue = value as string;
        const statusColorMap: { [key: string]: string } = {
          active: 'bg-green-200 text-green-800',
          paused: 'bg-yellow-200 text-yellow-800',
          'on track': 'bg-blue-200 text-blue-800',
          'attention needed': 'bg-orange-200 text-orange-800',
          high: 'bg-red-200 text-red-800',
          medium: 'bg-yellow-200 text-yellow-800',
        };
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              statusColorMap[statusValue.toLowerCase()] || 'bg-gray-200 text-gray-800'
            }`}
          >
            {statusValue}
          </span>
        );
      }
      case 'trigger': {
        const triggerValue = value as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {triggerValue.map((trigger, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                {trigger}
              </span>
            ))}
          </div>
        );
      }
      case 'tag': {
        const tagValue = value as string;
        const tagColorMap: { [key: string]: string } = {
          ESCALATED: 'bg-red-500 text-white',
          'IN PROGRESS': 'bg-blue-500 text-white',
          MONITORING: 'bg-yellow-500 text-black',
          INVESTIGATING: 'bg-purple-500 text-white',
        };
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              tagColorMap[tagValue] || 'bg-gray-500 text-white'
            }`}
          >
            {tagValue}
          </span>
        );
      }
      default:
        return null;
    }
  };

  return <div className="flex items-center gap-2">{renderMarker()}</div>;
};

export default MarkerRenderer;
