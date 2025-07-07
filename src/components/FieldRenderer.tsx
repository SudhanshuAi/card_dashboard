// src/components/FieldRenderer.tsx

import React from 'react';
import { FieldConfig } from '../types';

interface FieldRendererProps {
  field: FieldConfig;
  data: any;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, data }) => {
  const { label, dataKey, type, style } = field;
  const value = data[dataKey];

  const renderValue = () => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'percentage':
        return `${value}%`;
      case 'number':
      case 'date':
      case 'text':
      default:
        return value;
    }
  };

  return (
    <div
      style={{
        gridColumn: `span ${style?.colSpan || 1}`,
        gridRow: `span ${style?.rowSpan || 1}`,
        textAlign: style?.textAlign || 'left',
      }}
    >
      <div className="text-sm text-gray-500">{label}</div>
      <div
        className="text-lg"
        style={{
          fontSize: style?.fontSize,
          fontWeight: style?.fontWeight,
          color: style?.color,
        }}
      >
        {renderValue()}
      </div>
    </div>
  );
};

export default FieldRenderer;
