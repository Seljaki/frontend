import { useState } from "react"
import GerkMap from "./GerkMap"
import DbGeoJson from "./DbGeoJson"

function SelectPlotFromMap({onPlotSelected = (plot) => {}}) {
  const [ plots, setPlots ] = useState(null)

  return (
    <GerkMap>
      <DbGeoJson plots={plots} setPlots={setPlots} onFeaturePressed={(feature, plot) => {onPlotSelected(plot)}} />
    </GerkMap>
  )
}

export default SelectPlotFromMap