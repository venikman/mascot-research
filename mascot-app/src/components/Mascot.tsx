import React from 'react';
import * as Poses from './poses';

type Pose = keyof typeof Poses;

interface MascotProps extends React.SVGProps<SVGSVGElement> {
  pose: string;
  poseLibrary: string[];
}

const toPascalCase = (str: string): string => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const Mascot: React.FC<MascotProps> = ({ pose, poseLibrary, ...props }) => {
  const pascalPose = toPascalCase(pose) as Pose;

  if (!poseLibrary.includes(pose) || !Poses[pascalPose]) {
    console.warn(`Invalid pose: ${pose}`);
    return <Poses.Neutral {...props} />;
  }

  const PoseComponent = Poses[pascalPose];
  return <PoseComponent {...props} />;
};

export default Mascot;