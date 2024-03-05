import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

export default function RecommandSpot({selectedResult}) {
    const navermaps = useNavermaps();
    if(!selectedResult) return null;
    const lat = selectedResult.mapy / 10000000
    const lng = selectedResult.mapx / 10000000
    return (
        <MapDiv
        style={{
            width: '100%',
            height: '600px',
        }}
        >
        <NaverMap
            defaultCenter={new navermaps.LatLng(lat, lng)}
            defaultZoom={15}
            >
            <Marker position={new navermaps.LatLng(lat, lng)} />
            </NaverMap>
        </MapDiv>
        )
        }
