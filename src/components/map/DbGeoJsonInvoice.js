import { useContext, useEffect, useRef, useState } from "react"
import { GeoJSON } from "react-leaflet"
import { UserContext } from "../../store/userContext"
import { SERVER_URL } from "../../constants/http"
import GerkMap from "./GerkMap"
import L from "leaflet";

function DbGeoJsonInvoice({ invoiceId, onFeaturePressed = (feature, data) => {}}) {
  const [plots, setPlots] = useState(null)
  const userCtx = useContext(UserContext)
  const mapRef = useRef();

  useEffect(() => {
    async function fetchAllPlots() {
      const data = await fetch(SERVER_URL + `/invoices/${invoiceId}/geojson`, {
        headers: {
          "x-auth-token": userCtx.token,
        },
      });
      if (data.status < 300) {
        const json = await data.json();
        //console.log(json)
        setPlots(json.plots)
      }
    }
    fetchAllPlots()
  }, [invoiceId])

  useEffect(() => {
    if (plots && mapRef.current) {
      const geojsonLayer = L.geoJSON(plots);
      const bounds = geojsonLayer.getBounds();
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [plots])

  return (
    <GerkMap mapRef={mapRef}>
      { plots && <GeoJSON interactive onEachFeature={(feature, layer) => {
        layer.on({
          click() {
            onFeaturePressed(feature, feature.properties)
          }
        })
      }} data={plots} />}
    </GerkMap>
  )
}

export default DbGeoJsonInvoice