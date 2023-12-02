import '../styling/parcelSize.css';
import React from 'react';
import parcelSizeImage from '../images/ParcelSize.png'; 

const ParcelSizeImage: React.FC = () => {
  return (
    <div>
      <img 
        src={parcelSizeImage} 
        alt="Parcel Size" 
        className="img-fluid" />
    </div>
  );
};

export default ParcelSizeImage;
