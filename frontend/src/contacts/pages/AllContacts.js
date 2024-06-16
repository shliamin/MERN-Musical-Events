import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './AllContacts.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const icon = new L.Icon({
  iconUrl: require('../../shared/assets/red-pin.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const AllContacts = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContacts, setLoadedContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseData = await sendRequest('/contacts');
        setLoadedContacts(responseData.contacts);
      } catch (err) {}
    };
    fetchContacts();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedContacts && (
        <div className="all-contacts">
          <MapContainer className="all-contacts__map" center={[51.1657, 10.4515]} zoom={6}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {loadedContacts.map(contact => (
              <Marker key={contact.id} position={[contact.location.lat, contact.location.lng]} icon={icon}>
                <Popup>
                  <h2>{contact.title}</h2>
                  <p>{contact.description}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default AllContacts;
