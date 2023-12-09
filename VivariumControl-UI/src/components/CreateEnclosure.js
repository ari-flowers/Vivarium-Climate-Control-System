import { useState } from "react"
import useEnclosuresContext from "../hooks/use-enclosures-context"

function CreateEnclosure() {
  const [name, setName] = useState('')
  const { createEnclosure } = useEnclosuresContext()

  const handleChange = (event) => {
    setName(event.target.value)
  }  

  const handleSubmit = (event) => {
    event.preventDefault()
    createEnclosure({ name })
    setName('')
  }

  return (
    <div>
      <h2>Add an enclosure:</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input className='innput' value={name} onChange={handleChange} />
        <button className='button'>Create!</button>
      </form>
    </div>
  )
}

export default CreateEnclosure