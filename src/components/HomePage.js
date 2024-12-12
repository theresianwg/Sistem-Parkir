import React from 'react';
import "../App.css";


const HomePage = ({ setCurrentPage }) => (
  <div className="page home">
    <h1>Sistem Manajemen Parkir</h1>
    <button className='home' onClick={() => setCurrentPage('map')}>Pesan Parkir</button>
  </div>
);

export default HomePage;
