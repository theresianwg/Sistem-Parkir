import React, { useState } from 'react';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import FormPage from './components/FormPage';
import ConfirmationPage from './components/ConfirmationPage';
import DetailsPage from './components/DetailsPage';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedParking, setSelectedParking] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    vehicleNumber: '',
    startTime: '',
    duration: '',
  });
  const [parkingStatus, setParkingStatus] = useState(
    Array(12).fill(false)
  );

  const handleParkingClick = (index) => {
    if (!parkingStatus[index]) {
      setSelectedParking(index);
      setCurrentPage('form');
    }
  };

  const handleFormSubmit = () => {
    const updatedParking = [...parkingStatus];
    updatedParking[selectedParking] = true;
    setParkingStatus(updatedParking);
    setCurrentPage('confirmation');
  };

  return (
    <div className="App">
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'map' && <MapPage parkingStatus={parkingStatus} handleParkingClick={handleParkingClick} setCurrentPage={setCurrentPage} />}
      {currentPage === 'form' && <FormPage formData={formData} setFormData={setFormData} handleFormSubmit={handleFormSubmit} selectedParking={selectedParking} />}
      {currentPage === 'confirmation' && <ConfirmationPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'details' && <DetailsPage formData={formData} selectedParking={selectedParking} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;
