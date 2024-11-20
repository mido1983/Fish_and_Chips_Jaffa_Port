import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Map() {
  return (
    <MapContainer>
      Map will be displayed here
    </MapContainer>
  );
}

export default Map; 