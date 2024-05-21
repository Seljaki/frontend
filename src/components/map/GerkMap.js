import { MapContainer, WMSTileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, useTheme } from '@mui/material';
import { SLO_CRS } from '../../constants/crs';

function GerkMap() {
  const theme = useTheme();

  return (
    <Box key="gerkMap" style={{ minWidth: "100%", height: "100vh"}}>
      <MapContainer key="gerkMap1" style={{ height: "100%", width: "100%", backgroundColor: theme.palette.background.default}} 
        minZoom={10} 
        maxZoom={21} 
        center={[46.413874, 16.063868]} 
        crs={SLO_CRS} zoom={18} 
        scrollWheelZoom={true}
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
        
        {/* <WMSTileLayer transparent={true}
          layers='SI.GURS.KN:PARCELE' //'SI.GURS.ZPDZ%3ADOF025'
          url='https://ipi.eprostor.gov.si/wms-si-gurs-kn/wms?'
          params={{
            transparent: true,
            format: 'image/png'
          }}
        /> */}

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
      </MapContainer>
    </Box>
  )
}

export default GerkMap