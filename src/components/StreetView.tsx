
import React, { useEffect, useRef, useState } from 'react';
import { Map, Volume, Volume2, Eye } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface StreetViewProps {
  address: string;
  lat?: number;
  lng?: number;
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

const StreetView: React.FC<StreetViewProps> = ({ address, lat = 51.5074, lng = -0.1278 }) => {
  const streetViewRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<any>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [streetViewAvailable, setStreetViewAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [scriptAdded, setScriptAdded] = useState(false);

  useEffect(() => {
    // Only add the script once
    if (scriptAdded) return;
    
    // Define the callback function that Google Maps will call when loaded
    window.initGoogleMaps = () => {
      setMapsLoaded(true);
      setIsLoading(false);
    };

    // Load Google Maps API script with async and defer attributes
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGCql6VNQPQgfj8ZJjFB0FTM0YrJhpehQ&libraries=places&callback=initGoogleMaps`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.onerror = () => {
      setIsLoading(false);
      setStreetViewAvailable(false);
      toast({
        title: "Error loading maps",
        description: "Unable to load Google Maps. Please try again later.",
        variant: "destructive"
      });
    };
    
    document.head.appendChild(googleMapsScript);
    setScriptAdded(true);

    return () => {
      // Clean up by removing the callback from the window object
      if (window.initGoogleMaps) {
        // @ts-ignore - We're intentionally deleting this property
        delete window.initGoogleMaps;
      }
      
      // Only remove the script if we added it
      if (scriptAdded) {
        try {
          document.head.removeChild(googleMapsScript);
        } catch (e) {
          // Script may have already been removed, which is fine
        }
      }
    };
  }, [scriptAdded]);

  // Initialize street view when maps are loaded
  useEffect(() => {
    if (mapsLoaded && streetViewRef.current) {
      initializeStreetView();
    }
  }, [mapsLoaded]);

  const initializeStreetView = () => {
    if (!streetViewRef.current || !window.google || !window.google.maps) {
      setStreetViewAvailable(false);
      return;
    }

    try {
      const streetViewService = new window.google.maps.StreetViewService();
      const position = new window.google.maps.LatLng(lat, lng);

      streetViewService.getPanorama(
        { location: position, radius: 50 },
        (data: any, status: any) => {
          if (status === window.google.maps.StreetViewStatus.OK) {
            setStreetViewAvailable(true);
            const panorama = new window.google.maps.StreetViewPanorama(
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
            setIsLoading(false);
          } else {
            console.log('Street View data not found for this location.');
            setStreetViewAvailable(false);
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error('Error initializing Street View:', error);
      setStreetViewAvailable(false);
      setIsLoading(false);
    }
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
          {audioEnabled ? <Volume className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          {audioEnabled ? "Disable audio" : "Enable audio"}
        </button>
      </div>

      {isLoading ? (
        <div className="w-full h-96 border border-govuk-midgrey rounded flex items-center justify-center bg-govuk-lightgrey">
          <div className="text-center p-4">
            <div className="w-12 h-12 border-4 border-govuk-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading Street View...</p>
          </div>
        </div>
      ) : streetViewAvailable ? (
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
