import React, { useEffect, useState } from 'react'
import { Container as MapDiv, NaverMap, Marker, useNavermaps, InfoWindow} from 'react-naver-maps';
import { getPost } from '../api/firebase';

export default function MyMap() {
  // instead of window.naver.maps
  const [ selectedSpot, setSelectedSpot ] = useState([]);
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [infowindow, setInfoWindow] = useState(null);
  const buttonStyle = {
    position: 'fixed',
    margin: '0 5px 5px 0',
    WebkitAppearance: 'button',
    cursor: 'pointer',
    color: '#555',
    padding: '2px 6px',
    background: '#fff',
    border: 'solid 1px #333',
    WebkitBorderRadius: '5px',
    outline: '0 none',
    borderRadius: '5px',
    boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.5)',
  }

  
  useEffect(() => {
    async function postSpot() {
      const data = await getPost();
      const spots = data.map(d => {
        const lat = d.selectedResult.mapy / 10000000;
        const lng = d.selectedResult.mapx / 10000000;
        return { lat, lng };
      });
      setSelectedSpot(spots);
    }
    postSpot();
  }, []);

  function onSuccessGeolocation(position) {
    if (!map || !infowindow) return;

    const location = new navermaps.LatLng(
      position.coords.latitude,
      position.coords.longitude,
    )
    map.setCenter(location)
    map.setZoom(17)
    infowindow.setContent(
      '<div style="padding:20px;">' +
        'geolocation.getCurrentPosition() 위치' +
        '</div>',
    )
    infowindow.open(map, location)
    console.log('Coordinates: ' + location.toString())
  }

  function onErrorGeolocation() {
    if (!map || !infowindow) return;

    const center = map.getCenter()
    infowindow.setContent(
      '<div style="padding:20px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>' +
        'latitude: ' +
        center.lat() +
        '<br />longitude: ' +
        center.lng() +
        '</div>',
    )
    infowindow.open(map, center)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation,
      )
    } else {
      const center = map.getCenter()
      infowindow.setContent(
        '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
      )
      infowindow.open(map, center)
    }
  }

  useEffect(() => {
    if (!map || !infowindow) {
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation,
      )
    } else {
      var center = map.getCenter()
      infowindow.setContent(
        '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
      )
      infowindow.open(map, center)
    }
  }, [map, infowindow]);

  return (
    <>
    <MapDiv id='react-naver-map' className='my-map' style={{position:'relative', width: '100%', height: '100vh',}}>
    <NaverMap
      defaultcenter={new navermaps.LatLng(37.3595704, 127.105399)}
      defaultzoom={15}
      defaultMapTypeId={navermaps.MapTypeId.NORMAL}
      ref={setMap}
      >
      <button
        style={buttonStyle}
        onClick={(e) => {
          e.preventDefault()
          if (map) {
            map.setZoom(8, true)
          }
        }}>
        전체지도 보기
      </button>
      <InfoWindow ref={setInfoWindow} />

      {selectedSpot && selectedSpot.map((spot, index) => ( 
        <Marker key={index} position={new navermaps.LatLng(spot.lat, spot.lng)} />
        ))}
      </NaverMap>
    </MapDiv>
    </>
  )
}
