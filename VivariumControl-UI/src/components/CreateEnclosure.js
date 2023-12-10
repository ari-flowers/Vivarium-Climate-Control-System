import { useState } from "react"
import { ReactComponent as ArrowRightIcon } from '../assets/arrow-right.svg'
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
      <div className='create-form-wrapper'>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input className='innput' value={name} onChange={handleChange} />
        </form>
        <ArrowRightIcon className='right-arrow-icon svg-icon' onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default CreateEnclosure