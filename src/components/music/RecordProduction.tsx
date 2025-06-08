
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Clock, Music, Star, Disc } from 'lucide-react';
import { Artist, Record } from '../../types/music';

interface RecordProductionProps {
  selectedArtist: Artist | null;
  studioSlots: number;
  activeProductions: number;
  canCreateRecord: boolean;
  onCreateRecord: (artistId: string, record: Omit<Record, 'id' | 'releaseDate' | 'sales' | 'certified' | 'inProduction' | 'earnings'>) => void;
}

export const RecordProduction: React.FC<RecordProductionProps> = ({
  selectedArtist,
  studioSlots,
  activeProductions,
  canCreateRecord,
  onCreateRecord
}) => {
  const [showCreateRecord, setShowCreateRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    name: '',
    tracks: 1,
    productionTime: 1
  });

  const recordTypes = [
    { tracks: 1, name: 'Single', icon: Music },
    { tracks: 4, name: 'EP', icon: Disc },
    { tracks: 8, name: 'Album', icon: Star },
    { tracks: 12, name: 'Double Album', icon: Star },
    { tracks: 16, name: 'Concept Album', icon: Star }
  ];

  const handleCreateRecord = () => {
    if (!newRecord.name?.trim() || !selectedArtist) return;
    
    onCreateRecord(selectedArtist.id, newRecord);
    setNewRecord({ name: '', tracks: 1, productionTime: 1 });
    setShowCreateRecord(false);

    // Show success toast notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('show-toast', {
        detail: {
          title: "Record Production Started!",
          description: `"${newRecord.name}" is now in production with ${newRecord.tracks} tracks.`,
          type: "success"
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleTracksChange = (value: string) => {
    const trackCount = parseInt(value) || 1;
    setNewRecord({ ...newRecord, tracks: trackCount });
  };

  const selectRecordType = (type: typeof recordTypes[0]) => {
    setNewRecord({ ...newRecord, tracks: type.tracks });
  };

  if (!selectedArtist) return null;

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Studio Status</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="text-gray-700">
            Production Slots: {activeProductions}/{studioSlots}
          </span>
        </div>
      </div>

      <Button
        onClick={() => setShowCreateRecord(true)}
        disabled={!canCreateRecord || selectedArtist.disbanded}
        className="w-full h-auto p-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl"
      >
        <div className="flex items-center gap-3 w-full">
          <Mic className="h-5 w-5" />
          <div className="text-left">
            <div className="font-bold">Create Record</div>
            <div className="text-xs opacity-90">Singles, EPs, Albums & More</div>
          </div>
        </div>
      </Button>

      {/* Create Record Modal - Enhanced */}
      {showCreateRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={(e) => e.target === e.currentTarget && setShowCreateRecord(false)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create New Record</h3>
                <p className="text-gray-600 mt-1">for {selectedArtist.name}</p>
              </div>
              <button 
                onClick={() => setShowCreateRecord(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Record Name</label>
                    <Input
                      value={newRecord.name}
                      onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                      placeholder="Enter record name"
                      className="text-lg p-4 h-12"
                    />
                  </div>

                  {/* Record Type Selection */}
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Record Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {recordTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <button
                            key={type.name}
                            onClick={() => selectRecordType(type)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                              newRecord.tracks === type.tracks
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <IconComponent className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                            <div className="text-sm font-bold">{type.name}</div>
                            <div className="text-xs text-gray-500">{type.tracks} tracks</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Custom Tracks (1-16)</label>
                    <Input
                      type="number"
                      min="1"
                      max="16"
                      value={newRecord.tracks}
                      onChange={(e) => handleTracksChange(e.target.value)}
                      className="text-lg p-4 h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Production Time</label>
                    <Select value={newRecord.productionTime.toString()} onValueChange={(value) => setNewRecord({ ...newRecord, productionTime: parseInt(value) })}>
                      <SelectTrigger className="text-lg p-4 h-12">
                        <SelectValue placeholder="Select production time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1" className="text-lg">1 year - Quick production</SelectItem>
                        <SelectItem value="2" className="text-lg">2 years - Standard quality</SelectItem>
                        <SelectItem value="3" className="text-lg">3 years - High quality</SelectItem>
                        <SelectItem value="4" className="text-lg">4 years - Premium quality</SelectItem>
                        <SelectItem value="5" className="text-lg">5 years - Masterpiece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column - Preview & Create */}
                <div className="space-y-6">
                  {/* Record Preview */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                    <h4 className="text-xl font-bold mb-4 text-blue-800">Record Preview</h4>
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Record Name</div>
                        <div className="text-lg font-bold text-gray-800">{newRecord.name || 'Untitled Record'}</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Format</div>
                        <div className="text-lg font-bold text-gray-800">
                          {recordTypes.find(t => t.tracks === newRecord.tracks)?.name || 'Custom'} ({newRecord.tracks} tracks)
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Production Time</div>
                        <div className="text-lg font-bold text-gray-800">{newRecord.productionTime} {newRecord.productionTime === 1 ? 'year' : 'years'}</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Estimated Release</div>
                        <div className="text-lg font-bold text-gray-800">
                          {new Date(Date.now() + newRecord.productionTime * 365 * 24 * 60 * 60 * 1000).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Create Button */}
                  <div className="text-center">
                    <Button 
                      onClick={handleCreateRecord} 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xl py-6 h-16 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg"
                      disabled={!newRecord.name?.trim()}
                    >
                      {!newRecord.name?.trim() ? 'Enter record name' : 'Start Production'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cancel Button */}
            <div className="p-8 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateRecord(false)} 
                className="w-full text-lg py-3 h-12 border-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
