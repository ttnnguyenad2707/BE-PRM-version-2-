import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const Map = (props) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Hàm này sẽ được gọi sau khi thành phần được hiển thị lần đầu tiên
    // Sử dụng Google Geocoding API để lấy tọa độ từ địa chỉ
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: props.address }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat: lat(), lng: lng() });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }, [props.address]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'YOUR_API_KEY' // Thay YOUR_API_KEY bằng khóa API của bạn
        }}
        defaultCenter={coordinates}
        defaultZoom={14}
      >
        <Marker lat={coordinates.lat} lng={coordinates.lng} />
      </GoogleMapReact>
    </div>
  );
};

const Marker = () => <div className="marker">Marker</div>;

export default Map;