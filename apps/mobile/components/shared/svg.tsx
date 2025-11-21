import * as React from 'react';
import { useColorScheme } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';

export const TrackIllustration = () => {
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? '#8BC34A' : '#00C853';

  return (
    <Svg width={720} height={540} viewBox="0 0 720 540">
      {/* Background blobs */}
      <G opacity={0.08} fill={color}>
        <Circle cx="110" cy="120" r="90" />
        <Circle cx="650" cy="90" r="70" />
        <Circle cx="620" cy="480" r="90" />
      </G>

      {/* Ground shadow */}
      <Ellipse cx="360" cy="470" rx="220" ry="24" fill={color} opacity={0.06} />

      {/* Card */}
      <G>
        <Rect x="165" y="110" width="390" height="300" rx="24" fill={color} opacity={0.06} />
        <Rect
          x="165"
          y="110"
          width="390"
          height="300"
          rx="24"
          stroke={color}
          strokeWidth={2}
          opacity={0.16}
        />
        <Rect x="165" y="110" width="390" height="56" rx="24" fill={color} opacity={0.1} />
      </G>

      {/* Dots example */}
      <G opacity={0.35} fill={color}>
        <Circle cx="210" cy="138" r="6" />
        <Circle cx="250" cy="138" r="6" />
        <Circle cx="290" cy="138" r="6" />
      </G>
    </Svg>
  );
};
