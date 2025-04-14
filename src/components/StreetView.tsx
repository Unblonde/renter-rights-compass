
import React, { useEffect, useRef } from 'react';
import { Map, VolumeUp, Volume2, Eye } from 'lucide-react';

interface StreetViewProps {
  address: string;
  lat?: number;
  lng?: number;
}

const StreetView: React.FC<StreetViewProps> = ({ address, lat = 51.5074, lng = -0.1278 }) => {
  const streetViewRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [streetViewAvailable, setStreetViewAvailable] = React.useState(true);

  useEffect(() => {
    // Load Google Maps API script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGCql6VNQPQgfj8ZJjFB0FTM0YrJhpehQ&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);

    googleMapsScript.onload = initializeStreetView;

    return () => {
      // Clean up script if component unmounts
      document.head.removeChild(googleMapsScript);
    };
  }, []);

  const initializeStreetView = () => {
    if (!streetViewRef.current) return;

    const streetViewService = new google.maps.StreetViewService();
    const position = new google.maps.LatLng(lat, lng);

    streetViewService.getPanorama(
      { location: position, radius: 50 },
      (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          setStreetViewAvailable(true);
          const panorama = new google.maps.StreetViewPanorama(
            streetViewRef.current as HTMLElement,
            {
              position: data.location.latLng,
              pov: { heading: 34, pitch: 10 },
              zoom: 1,
              addressControl: true,
              showRoadLabels: true,
              zoomControl: true,
            }
          );
          panoramaRef.current = panorama;
        } else {
          console.log('Street View data not found for this location.');
          setStreetViewAvailable(false);
        }
      }
    );
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
    if (!audioEnabled && streetViewAvailable) {
      const speechText = `Street view of ${address}. Use arrow keys to navigate. Press escape to exit street view.`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg flex items-center">
          <Map className="h-5 w-5 mr-2" />
          Street View
        </h3>
        <button 
          onClick={toggleAudio}
          className="flex items-center gap-2 text-govuk-blue" 
          aria-label={audioEnabled ? "Disable audio description" : "Enable audio description"}
        >
          {audioEnabled ? <VolumeUp className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          {audioEnabled ? "Disable audio" : "Enable audio"}
        </button>
      </div>

      {streetViewAvailable ? (
        <div
          ref={streetViewRef}
          className="w-full h-96 border border-govuk-midgrey rounded"
          aria-label={`Street View of ${address}`}
          role="application"
          tabIndex={0}
        ></div>
      ) : (
        <div className="w-full h-96 border border-govuk-midgrey rounded flex items-center justify-center bg-govuk-lightgrey">
          <div className="text-center p-4">
            <Eye className="h-10 w-10 mx-auto mb-2 text-govuk-darkgrey" />
            <p>Street View is not available for this location</p>
            <p className="text-sm text-govuk-darkgrey mt-2">You can still view the property details and compliance information</p>
          </div>
        </div>
      )}
      
      <div className="mt-2 text-sm text-govuk-darkgrey" aria-live="polite">
        <p>
          <span className="font-bold">Keyboard controls: </span>
          Arrow keys to navigate, + and - to zoom, Escape to exit Street View
        </p>
      </div>
    </div>
  );
};

export default StreetView;
