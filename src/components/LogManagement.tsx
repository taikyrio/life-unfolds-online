import React, { useState } from 'react';
import { gameLogger } from '../utils/gameLogger';
import { Download, Upload, Trash2, FileText, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogManagementProps {
  isOpen: boolean;
  onClose: () => void;
  characterName: string;
}

export const LogManagement: React.FC<LogManagementProps> = ({ isOpen, onClose, characterName }) => {
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [importData, setImportData] = useState('');
  const [showImport, setShowImport] = useState(false);

  if (!isOpen) return null;

  const allLogs = gameLogger.getCharacterLogs();
  const currentEvents = gameLogger.getAllEvents();

  const handleExport = () => {
    const exportData = gameLogger.exportLog();
    if (!exportData) return;

    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterName.replace(/[^a-zA-Z0-9]/g, '_')}_life_log_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const success = gameLogger.importLog(importData);
      if (success) {
        setImportData('');
        setShowImport(false);
        alert('Log imported successfully!');
      } else {
        alert('Failed to import log. Please check the format.');
      }
    } catch (error) {
      alert('Invalid log format.');
    }
  };

  const handleDeleteLog = (logId: string) => {
    if (confirm('Are you sure you want to delete this character log?')) {
      // Implementation would depend on adding delete functionality to gameLogger
      console.log('Delete log:', logId);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Life Logs</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Current Session Stats */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Current Session: {characterName}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <span className="font-medium">Total Events:</span> {currentEvents.length}
              </div>
              <div>
                <span className="font-medium">Last Saved:</span> {formatDate(Date.now())}
              </div>
            </div>
          </div>

          {/* Export/Import Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={currentEvents.length === 0}
            >
              <Download className="w-4 h-4" />
              Export Log
            </Button>
            <Button
              onClick={() => setShowImport(!showImport)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Import Log
            </Button>
          </div>

          {/* Import Section */}
          {showImport && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Import Character Log</h4>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Paste exported log data here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none text-sm"
              />
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={handleImport}
                  size="sm"
                  disabled={!importData.trim()}
                >
                  Import
                </Button>
                <Button
                  onClick={() => setShowImport(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Saved Logs */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Saved Character Logs ({allLogs.length})
            </h3>
            
            {allLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No saved logs yet</p>
                <p className="text-xs mt-1">Export your current game to save progress</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allLogs.map((log) => (
                  <div
                    key={log.characterId}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{log.characterName}</h4>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Born {log.birthYear}
                            </span>
                            <span>{log.events.length} events</span>
                          </div>
                          <div className="mt-1">
                            Last saved: {formatDate(log.lastSaved)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const exportData = JSON.stringify(log, null, 2);
                            const blob = new Blob([exportData], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${log.characterName.replace(/[^a-zA-Z0-9]/g, '_')}_log.json`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Export this log"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLog(log.characterId)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete this log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            Logs are automatically saved to your device's local storage
          </p>
        </div>
      </div>
    </div>
  );
};