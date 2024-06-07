import { MapContainer, WMSTileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, useTheme } from '@mui/material';
import { SLO_CRS } from '../../constants/crs';
import { LeafletRightClickProvider } from 'react-leaflet-rightclick';

function GerkMap({children, isEditing, mapRef, style = {}}) {
  const theme = useTheme();

  return (
    <Box key="gerkMap" style={{ display: "flex", flex: 1, height: "100vh", ...style }}>
    <LeafletRightClickProvider>
      <MapContainer doubleClickZoom={false} ref={mapRef} key="gerkMap1" style={{ height: "100%", width: "100%", backgroundColor: theme.palette.background.default}} 
        minZoom={10} 
        maxZoom={21} 
        center={[46.413874, 16.063868]} 
        crs={SLO_CRS} zoom={18} 
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <WMSTileLayer transparent={true}
          layers='OI.OrthoimageCoverage' //'SI.GURS.ZPDZ%3ADOF025'
          url='https://storitve.eprostor.gov.si/ows-ins-wms/oi/ows/ows?'
          params={{
            //transparent: true,
            format: 'image/png',
          }}
          maxZoom={21}
        />  
        <WMSTileLayer transparent={true}
          layers='SI.GURS.RPE:OBCINE' //'SI.GURS.ZPDZ%3ADOF025'
          url='https://ipi.eprostor.gov.si/wms-si-gurs-rpe/wms?'
          params={{
            transparent: true,
            format: 'image/png'
          }}
          maxZoom={21}
        />
        
        { isEditing && <WMSTileLayer transparent={true}
          layers='SI.GURS.KN:PARCELE' //'SI.GURS.ZPDZ%3ADOF025'
          url='https://ipi.eprostor.gov.si/wms-si-gurs-kn/wms?'
          params={{
            transparent: true,
            format: 'image/png'
          }}
          maxZoom={21}
        /> }

        <WMSTileLayer transparent={true}
          layers='nspire_common:DEFAULT' //'SI.GURS.ZPDZ%3ADOF025'
          url='https://storitve.eprostor.gov.si/ows-ins-wms/gn/ows?'
          params={{
            transparent: true,
            format: 'image/png'
          }}
          maxZoom={21}
        />

        <WMSTileLayer transparent={true}
          layers='GERK' //'SI.GURS.ZPDZ%3ADOF025'
          url='https://rkg.gov.si/GERK/wms?'
          params={{
            transparent: true,
            format: 'image/png'
          }}
          maxZoom={21}
        />
        {children}
      </MapContainer>
    </LeafletRightClickProvider>
  </Box>
  )
}

export default GerkMap