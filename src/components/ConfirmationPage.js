import React from 'react';
import "../App.css";


const ConfirmationPage = ({ setCurrentPage }) => (
  <div className="confirmation-container">
    <div className="confirmation-box">
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 className="confirmation-title">Pemesanan Berhasil Dilakukan</h1>
      <button className="details-button" onClick={() => setCurrentPage('details')}>
        Rincian Pemesanan
      </button>
    </div>
  </div>
);

export default ConfirmationPage;
