import React from 'react';

const SweepNoise: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <rect width="100" height="100" fill="gray" />
    <text x="50" y="50" textAnchor="middle" dy=".3em" fill="white">SweepNoise</text>
  </svg>
);

export default SweepNoise;
