// src/components/Card.tsx

import React from 'react';
import { CardConfig } from '../types';
import FieldRenderer from './FieldRenderer';
import MarkerRenderer from './MarkerRenderer';
import ActionRenderer from './ActionRenderer';

interface CardProps {
  config: CardConfig;
  data: any;
}

const Card: React.FC<CardProps> = ({ config, data }) => {
  const { title, theme, layout, fields, markers, actions } = config;

  const themeClasses = {
    blue: 'bg-blue-100 border-blue-200',
    green: 'bg-green-100 border-green-200',
    red: 'bg-red-100 border-red-200',
    orange: 'bg-orange-100 border-orange-200',
    gray: 'bg-gray-100 border-gray-200',
  };

  return (
    <div className={`p-4 rounded-lg border ${themeClasses[theme]}`}>
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex items-center gap-2">
          {markers?.map((marker, index) => (
            <MarkerRenderer key={index} marker={marker} data={data} />
          ))}
        </div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
          gridTemplateRows: `repeat(${layout.rows}, auto)`,
          gap: '1rem',
        }}
      >
        {fields.map((field) => (
          <div
            key={field.id}
            style={{
              gridColumnStart: field.position.col + 1,
              gridRowStart: field.position.row + 1,
              gridColumnEnd: `span ${field.style?.colSpan || 1}`,
              gridRowEnd: `span ${field.style?.rowSpan || 1}`,
            }}
          >
            <FieldRenderer field={field} data={data} />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 gap-2">
        {actions?.map((action, index) => (
          <ActionRenderer key={index} action={action} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Card;
