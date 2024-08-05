import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from './Modal';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const CelebrityAccordion = ({ celebrity, isOpen, onToggle, onDelete, onSave, onEditStart, onEditEnd }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...celebrity });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [countryError, setCountryError] = useState('');

  useEffect(() => {
    setIsAdult(calculateAge(celebrity.dob) >= 18);
  }, [celebrity.dob]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    let error = '';

    if (name === 'country') {
      if (/\d/.test(value)) {
        error = 'Numbers are not allowed in the country name';
      } else if (value.trim() === '') {
        error = 'Country name cannot be empty';
      }
    } else if (value.trim() === '') {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`;
    }

    setCountryError(error);
    setEditData({ ...editData, [name]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!countryError) {
      setIsEditing(false);
      onEditEnd();
      onSave(editData);
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...celebrity });
    setIsEditing(false);
    onEditEnd();
    setHasChanges(false);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(celebrity.id);
    setIsModalOpen(false);
  };

  return (
    <div className="border  rounded-xl shadow-lg mb-4 mx-auto w-2/5">
      <div className="p-4 cursor-pointer" onClick={() => !isEditing && onToggle(celebrity.id)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={celebrity.picture}
              alt={`${celebrity.first} ${celebrity.last}`}
              className="w-12 h-12 rounded-full mr-4"
              style={{ width: '50px', height: '50px' }}
            />
            <div>
              {isEditing ? (
                <div className="flex pr-9">
                  <input 
                    type="text" 
                    name="first" 
                    value={editData.first} 
                    onChange={handleEditChange}
                    className="border border-gray-300 py-1 px-2 mr-4 w-1/4 rounded-lg"
                  />
                  <input 
                    type="text" 
                    name="last" 
                    value={editData.last} 
                    onChange={handleEditChange}
                    className="border border-gray-300 px-2 py-1 w-1/4 rounded-lg"
                  />
                </div>
              ) : (
                <div className="font-semibold">{celebrity.first} {celebrity.last}</div>
              )}
            </div>
          </div>
          <div className="text-2xl">
            {isOpen ? '-' : '+'}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="flex justify-between p-5">
            <div className="text-left">
              <p className=' text-gray-500'>Age</p>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={editData.dob}
                  onChange={handleEditChange}
                  className="border border-gray-300 p-1 mr-2 rounded-lg"
                />
              ) : (
                <p>{calculateAge(celebrity.dob)}</p>
              )}
            </div>
            <div className="text-left">
              <h5 className=' text-gray-500'>Gender</h5>
              {isEditing ? (
                <select 
                  name="gender" 
                  value={editData.gender} 
                  onChange={handleEditChange}
                  className="border border-gray-300 mr-2 py-2 px-1 rounded-lg"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Rather_not_say">Rather not say</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{celebrity.gender}</p>
              )}
            </div>
            <div className="text-left">
              <h5 className=' text-gray-500'>Country</h5>
              {isEditing ? (
                <div>
                  <input 
                    type="text" 
                    name="country" 
                    value={editData.country} 
                    onChange={handleEditChange}
                    className="border border-gray-300 px-1 w-full ml-2 py-2 rounded-lg"
                  />
                  {countryError && <p className="text-red-500">{countryError}</p>}
                </div>
              ) : (
                <p>{celebrity.country}</p>
              )}
            </div>
          </div>
          <div className="text-left p-5">
            <h5 className=' text-gray-500'>Description</h5>
            {isEditing ? (
              <textarea 
                name="description" 
                value={editData.description} 
                onChange={handleEditChange}
                className="border border-gray-300 p-1 w-full"
              />
            ) : (
              <p>{celebrity.description}</p>
            )}
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave} 
                  disabled={!hasChanges || countryError}
                  className={` text-green-500 hover:text-green-700 px-1 ${(!hasChanges || countryError) && 'opacity-50 cursor-not-allowed'}`}
                >
                    <FaCircleCheck className="inline-block mr-2 size-5"/>
                </button>
                <button 
                  onClick={handleCancel} 
                  className=" text-gray-500 hover:text-gray-800 px-1 rounded"
                >
                    <FaCircleXmark className="inline-block mr-2 size-5"/>
                </button>
              </>
            ) : (
              <>
                {isAdult && (
                  <button 
                    onClick={() => { setIsEditing(true); onEditStart(); }} 
                    className=" text-blue-500 hover:text-blue-800 px-2"
                  >
                    <FaEdit className="inline-block" />
                  </button>
                )}
                <button 
                  onClick={handleDelete} 
                  className="text-red-500 px-2 hover:text-red-700"
                >
                  <FaTrash className="inline-block mr-2" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      >
        <p>Are you sure you want to delete this record?</p>
      </Modal>
    </div>
  );
};

export default CelebrityAccordion;