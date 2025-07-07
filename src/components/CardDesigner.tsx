import React, { useState } from 'react';
import { CardConfig, FieldConfig, MarkerConfig, ActionConfig } from '../types';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import Card from './Card';

interface CardDesignerProps {
  initialConfig?: CardConfig;
  onConfigChange?: (config: CardConfig) => void;
}

const FIELD_TYPES: FieldConfig['type'][] = [
  'number',
  'currency',
  'percentage',
  'date',
  'badge',
  'text',
  'status',
];

const MARKER_TYPES: MarkerConfig['type'][] = ['status', 'trigger', 'tag'];
const ACTION_TYPES: ActionConfig['actionType'][] = ['pause', 'edit', 'resume', 'view', 'custom'];

const FONT_WEIGHTS = ['normal', 'bold'] as const;
const TEXT_ALIGNS = ['left', 'center', 'right'] as const;

const mockData = {
  successRate: 95,
  totalRuns: 120,
  avgDuration: 2.3,
  lastRun: '2024-07-07',
  status: 'on track',
  triggers: 'auto',
};

const THEMES = ['blue', 'green', 'red', 'orange', 'gray'] as const;

const CardDesigner: React.FC<CardDesignerProps> = ({ initialConfig, onConfigChange }) => {
  const [config, setConfig] = useState<CardConfig>(
    initialConfig || {
      id: 'new-card',
      title: '',
      theme: 'gray',
      layout: { rows: 2, cols: 2 },
      fields: [],
      markers: [],
      actions: [],
    }
  );
  const [importValue, setImportValue] = useState('');
  const [newField, setNewField] = useState<Partial<FieldConfig>>({ type: 'text' });
  const [newMarker, setNewMarker] = useState<Partial<MarkerConfig>>({ type: 'status' });
  const [newAction, setNewAction] = useState<Partial<ActionConfig>>({ actionType: 'view' });
  const [transformString, setTransformString] = useState<string>('');

  const handleExport = () => {
    const exportConfig = { ...config, transformString };
    const json = JSON.stringify(exportConfig, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.id || 'card-config'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const imported = JSON.parse(importValue);
      setConfig(imported);
      setTransformString(imported.transformString || '');
      onConfigChange && onConfigChange(imported);
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(config.fields);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    const newConfig = { ...config, fields: reordered };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleFieldChange = (idx: number, key: keyof FieldConfig, value: any) => {
    const updatedFields = config.fields.map((f, i) =>
      i === idx ? { ...f, [key]: value } : f
    );
    const newConfig = { ...config, fields: updatedFields };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleRemoveField = (idx: number) => {
    const updatedFields = config.fields.filter((_, i) => i !== idx);
    const newConfig = { ...config, fields: updatedFields };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleAddField = () => {
    if (!newField.label || !newField.dataKey || !newField.type) return;
    const field: FieldConfig = {
      id: `${newField.dataKey}-${Date.now()}`,
      label: newField.label,
      dataKey: newField.dataKey,
      type: newField.type as any,
      position: { row: 0, col: 0 },
    };
    const newConfig = { ...config, fields: [...config.fields, field] };
    setConfig(newConfig);
    setNewField({ type: 'text' });
    onConfigChange && onConfigChange(newConfig);
  };

  const handleAddMarker = () => {
    if (!newMarker.type || !newMarker.valueKey) return;
    const marker: MarkerConfig = {
      type: newMarker.type as MarkerConfig['type'],
      valueKey: newMarker.valueKey,
    };
    const newConfig = { ...config, markers: [...(config.markers || []), marker] };
    setConfig(newConfig);
    setNewMarker({ type: 'status' });
    onConfigChange && onConfigChange(newConfig);
  };

  const handleRemoveMarker = (idx: number) => {
    const updated = (config.markers || []).filter((_, i) => i !== idx);
    const newConfig = { ...config, markers: updated };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleMarkerChange = (idx: number, key: keyof MarkerConfig, value: any) => {
    const updated = (config.markers || []).map((m, i) => i === idx ? { ...m, [key]: value } : m);
    const newConfig = { ...config, markers: updated };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleAddAction = () => {
    if (!newAction.label || !newAction.actionType) return;
    const action: ActionConfig = {
      label: newAction.label,
      actionType: newAction.actionType as ActionConfig['actionType'],
    };
    const newConfig = { ...config, actions: [...(config.actions || []), action] };
    setConfig(newConfig);
    setNewAction({ actionType: 'view' });
    onConfigChange && onConfigChange(newConfig);
  };

  const handleRemoveAction = (idx: number) => {
    const updated = (config.actions || []).filter((_, i) => i !== idx);
    const newConfig = { ...config, actions: updated };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleActionChange = (idx: number, key: keyof ActionConfig, value: any) => {
    const updated = (config.actions || []).map((a, i) => i === idx ? { ...a, [key]: value } : a);
    const newConfig = { ...config, actions: updated };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  const handleConfigChange = (key: keyof CardConfig | 'transformString', value: any) => {
    if (key === 'transformString') {
      setTransformString(value);
      return;
    }
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigChange && onConfigChange(newConfig);
  };

  let previewConfig = config;
  if (transformString) {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('data', transformString) as (data: any) => any;
      previewConfig = { ...config, transform: fn };
    } catch {}
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Card Designer (Beta)</h2>
      {/* Card Meta Editor */}
      <div className="mb-4 flex gap-2 items-end">
        <input
          className="border rounded p-2 flex-1"
          placeholder="Card Title"
          value={config.title}
          onChange={e => handleConfigChange('title', e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={config.theme}
          onChange={e => handleConfigChange('theme', e.target.value)}
        >
          {THEMES.map(theme => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          className="border rounded p-2 w-20"
          placeholder="Rows"
          value={config.layout.rows}
          onChange={e => handleConfigChange('layout', { ...config.layout, rows: Number(e.target.value) })}
        />
        <input
          type="number"
          min={1}
          className="border rounded p-2 w-20"
          placeholder="Cols"
          value={config.layout.cols}
          onChange={e => handleConfigChange('layout', { ...config.layout, cols: Number(e.target.value) })}
        />
      </div>
      {/* Add Field UI */}
      <div className="mb-4 flex gap-2 items-end">
        <input
          className="border rounded p-2 flex-1"
          placeholder="Label"
          value={newField.label || ''}
          onChange={e => setNewField(f => ({ ...f, label: e.target.value }))}
        />
        <input
          className="border rounded p-2 flex-1"
          placeholder="Data Key"
          value={newField.dataKey || ''}
          onChange={e => setNewField(f => ({ ...f, dataKey: e.target.value }))}
        />
        <select
          className="border rounded p-2"
          value={newField.type}
          onChange={e => setNewField(f => ({ ...f, type: e.target.value as FieldConfig['type'] }))}
        >
          {FIELD_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={handleAddField}>
          Add Field
        </button>
      </div>
      {/* Drag-and-drop field editor */}
      <div className="mb-4 p-4 border rounded bg-gray-50 overflow-x-auto">
        <div className="font-semibold mb-2">Fields (Drag to reorder, edit, or remove):</div>
        <div className="min-w-[900px]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields-droppable">
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                  {config.fields.map((field, idx) => (
                    <Draggable key={field.id} draggableId={field.id} index={idx}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex flex-row flex-wrap md:flex-nowrap items-center gap-2 p-2 border-b last:border-b-0 bg-white rounded ${snapshot.isDragging ? 'shadow-lg bg-blue-50' : ''}`}
                        >
                          <span className="cursor-move">☰</span>
                          <input
                            className="border rounded p-1 w-24"
                            value={field.label}
                            onChange={e => handleFieldChange(idx, 'label', e.target.value)}
                          />
                          <input
                            className="border rounded p-1 w-24"
                            value={field.dataKey}
                            onChange={e => handleFieldChange(idx, 'dataKey', e.target.value)}
                          />
                          <select
                            className="border rounded p-1"
                            value={field.type}
                            onChange={e => handleFieldChange(idx, 'type', e.target.value as FieldConfig['type'])}
                          >
                            {FIELD_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          {/* Style editors */}
                          <input
                            className="border rounded p-1 w-16"
                            placeholder="Font Size"
                            value={field.style?.fontSize || ''}
                            onChange={e => handleFieldChange(idx, 'style', { ...field.style, fontSize: e.target.value })}
                          />
                          <select
                            className="border rounded p-1"
                            value={field.style?.fontWeight || ''}
                            onChange={e => handleFieldChange(idx, 'style', { ...field.style, fontWeight: e.target.value })}
                          >
                            <option value="">Weight</option>
                            {FONT_WEIGHTS.map(w => <option key={w} value={w}>{w}</option>)}
                          </select>
                          <input
                            className="border rounded p-1 w-16"
                            placeholder="Color"
                            value={field.style?.color || ''}
                            onChange={e => handleFieldChange(idx, 'style', { ...field.style, color: e.target.value })}
                          />
                          <input
                            className="border rounded p-1 w-12"
                            placeholder="ColSpan"
                            type="number"
                            min={1}
                            value={field.style?.colSpan || ''}
                            onChange={e => handleFieldChange(idx, 'style', { ...field.style, colSpan: e.target.value ? Number(e.target.value) : undefined })}
                          />
                          <input
                            className="border rounded p-1 w-12"
                            placeholder="RowSpan"
                            type="number"
                            min={1}
                            value={field.style?.rowSpan || ''}
                            onChange={e => handleFieldChange(idx, 'style', { ...field.style, rowSpan: e.target.value ? Number(e.target.value) : undefined })}
                          />
                          <select
                            className="border rounded p-1"
                            value={field.style?.textAlign || ''}
                            onChange={e => handleFieldChange(idx, 'style', { ...field.style, textAlign: e.target.value as 'left' | 'center' | 'right' })}
                          >
                            <option value="">Align</option>
                            {TEXT_ALIGNS.map(a => <option key={a} value={a}>{a}</option>)}
                          </select>
                          <button
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                            onClick={() => handleRemoveField(idx)}
                          >
                            Remove
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      {/* Marker Editor */}
      <div className="mb-4 p-4 border rounded bg-gray-50">
        <div className="font-semibold mb-2">Markers</div>
        <div className="flex gap-2 mb-2">
          <select className="border rounded p-2" value={newMarker.type} onChange={e => setNewMarker(m => ({ ...m, type: e.target.value as MarkerConfig['type'] }))}>
            {MARKER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <input className="border rounded p-2 flex-1" placeholder="Value Key" value={newMarker.valueKey || ''} onChange={e => setNewMarker(m => ({ ...m, valueKey: e.target.value }))} />
          <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={handleAddMarker}>Add Marker</button>
        </div>
        <ul>
          {(config.markers || []).map((marker, idx) => (
            <li key={idx} className="flex items-center gap-2 mb-1">
              <select className="border rounded p-1" value={marker.type} onChange={e => handleMarkerChange(idx, 'type', e.target.value as MarkerConfig['type'])}>
                {MARKER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input className="border rounded p-1" value={marker.valueKey} onChange={e => handleMarkerChange(idx, 'valueKey', e.target.value)} />
              <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleRemoveMarker(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Action Editor */}
      <div className="mb-4 p-4 border rounded bg-gray-50">
        <div className="font-semibold mb-2">Actions</div>
        <div className="flex gap-2 mb-2">
          <input className="border rounded p-2 flex-1" placeholder="Label" value={newAction.label || ''} onChange={e => setNewAction(a => ({ ...a, label: e.target.value }))} />
          <select className="border rounded p-2" value={newAction.actionType} onChange={e => setNewAction(a => ({ ...a, actionType: e.target.value as ActionConfig['actionType'] }))}>
            {ACTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={handleAddAction}>Add Action</button>
        </div>
        <ul>
          {(config.actions || []).map((action, idx) => (
            <li key={idx} className="flex items-center gap-2 mb-1">
              <input className="border rounded p-1" value={action.label} onChange={e => handleActionChange(idx, 'label', e.target.value)} />
              <select className="border rounded p-1" value={action.actionType} onChange={e => handleActionChange(idx, 'actionType', e.target.value as ActionConfig['actionType'])}>
                {ACTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleRemoveAction(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Transform Function Editor */}
      <div className="mb-4 p-4 border rounded bg-yellow-50">
        <div className="font-semibold mb-2">Custom Data Transform (Advanced)</div>
        <div className="text-xs text-yellow-700 mb-1">
          This must be a valid JS function body. Example: "return {'{'} ...data, newField: data.a + data.b {'}'};"
        </div>
        <textarea
          className="border rounded p-2 w-full text-xs"
          rows={3}
          placeholder="JS function body, e.g. return { ...data, newField: data.a + data.b };"
          value={transformString}
          onChange={e => handleConfigChange('transformString', e.target.value)}
        />
      </div>
      {/* Export/Import controls */}
      <div className="flex gap-4 mb-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleExport}>
          Export Config as JSON
        </button>
        <textarea
          className="border rounded p-2 flex-1"
          rows={3}
          placeholder="Paste JSON here to import"
          value={importValue}
          onChange={e => setImportValue(e.target.value)}
        />
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleImport}>
          Import
        </button>
      </div>
      <div className="text-xs text-gray-500 mb-4">
        You can now add, edit, remove, and reorder fields.
      </div>
    </div>
  );
};

export default CardDesigner; 