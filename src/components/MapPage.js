import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import "../App.css";



const MapPage = ({ parkingStatus, handleParkingClick, setCurrentPage,formData }) => {
  const [selectedParking, setSelectedParking] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const numberOfSpots = 12;
  const categories = [
    { 
      name: "Mobil Kecil", 
      data: parkingStatus.slice(0, numberOfSpots), 
      prefix: "K", 
      y: 50 
    },
    { 
      name: "Mobil Sedang", 
      data: parkingStatus.slice(numberOfSpots, numberOfSpots * 2), 
      prefix: "S", 
      y: 250 
    },
    { 
      name: "Mobil Besar", 
      data: parkingStatus.slice(numberOfSpots * 2, numberOfSpots * 3), 
      prefix: "B", 
      y: 450 
    },
  ];

  const handleClick = (index, category) => {
    const categoryIndex = categories.findIndex((cat) => cat.name === category.name);
    const globalIndex = index + categoryIndex * numberOfSpots;
    const isOccupied = parkingStatus[globalIndex];

    if (isOccupied) {
      setSelectedParking({ category, index, globalIndex });
      setShowPopup(true);
    } else {
      handleParkingClick(globalIndex);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedParking(null);
  };

  const renderParkingSpots = (category) => {
    const screenWidth = window.innerWidth;
    const totalWidth = numberOfSpots * 110;
    const startX = Math.max((screenWidth - totalWidth) / 2, 50);

    return Array.from({ length: numberOfSpots }).map((_, index) => {
      const categoryIndex = categories.findIndex((cat) => cat.name === category.name);
      const globalIndex = index + categoryIndex * numberOfSpots; 
      const isOccupied = parkingStatus[globalIndex];
      const color = isOccupied ? "#D12424" : "#00AB33";
      const x = startX + index * 110;

      return (
        <React.Fragment key={index}>
          <Rect
            x={x}
            y={category.y}
            width={100}
            height={100}
            fill={color}
            cornerRadius={10}
            onClick={() => handleClick(index, category)}
          />
          <Text
            x={x}
            y={category.y + 40}
            width={100}
            height={15}
            text={`${category.prefix}${index + 1}`}
            fontFamily="Poppins, sans-serif"
            fontStyle="bold"
            align="center"
            verticalAlign="middle"
            fill="#FFFFFF"
            fontSize={16}
          />
          <Text
            x={x}
            y={category.y + 70}
            width={100}
            height={20}
            text={isOccupied ? "Terisi" : "Pesan"}
            fontFamily="Poppins, sans-serif"
            align="center"
            verticalAlign="middle"
            fill="#FFFFFF"
            fontSize={14}
            onClick={() => handleClick(index, category)}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="map-page">
      <h1 className="map-title">PETA PARKIRAN</h1>

      <div className="legend">
        <div className="legend-item">
          <span className="legend-color available"></span> Belum Terisi
        </div>
        <div className="legend-item">
          <span className="legend-color occupied"></span> Terisi
        </div>
      </div>

      <Stage width={window.innerWidth} height={window.innerHeight - 100}>
        <Layer>
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <Text
                x={600}
                y={category.y - 30}
                text={`${category.name} (Tersedia: ${Array.from({ length: numberOfSpots }).filter((_, index) => !parkingStatus[index + categoryIndex * numberOfSpots]).length})`}
                fill="#F3F3E0"
                fontSize={15}
                fontStyle="bold"
                fontFamily="Poppins, sans-serif"
              />
              {renderParkingSpots(category)}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>

      {showPopup && selectedParking && (
        <div className="popup-background">
        <div className="popup">
          <h2>Rincian Pemesanan</h2>
          {/* <p>Nama : {formData.name}</p>
          <p>Nomor Kendaraan : {formData.vehicleNumber}</p>
          <p>Durasi : {formData.duration} Jam</p> */}
          <p>Tempat Parkir : {`${selectedParking.category.prefix}${selectedParking.index + 1}`}</p>
          <p>Status: Terisi</p>
          <button onClick={closePopup}>Tutup</button>
        </div>
        </div>
      )}

      {/* <button className="back-button" onClick={() => setCurrentPage("home")}>
        Kembali
      </button> */}
    </div>
  );
};

export default MapPage;
