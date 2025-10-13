import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSpecSync } from '@/data/loadSpec';

interface MascotPoserProps {
  selectedPose?: string;
  onSelectPose: (pose: string) => void;
}

export function MascotPoser({ selectedPose, onSelectPose }: MascotPoserProps) {
  const spec = getSpecSync();
  const poses = spec.pose_library;

  const getPoseCategory = (pose: string): string => {
    if (['neutral', 'think', 'aha', 'wince', 'shrug', 'focus', 'strain', 'calm'].includes(pose)) {
      return 'emotional';
    }
    if (['point', 'hold_card', 'carry_brick', 'climb_step', 'check_box', 'cut_arrow'].includes(pose)) {
      return 'action';
    }
    return 'activity';
  };

  const getPoseDescription = (pose: string): string => {
    const descriptions: Record<string, string> = {
      neutral: 'Default standing pose',
      think: 'Contemplative thinking',
      aha: 'Moment of insight',
      wince: 'Concerned or uncertain',
      shrug: 'Uncertain or neutral response',
      focus: 'Concentrated attention',
      strain: 'Effortful work',
      calm: 'Peaceful and centered',
      point: 'Indicating or directing',
      hold_card: 'Holding a card or template',
      carry_brick: 'Carrying building blocks',
      climb_step: 'Taking a step forward',
      check_box: 'Marking completion',
      cut_arrow: 'Cutting or removing',
      open_book: 'Reading or studying',
      sweep_noise: 'Clearing distractions',
      sit_meditate: 'Meditative sitting',
      type_log: 'Recording or logging'
    };
    return descriptions[pose] || 'Pose description';
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      emotional: 'bg-orange-500',
      action: 'bg-blue-500',
      activity: 'bg-green-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#111111' }}>Δbit Mascot Poses</h2>
        <p className="text-gray-600">Select a pose for your meme. {poses.length} poses available.</p>
        {selectedPose && (
          <p className="mt-2 text-sm" style={{ color: '#FF6A00' }}>
            Selected: <span className="font-bold">{selectedPose}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {poses.map((pose) => {
          const category = getPoseCategory(pose);
          const isSelected = pose === selectedPose;
          
          return (
            <Card 
              key={pose}
              className={`cursor-pointer hover:shadow-lg transition-all ${
                isSelected ? 'ring-2 ring-orange-500 shadow-lg' : ''
              }`}
              onClick={() => onSelectPose(pose)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{pose.replace(/_/g, ' ')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div 
                    className="w-full aspect-square rounded-lg flex items-center justify-center text-4xl"
                    style={{ 
                      backgroundColor: isSelected ? '#FF6A00' : '#3178C6',
                      color: '#FFFFFF'
                    }}
                  >
                    Δ
                  </div>
                  <Badge className={getCategoryColor(category)} variant="secondary">
                    {category}
                  </Badge>
                  <CardDescription className="text-xs">
                    {getPoseDescription(pose)}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
