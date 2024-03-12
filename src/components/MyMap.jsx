import React, { useEffect, useState } from 'react'
import { Container as MapDiv, NaverMap, Marker, useNavermaps, InfoWindow} from 'react-naver-maps';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';

export default function MyMap() {
  // instead of window.naver.maps
  const {isLoading, error, post} = usePostContext();
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
    transform: 'translateY(2.5rem) translateX(1rem)'
  }
  const navigate = useNavigate();

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
        '현재위치' +
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
    <div className='relative -translate-y-10'>
      {isLoading && <p>loading...</p>}
      {error && <p>{error}</p>}
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

      {post && post.map((post,index) => {
        const lat = post.selectedResult?.mapy / 10000000;
        const lng = post.selectedResult?.mapx / 10000000;
        if (lat === undefined || lng === undefined) return null;
        return (
        <Marker
          key={index}
          position={new navermaps.LatLng(lat, lng)}
          onClick={() => navigate(`/community/${post.id}`, {state: {post}})}
          icon={require('../image/paw.png')}
        />)})}
      </NaverMap>
    </MapDiv>
    </div>
  )
}
