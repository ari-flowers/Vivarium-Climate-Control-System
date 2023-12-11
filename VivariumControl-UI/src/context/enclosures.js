import { createContext, useState, useEffect } from "react";
import axios from 'axios'

const EnclosuresContext = createContext()

function Provider({ children }) {
  //State variables
  const [enclosures, setEnclosures] = useState([]);
  const [isGlobalLocked, setIsGlobalLocked] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  //Global variables
  const API_URL = "http://localhost:3000/api/v1/enclosures";
  const MIN_TEMP = 70;
  const MAX_TEMP = 105;

  // Fetch API endpoint for index
  const fetchEnclosures = () => {
    return axios.get(API_URL).then((response) => response.data)
  }
  // Initialize page with all enclosures
  useEffect(() => {
    let mounted = true;
    fetchEnclosures().then((enclosures) => {
      if (mounted) {
        setEnclosures(enclosures);
      }
    })
    return () => (mounted = false);
  }, []);
  //Lock and unlock functionality 
  const toggleGlobalLock = () => {
    setIsGlobalLocked(!isGlobalLocked)
  }
  // CRUD operations for enclosures
  const createEnclosure = async (enclosureData) => {
    try {
      const response = await axios.post(API_URL, { enclosure: enclosureData })
      setEnclosures(enclosures => [...enclosures, response.data]);
      console.log(response.data)
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating new enclosure: ", error)
    }
  }
  const deleteEnclosure = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setEnclosures(enclosures => enclosures.filter(enclosure => enclosure.id !== id))
    } catch (error) {
      console.error("Error deleting enclosure: ", error)
    }
  }
  const editEnclosure = async (id, newName) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { enclosure: newName })
      setEnclosures(enclosures => 
        enclosures.map(enclosure =>
          enclosure.id === id ? { ...enclosure, ...response.data } : enclosure
        )
      );
    } catch (error) {
      console.error("Error updating enclosure: ", error)
    }
  };

  // Temperature control
  const updateTemperature = async (id, newTemp) => {
    if (newTemp >= MIN_TEMP && newTemp <= MAX_TEMP) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, { target_temperature: newTemp })
        console.log(response.data)
        setEnclosures(enclosures => {
          return enclosures.map(enclosure =>
            enclosure.id === id ? { ...enclosure, target_temperature: newTemp } : enclosure
          )
        })
      } catch (error) {
        console.error("Error updating temperature: ", error)
      }
    }
  }

  const sharedFunctions = {
    enclosures, 
    MIN_TEMP,
    MAX_TEMP,
    isGlobalLocked,
    toggleGlobalLock,
    isCreateModalOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
    createEnclosure,
    deleteEnclosure,
    editEnclosure,
    updateTemperature,
    fetchEnclosures
  }

  return <EnclosuresContext.Provider value={sharedFunctions}>
      {children}
  </EnclosuresContext.Provider>
}

export { Provider }
export default EnclosuresContext