
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Clock } from 'lucide-react';
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

  const handleCreateRecord = () => {
    if (!newRecord.name || !selectedArtist) return;
    
    onCreateRecord(selectedArtist.id, newRecord);
    setNewRecord({ name: '', tracks: 1, productionTime: 1 });
    setShowCreateRecord(false);
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
            <div className="text-xs opacity-90">Up to 16 tracks</div>
          </div>
        </div>
      </Button>

      {/* Create Record Modal */}
      {showCreateRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Create New Record</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Record Name</label>
                <Input
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  placeholder="Enter record name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tracks (1-16)</label>
                <Input
                  type="number"
                  min="1"
                  max="16"
                  value={newRecord.tracks}
                  onChange={(e) => setNewRecord({ ...newRecord, tracks: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Production Time (1-5 years)</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={newRecord.productionTime}
                  onChange={(e) => setNewRecord({ ...newRecord, productionTime: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateRecord} className="flex-1">Create Record</Button>
                <Button variant="outline" onClick={() => setShowCreateRecord(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
