import React, { useEffect, useState } from 'react'
import { Container as MapDiv, NaverMap, Marker, useNavermaps, InfoWindow} from 'react-naver-maps'

export default function MyMap() {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [infowindow, setInfoWindow] = useState(null);

  function onSuccessGeolocation(position) {
    if (!map || !infowindow) return;

    const location = new navermaps.LatLng(
      position.coords.latitude,
      position.coords.longitude,
    )
    map.setCenter(location)
    map.setZoom(10)
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
      />
      <InfoWindow ref={setInfoWindow} />
      <Marker
        defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
      />
    </MapDiv>
    </>
  )
}
