import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { defaultTheme, noCityTheme } from '../../UI/MapTheme/Theme';
import MapContent from './MapContent';
import styles from './Map.module.scss';

const containerStyle = {
  width: '100%',
  height: '80%',
  borderRadius: '50px',
  boxShadow: 'black 0px 3px 8px',
};

export default function Map({
  latitude,
  longitude,
  dir,
  speed,
  regNumber,
  status,
}) {
  const [showContent, setShowContent] = useState(false);
  const [themeMode, setThemeMode] = useState(false);

  const defaultOptions = {
    zoomControl: true,
    streetViewControl: false,
    scaleControl: false,
    scrollweel: false,
    rotateControl: false,
    fullscreenControl: false,
    keyboardsShortcuts: false,
    disableDoubleClickZoom: true,
    styles: themeMode ? noCityTheme : defaultTheme,
  };

  const position = {
    lat: latitude[0] || 52.237049,
    lng: longitude[0] || 21.017532,
  };
  const rotation = dir[0] || 0;

  return (
    <>
      <GoogleMap
        options={defaultOptions}
        mapContainerStyle={containerStyle}
        center={position}
        zoom={7}
        onMouseDown={() => setShowContent(false)}
      >
        <button
          aria-label="change map theme"
          onClick={() => setThemeMode(!themeMode)}
          className={styles.themeBtn}
        >
          {themeMode ? 'City / on' : 'City / off'}
        </button>
        <Marker 
          position={position}
          onMouseDown={() => setShowContent(true)}
          icon={{
            path: 'M42 32v-4L26 18V7c0-1.66-1.34-3-3-3s-3 1.34-3 3v11L4 28v4l16-5v11l-4 3v3l7-2 7 2v-3l-4-3V27l16 5z',
            rotation: rotation,
            scale: 0.7,
            anchor: new window.google.maps.Point(25, 25),
            strokeColor: 'blue',
            strokeWeight: 6,
          }}
        ></Marker>
        {showContent && (
          <MapContent
            lat={latitude}
            lng={longitude}
            status={status}
            speed={speed}
            dir={dir}
            regNumber={regNumber}
          />
        )}
      </GoogleMap>
    </>
  );
}
