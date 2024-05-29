import { useContext, useEffect, useState } from "react"
import { GeoJSON, Popup } from "react-leaflet"
import { UserContext } from "../../store/userContext"
import { SERVER_URL } from "../../constants/http"

function DbGeoJson({ onFeaturePressed = (feature, data) => {}}) {
  const [plots, setPlots] = useState(null)
  const userCtx = useContext(UserContext)

  useEffect(() => {
    async function fetchAllPlots() {
      const data = await fetch(SERVER_URL + '/plots/geojson', {
        headers: {
          "x-auth-token": userCtx.token,
          "Content-Type": "application/json",
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        console.log(json)
        setPlots(json.plots)
      }
    }
    fetchAllPlots()
  }, [])

  return (
    <>
      { /* plots && plots.features.map(p => <GeoJSON key={p.properties.id} data={p} />) */}
      { plots && <GeoJSON interactive onEachFeature={(feature, layer) => {
        layer.on({
          click() {
            onFeaturePressed(feature, feature.properties)
          }
        })
      }} data={plots} />}
    </>
  )
}

export default DbGeoJson