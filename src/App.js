import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CelebrityAccordion from './components/CelebrityAccordion';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [celebrities, setCelebrities] = useState([]);
  const [search, setSearch] = useState("");
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAccordionId, setPendingAccordionId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/celebrities')
      .then(response => response.json())
      .then(data => setCelebrities(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
  };

  const handleDelete = (id) => {
    const updatedCelebrities = celebrities.filter((celebrity) => celebrity.id !== id);
    setCelebrities(updatedCelebrities);
    saveData(updatedCelebrities);
  };

  const handleSave = (updatedCelebrity) => {
    const updatedCelebrities = celebrities.map((celebrity) => 
      celebrity.id === updatedCelebrity.id ? updatedCelebrity : celebrity
    );
    setCelebrities(updatedCelebrities);
    saveData(updatedCelebrities);
  };

  const handleToggleAccordion = (id) => {
    if (isEditing) {
      setPendingAccordionId(id);
      setModalOpen(true);
    } else {
      setOpenAccordionId(openAccordionId === id ? null : id);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditEnd = () => {
    setIsEditing(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setPendingAccordionId(null);
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    setOpenAccordionId(pendingAccordionId);
    setPendingAccordionId(null);
  };

  const saveData = (data) => {
    fetch('http://localhost:5000/api/celebrities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => console.error('Error saving data:', error));
  };

  const filteredCelebrities = celebrities.filter(celebrity => 
    `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <SearchBar search={search} onSearchChange={handleSearchChange} />
      <div className="p-4">
        {filteredCelebrities.map((celebrity) => (
          <CelebrityAccordion 
            key={celebrity.id}
            celebrity={celebrity}
            isOpen={openAccordionId === celebrity.id}
            onToggle={handleToggleAccordion}
            onDelete={handleDelete}
            onSave={handleSave}
            onEditStart={handleEditStart}
            onEditEnd={handleEditEnd}
          />
        ))}
      </div>
      <Modal 
        isOpen={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      >
        <p>You have unsaved changes. Do you want to save them before proceeding?</p>
      </Modal>
    </div>
  );
}

export default App;