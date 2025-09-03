'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import ImageUpload from './ImageUpload';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FloorPlan {
  id: string;
  level: string;
  title: string;
  imageUrl: string;
  description?: string;
  totalUnits?: number;
  availableUnits?: number;
  areaRange?: string;
  priceRange?: string;
}

interface FloorPlanManagerProps {
  value: FloorPlan[];
  onChange: (floorPlans: FloorPlan[]) => void;
  className?: string;
}

const defaultFloorLevels = [
  'Basement',
  'Terrace',
  'Lower Ground Floor',
  'Ground Floor',
  'First Floor', 
  'Second Floor',
  'Mezzanine Floor',
  'Third Floor',
  'Fourth Floor',
  'Fifth Floor',
  'Sixth Floor',
  'Seventh Floor',
  'Eighth Floor',
  'Ninth Floor',
  'Tenth Floor',
  'Typical Floor',
  '5 BHK',
  '4 BHK',
  '3 BHK',
  '2 BHK',
  '1 BHK',
  'Main Site',
  'Site Map',
  'Apartment',
  'None'
];

// Sortable Floor Plan Item Component
interface SortableFloorPlanItemProps {
  floorPlan: FloorPlan;
  index: number;
  onUpdate: (index: number, field: keyof FloorPlan, value: string | number) => void;
  onRemove: (index: number) => void;
}

function SortableFloorPlanItem({ floorPlan, index, onUpdate, onRemove }: SortableFloorPlanItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: floorPlan.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm ${
        isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Drag to reorder"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Floor Plan {index + 1}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Floor Plan Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Floor Plan Image
          </label>
          <ImageUpload
            value={floorPlan.imageUrl}
            onChange={(url) => onUpdate(index, 'imageUrl', url)}
            placeholder="Upload floor plan image"
            folder="projects/floor-plans"
          />
        </div>

        {/* Floor Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Floor Level *
            </label>
            <select
              value={floorPlan.level}
              onChange={(e) => onUpdate(index, 'level', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Floor Level</option>
              {defaultFloorLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Floor Title
            </label>
            <input
              type="text"
              value={floorPlan.title}
              onChange={(e) => onUpdate(index, 'title', e.target.value)}
              placeholder="e.g., Retail & Food Court"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={floorPlan.description}
              onChange={(e) => onUpdate(index, 'description', e.target.value)}
              placeholder="Brief description of this floor"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Units
              </label>
              <input
                type="number"
                value={floorPlan.totalUnits || ''}
                onChange={(e) => onUpdate(index, 'totalUnits', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Units
              </label>
              <input
                type="number"
                value={floorPlan.availableUnits || ''}
                onChange={(e) => onUpdate(index, 'availableUnits', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Area Range
              </label>
              <input
                type="text"
                value={floorPlan.areaRange}
                onChange={(e) => onUpdate(index, 'areaRange', e.target.value)}
                placeholder="500-800 Sq.ft"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <input
                type="text"
                value={floorPlan.priceRange}
                onChange={(e) => onUpdate(index, 'priceRange', e.target.value)}
                placeholder="₹2-4 Crore"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FloorPlanManager({ value, onChange, className = '' }: FloorPlanManagerProps) {
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(value);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sync with parent value changes (for when data is loaded from API)
  useEffect(() => {
    console.log('FloorPlanManager: value prop changed:', value);
    setFloorPlans(value);
  }, [value]);

  const addFloorPlan = () => {
    const newFloorPlan: FloorPlan = {
      id: Date.now().toString(),
      level: '',
      title: '',
      imageUrl: '',
      description: '',
      totalUnits: 0,
      availableUnits: 0,
      areaRange: '',
      priceRange: ''
    };
    
    const updated = [...floorPlans, newFloorPlan];
    setFloorPlans(updated);
    onChange(updated);
  };

  const updateFloorPlan = (index: number, field: keyof FloorPlan, value: string | number) => {
    const updated = [...floorPlans];
    updated[index] = { ...updated[index], [field]: value };
    setFloorPlans(updated);
    onChange(updated);
  };

  const removeFloorPlan = (index: number) => {
    const updated = floorPlans.filter((_, i) => i !== index);
    setFloorPlans(updated);
    onChange(updated);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = floorPlans.findIndex((item) => item.id === active.id);
      const newIndex = floorPlans.findIndex((item) => item.id === over?.id);

      const reorderedFloorPlans = arrayMove(floorPlans, oldIndex, newIndex);
      setFloorPlans(reorderedFloorPlans);
      onChange(reorderedFloorPlans);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Floor Plans</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add floor plans with layouts and unit information
          </p>
        </div>
        <button
          type="button"
          onClick={addFloorPlan}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Floor Plan
        </button>
      </div>

      {floorPlans.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <BuildingOfficeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No floor plans added yet</p>
          <button
            type="button"
            onClick={addFloorPlan}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Your First Floor Plan
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={floorPlans.map(fp => fp.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {floorPlans.map((floorPlan, index) => (
                <SortableFloorPlanItem
                  key={floorPlan.id}
                  floorPlan={floorPlan}
                  index={index}
                  onUpdate={updateFloorPlan}
                  onRemove={removeFloorPlan}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
