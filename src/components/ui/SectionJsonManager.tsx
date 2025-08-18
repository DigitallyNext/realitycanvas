'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface SectionJsonManagerProps {
  sectionName: string;
  data: any;
  onImport: (data: any) => void;
  sampleData?: any;
  className?: string;
}

export default function SectionJsonManager({ 
  sectionName, 
  data, 
  onImport, 
  sampleData,
  className = "" 
}: SectionJsonManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  const handleExport = () => {
    const exportData = data || sampleData;
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sectionName.toLowerCase().replace(/\\s+/g, '-')}-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importText);
      onImport(parsed);
      setImportText('');
      setIsOpen(false);
    } catch (error) {
      setImportError('Invalid JSON format. Please check your input.');
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportText(content);
      };
      reader.readAsText(file);
    }
  };

  const loadSampleData = () => {
    if (sampleData) {
      setImportText(JSON.stringify(sampleData, null, 2));
    }
  };

  if (!isOpen) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <DocumentTextIcon className="w-4 h-4 mr-1" />
          JSON
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {sectionName} JSON Manager
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Export Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Export Current Data
          </label>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Download {sectionName} JSON
          </button>
        </div>

        {/* Import Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Import Data
          </label>
          
          {/* File Upload */}
          <div className="mb-3">
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Textarea */}
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={`Paste ${sectionName.toLowerCase()} JSON data here...`}
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
          />

          {importError && (
            <p className="text-red-600 text-sm mt-2">{importError}</p>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
              Import Data
            </button>
            
            {sampleData && (
              <button
                onClick={loadSampleData}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Load Sample
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
