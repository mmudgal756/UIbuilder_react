import React from 'react';
import './Map.css';

export interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: number;
  width?: number;
  marker?: boolean;
}

export const Map: React.FC<MapProps> = ({ lat, lng, zoom = 12, height = 300, width = 400, marker = true }) => {
  // For demo, just show coordinates. Integrate with a map API for real use.
  return (
    <div className="custom-map" style={{ height, width }}>
      <div>
        <strong>Map:</strong> {lat}, {lng} (zoom: {zoom})
        {marker && <div>📍 Marker</div>}
      </div>
    </div>
  );
};
