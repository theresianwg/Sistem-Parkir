import React from 'react';
import "../App.css";

const DetailsPage = ({ formData, selectedParking, setCurrentPage }) => {
  const numberOfSpots = 12;
  const categories = [
    { name: "Mobil Kecil", prefix: "K", range: [0, numberOfSpots] },
    { name: "Mobil Sedang", prefix: "S", range: [numberOfSpots, numberOfSpots * 2] },
    { name: "Mobil Besar", prefix: "B", range: [numberOfSpots * 2, numberOfSpots * 3] },
  ];

  const getCategoryAndPrefix = (index) => {
    for (const category of categories) {
      if (index >= category.range[0] && index < category.range[1]) {
        return { prefix: category.prefix, localIndex: index - category.range[0] + 1 };
      }
    }
    return { prefix: "?", localIndex: index + 1 };
  };

  const { prefix, localIndex } = getCategoryAndPrefix(selectedParking);

  return (
    <div className="details-page">
      <h1 className="details-title">Rincian Pemesanan Parkir</h1>
      <div className="details-content">
        <p><span className="details-label">Nama</span><br />{formData.name}</p>
        <p><span className="details-label">Nomor Kendaraan</span><br />{formData.vehicleNumber}</p>
        <p><span className="details-label">Durasi</span><br />{formData.duration} Jam</p>
        <p><span className="details-label">Tempat Parkir</span><br />{`${prefix}${localIndex}`}</p>
      </div>
      <button className="details-button-back" onClick={() => setCurrentPage('map')}>
        Kembali
      </button>
    </div>
  );
};

export default DetailsPage;
