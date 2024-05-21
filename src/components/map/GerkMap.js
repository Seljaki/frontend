import { MapContainer, WMSTileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "proj4leaflet";
import { Proj} from 'leaflet';
import { Box, useTheme } from '@mui/material';
import MapOverlay from './MapOverlay';

function GerkMap() {
  const theme = useTheme();

  const sloCRS = new Proj.CRS("EPSG:3794","+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9999 +x_0=500000 +y_0=-5000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
  {
    resolutions: [
      262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256,
      128, 64, 28, 16, 8, 4, 2, 1, 0.5, 0.25, 0.1
    ],
  });

  return (
    <>
      
    <Box style={{ minWidth: "100%", height: "100vh"}}>
      <MapContainer style={{ height: "100%", width: "100%", backgroundColor: theme.palette.background.default}} 
        minZoom={10} 
        maxZoom={21} 
        center={[46.413874, 16.063868]} 
        crs={sloCRS} zoom={18} 
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
      <MapOverlay></MapOverlay>
    </Box>
    </>
  )
}

export default GerkMap