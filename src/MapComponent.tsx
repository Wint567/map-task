import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface User {
  id: number;
  name: string;
  lat: number;
  lon: number;
  interests: string[];
}

const MapComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetch('./users.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const filteredUsers = useMemo(() => {
    if (!filter) return users;
    return users.filter(user =>
      user.interests.some(interest => interest.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [users, filter]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <input
        type="text"
        placeholder="Filter by interest (e.g., music)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '90%', maxWidth: '500px', padding: '10px', margin: '10px auto', fontSize: '16px', display: 'block', boxSizing: 'border-box' }}
      />
      <MapContainer center={[0, 0]} zoom={2} style={{ flex: 1 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {filteredUsers.map(user => (
            <Marker key={user.id} position={[user.lat, user.lon]}>
              <Popup>
                <b>{user.name}</b><br />
                Interests: {user.interests.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapComponent;