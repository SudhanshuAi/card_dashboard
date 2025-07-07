// src/components/ActionRenderer.tsx

import React from 'react';
import { ActionConfig } from '../types';

interface ActionRendererProps {
  action: ActionConfig;
  data: any;
}

const ActionRenderer: React.FC<ActionRendererProps> = ({ action, data }) => {
  const { label, actionType, onClick } = action;

  const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium';
  const themeClasses = {
    pause: 'bg-yellow-500 text-white hover:bg-yellow-600',
    edit: 'bg-blue-500 text-white hover:bg-blue-600',
    resume: 'bg-green-500 text-white hover:bg-green-600',
    view: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    custom: 'bg-purple-500 text-white hover:bg-purple-600',
  };

  const handleClick = () => {
    if (onClick) {
      onClick(data);
    } else {
      console.log(`Action triggered: ${actionType}`, data);
    }
  };

  return (
    <button
      className={`${baseClasses} ${themeClasses[actionType]}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ActionRenderer;
