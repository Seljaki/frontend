import { useState } from "react";
import GerkMap from "../components/map/GerkMap"
import MapFieldSelection from "../components/map/MapFieldSelection";
import MapSearchOverlay from "../components/map/MapSearchOverlay";
import MapEditingToggle from "../components/map/MapEditingToggle";
import MapPlotDetailsOverlay from "../components/map/MapPlotDetailsOverlay";

function MapPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <GerkMap isEditing={isEditing}>
      { isEditing && <MapFieldSelection /> }
      { !isEditing &&  <MapPlotDetailsOverlay />}
      <MapEditingToggle checked={isEditing} setChecked={setIsEditing} />
      <MapSearchOverlay />
    </GerkMap>
  )
}

export default MapPage