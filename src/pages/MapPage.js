import GerkMap from "../components/map/GerkMap"
import MapFieldSelection from "../components/map/MapFieldSelection";
import MapSearchOverlay from "../components/map/MapSearchOverlay";

function MapPage() {
  
  return (
    <GerkMap>
      <MapFieldSelection />
      <MapSearchOverlay />
    </GerkMap>
  )
}

export default MapPage