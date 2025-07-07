import React from 'react';
import { CardConfig, FieldConfig } from '../types';

interface CardProps {
  config: CardConfig;
  data: Record<string, any>;
  onAction?: (actionType: string, data: any) => void;
}

const badgeColors: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-500',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-blue-100 text-blue-800',
  ESCALATED: 'bg-red-100 text-red-500',
  'IN PROGRESS': 'bg-blue-500 text-white',
  MONITORING: 'bg-yellow-500 text-white',
  INVESTIGATING: 'bg-purple-500 text-white',
  'on track': 'bg-green-100 text-green-800',
  'attention needed': 'bg-yellow-100 text-red-800',
};

const getFieldValue = (data: Record<string, any>, field: FieldConfig) => {
  const value = data[field.dataKey];
  if (field.type === 'currency') {
    return <span className="font-semibold text-green-600">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}</span>;
  }
  if (field.type === 'percentage') {
    return <span className="font-semibold text-green-600">{value}%</span>;
  }
  if (field.dataKey === 'daysOverdue' && value) {
    return <span className="font-semibold text-red-600">{value}</span>;
  }
  if (field.style?.fontWeight === 'bold') {
    return <span className="font-bold">{value}</span>;
  }
  return value;
};

const renderBadges = (data: Record<string, any>, markerKeys: string[]) => (
  <div className="flex gap-2 ml-2">
    {markerKeys.map((key) =>
      data[key] ? (
        <span
          key={key}
          className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColors[data[key]] || 'bg-gray-100 text-gray-800'}`}
        >
          {data[key]}
        </span>
      ) : null
    )}
  </div>
);

const EyeIcon = () => (
  <svg className="w-5 h-5 mr-1 inline-block align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Card: React.FC<CardProps> = ({ config, data, onAction }) => {
  const { title, theme, fields, actions, markers, layout, transform, id } = config;
  const transformedData = transform ? transform(data) : data;

  // Detect Incident Card (by field pattern or config id)
  const isIncident = id?.includes('incident') || fields.some(f => f.dataKey === 'assignedTo');
  // Detect Stat Card (by field pattern or config id)
  const isStat = id?.includes('stat') || fields.some(f => f.dataKey === 'metric1');

  // Custom Incident Card Layout
  if (isIncident) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex justify-between items-start mb-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">{transformedData.title}</span>
              {renderBadges(transformedData, ['severity', 'status'])}
            </div>
            <div className="text-sm text-gray-700 mt-2">{transformedData.description}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {actions?.map((action, idx) => (
              <button
                key={idx}
                className={
                  action.label === 'Action'
                    ? 'w-24 px-4 py-1 text-sm font-semibold rounded-full border border-purple-500 text-purple-600 bg-purple-50 hover:bg-purple-100 transition'
                    : 'w-24 px-3 py-1 text-sm font-medium rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 flex items-center'
                }
                onClick={() => onAction && onAction(action.actionType, transformedData)}
              >
                {action.label === 'View' && <EyeIcon />}
                {action.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 text-sm mt-2">
          <div>
            <div className="text-gray-500">Assigned to:</div>
            <div className="font-semibold text-gray-900">{transformedData.assignedTo}</div>
          </div>
          <div>
            <div className="text-gray-500">Time:</div>
            <div className="font-semibold text-gray-900">{transformedData.time}</div>
          </div>
          {transformedData.amount !== 0 && (
            <div>
              <div className="text-gray-500">Amount:</div>
              <div className="font-semibold text-green-600">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transformedData.amount)}
              </div>
            </div>
          )}
          {transformedData.daysOverdue !== undefined && (
            <div>
              <div className="text-gray-500">Days Overdue:</div>
              <div className="font-semibold text-red-600">{transformedData.daysOverdue}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Custom Stat Card Layout
  if (isStat) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">{transformedData.title}</span>
          {transformedData.status && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColors[transformedData.status] || 'bg-gray-100 text-gray-800'}`}>{transformedData.status}</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-2">
          <div>
            <div className="text-gray-500 text-sm">Active Loans</div>
            <div className="text-2xl font-bold text-gray-900">{transformedData.metric1}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Avg. Processing</div>
            <div className="text-2xl font-bold text-gray-900">{transformedData.metric2}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Today's Applications</div>
            <div className="text-2xl font-bold text-gray-900">{transformedData.metric3}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Approval Rate</div>
            <div className="text-2xl font-bold text-green-600">{transformedData.metric4}</div>
          </div>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-sm">Department Efficiency</div>
          <div className="text-base font-bold text-gray-900">{transformedData.efficiency}%</div>
        </div>
      </div>
    );
  }

  // Generic fallback for all other cards
  const markerKeys = markers ? markers.map(m => m.valueKey) : [];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-900">{title}</span>
        {markers && renderBadges(transformedData, markerKeys)}
      </div>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${layout?.cols || 1}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${layout?.rows || 1}, auto)`
        }}
      >
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col"
            style={{
              gridColumn: field.style?.colSpan ? `span ${field.style.colSpan}` : undefined,
              gridRow: field.style?.rowSpan ? `span ${field.style.rowSpan}` : undefined,
              color: field.style?.color,
              fontWeight: field.style?.fontWeight,
              fontSize: field.style?.fontSize,
              textAlign: field.style?.textAlign,
            }}
          >
            {field.label && <span className="text-xs text-gray-500">{field.label}</span>}
            <span>{getFieldValue(transformedData, field)}</span>
          </div>
        ))}
      </div>
      {actions && actions.length > 0 && (
        <div className="flex gap-2 mt-4">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className="px-3 py-1 text-sm font-medium rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => onAction && onAction(action.actionType, transformedData)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;