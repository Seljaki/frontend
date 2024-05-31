import { useContext, useEffect, useState } from "react"
import { GeoJSON, Popup } from "react-leaflet"
import { UserContext } from "../../store/userContext"
import { SERVER_URL } from "../../constants/http"

function DbGeoJson({ plots, setPlots = (plots) => {}, onFeaturePressed = (feature, data) => {}}) {
  const userCtx = useContext(UserContext)

  useEffect(() => {
    async function fetchAllPlots() {
      const data = await fetch(SERVER_URL + '/plots/geojson', {
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
  }, [])

  return (
    <>
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