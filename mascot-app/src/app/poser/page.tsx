import Mascot from '@/components/Mascot';
import { getSpec } from '@/lib/data';

export default function MascotPoserPage() {
  const spec = getSpec();
  const poses = spec.pose_library;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Mascot Poser</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {poses.map(pose => (
          <div key={pose} className="border rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <Mascot pose={pose} poseLibrary={poses} className="w-40 h-40" />
            <p className="mt-4 text-md font-semibold capitalize">{pose.replace(/_/g, ' ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}