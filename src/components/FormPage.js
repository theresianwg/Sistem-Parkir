import React from "react";
import "../App.css";

const FormPage = ({ formData, setFormData, handleFormSubmit, selectedParking }) => {
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
    <div className="page form">
      <h1>Formulir Pemesanan</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
        <label>
          Nama:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Nomor Kendaraan:
          <input
            type="text"
            value={formData.vehicleNumber}
            onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
            required
          />
        </label>
        <label>
          Waktu Mulai:
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </label>
        <label>
          Durasi (jam):
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </label>
        <p className="place-info">Tempat Parkir : {`${prefix}${localIndex}`}</p>
        <button className="form" type="submit">
          Pesan Parkir
        </button>
      </form>
    </div>
  );
};

export default FormPage;
