import React from 'react';
import { MapProps } from './Map';

interface MapPropertiesPanelProps {
  value: MapProps;
  onChange: (value: MapProps) => void;
}

export const MapPropertiesPanel: React.FC<MapPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Latitude: <input type="number" value={value.lat} onChange={e => onChange({ ...value, lat: Number(e.target.value) })} /></label>
      <label>Longitude: <input type="number" value={value.lng} onChange={e => onChange({ ...value, lng: Number(e.target.value) })} /></label>
      <label>Zoom: <input type="number" value={value.zoom || 12} min={1} max={20} onChange={e => onChange({ ...value, zoom: Number(e.target.value) })} /></label>
      <label>Width: <input type="number" value={value.width || 400} min={100} max={1200} onChange={e => onChange({ ...value, width: Number(e.target.value) })} /></label>
      <label>Height: <input type="number" value={value.height || 300} min={100} max={800} onChange={e => onChange({ ...value, height: Number(e.target.value) })} /></label>
      <label>Show Marker: <input type="checkbox" checked={value.marker} onChange={e => onChange({ ...value, marker: e.target.checked })} /></label>
    </div>
  );
};
