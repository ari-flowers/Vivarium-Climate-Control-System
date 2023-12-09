import { useState } from "react";
import useEnclosuresContext from "../hooks/use-enclosures-context";

function EditEnclosure({ enclosure, onSubmit }) {
  const { editEnclosure } = useEnclosuresContext()
  const [enclosureData, setEnclosureData] = useState({ name: enclosure.name })

  const handleChange = (event) => {
    setEnclosureData({ ...enclosureData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
    editEnclosure(enclosure.id, enclosureData)
  }

  return (
    <form onSubmit={handleSubmit} className="edit-enclosure">
      <input
        type="text"
        name="name"
        value={enclosureData.name}
        onChange={handleChange}
      /> 
      <button type="submit">Save</button>
    </form>
  )
}

export default EditEnclosure