//import { WfsEndpoint } from '@camptocamp/ogc-client';
import { WFS_EUPRAVA_KN } from '../../constants/http';


export async function searchCadastralMunicipalitiesByName(name) {
  const data = await fetch(WFS_EUPRAVA_KN, {
    method: 'POST',
    body: `<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json" maxFeatures="20"
    xmlns:wfs="http://www.opengis.net/wfs"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:gml="http://www.opengis.net/gml"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs
                        http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
    <wfs:Query typeName="SI.GURS.KN:KATASTRSKE_OBCINE">
        <wfs:PropertyName>KO_ID</wfs:PropertyName>
        <wfs:PropertyName>NAZIV</wfs:PropertyName>
        <ogc:Filter>
        <ogc:PropertyIsLike wildCard="%" singleChar="_" escapeChar="\\" matchCase="false">
            <ogc:PropertyName>NAZIV</ogc:PropertyName>
            <ogc:Literal>%${name}%</ogc:Literal>
        </ogc:PropertyIsLike>
        </ogc:Filter>
    </wfs:Query>
    </wfs:GetFeature>`
  })
  const json = await data.json()
  //console.log(json)
  return json.features
}