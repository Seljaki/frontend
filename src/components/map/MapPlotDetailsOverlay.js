import { useState } from "react"
import DbGeoJson from "./DbGeoJson"
import MapOverlay from "./MapOverlay"

function MapPlotDetailsOverlay() {
  const [selectedPlot, setSelectedPlot] = useState(null)

  return (
    <>
      <DbGeoJson onFeaturePressed={(feature, plot) => {setSelectedPlot(plot)}} />
      { selectedPlot &&
        <MapOverlay style={{ top: 10, right: 10, padding: 1 }}>

        </MapOverlay>
      }
    </>
  )
}

export default MapPlotDetailsOverlay