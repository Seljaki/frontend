import "proj4leaflet";
import { Proj } from 'leaflet';
import proj4 from "proj4";

export const SLO_CRS = new Proj.CRS("EPSG:3794","+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9999 +x_0=500000 +y_0=-5000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
{
  resolutions: [
    262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256,
    128, 64, 28, 16, 8, 4, 2, 1, 0.5, 0.25, 0.1
  ],
});

export function transformCordsFromEPSG4326To3794(longitude, latitude) {
  return proj4("EPSG:4326", "EPSG:3794", [longitude, latitude])
}