import { createContext, useState, useEffect } from "react";
import axios from 'axios'

const EnclosuresContext = createContext()

function Provider({ children }) {
  const [enclosures, setEnclosures] = useState([]);

  const API_URL = "http://localhost:3000/api/v1/enclosures";

  const fetchEnclosures = () => {
    return axios.get(API_URL).then((response) => response.data)
  }
  useEffect(() => {
    let mounted = true;
    fetchEnclosures().then((items) => {
      if (mounted) {
        setEnclosures(items);
      }
    })
    return () => (mounted = false);
  }, []);
  const createEnclosure = async (enclosureData) => {
    try {
      const response = await axios.post(API_URL, { enclosure: enclosureData })
      setEnclosures(enclosures => [...enclosures, response.data]);
      console.log(response.data)
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

  const sharedFunctions = {
    enclosures, 
    createEnclosure,
    deleteEnclosure,
    editEnclosure,
    fetchEnclosures
  }

  return <EnclosuresContext.Provider value={sharedFunctions}>
      {children}
  </EnclosuresContext.Provider>
}

export { Provider }
export default EnclosuresContext