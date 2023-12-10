import { useState } from "react"
import EditEnclosure from './EditEnclosure'
import useEnclosuresContext from "../hooks/use-enclosures-context"
import { ReactComponent as PencilIcon } from '../assets/pencil.svg'
import { ReactComponent as TrashIcon } from '../assets/trash.svg'
import { ReactComponent as CaretRightIcon } from '../assets/caret-right.svg'
import { ReactComponent as CaretLeftIcon } from '../assets/caret-left.svg'
import '../enclosures.css'

function Enclosure({ enclosure }) {
  const { MIN_TEMP, MAX_TEMP, isGlobalLocked, deleteEnclosure, updateTemperature,  } = useEnclosuresContext()
  const [showEdit, setShowEdit] = useState(false) 

  //temperature control handlers
  const handleIncrement = async (id) => {
    if (enclosure.target_temperature < MAX_TEMP) {
      const newTemp = enclosure.target_temperature + 1
      await updateTemperature(id, newTemp)
    }
  }
  const handleDecrement = async (id) => {
    if (enclosure.target_temperature > MIN_TEMP) {
      const newTemp = enclosure.target_temperature - 1
      await updateTemperature(id, newTemp)
    }
  }

  //edit delete handlers
  const handleDelete = () => {
    deleteEnclosure(enclosure.id)
  }
  const handleEdit = () => {
    setShowEdit(!showEdit)
  }
  const handleSubmit = () => {
    setShowEdit(false)
  }

  let content = 
    <div className="enclosure-wrapper">
      <div className="enclosure-name"><strong>{enclosure.name}</strong></div>
      <div className="temp-controls">
        <CaretLeftIcon 
          className={`${enclosure.target_temperature <= MIN_TEMP || isGlobalLocked ? 'disabled svg-icon' : 'svg-icon'}`}
          onClick={() => enclosure.target_temperature > MIN_TEMP && handleDecrement(enclosure.id)} 
        />
        <div className="target-temp">{enclosure.target_temperature}°F</div>
        <CaretRightIcon 
          className={`${enclosure.target_temperature >= MAX_TEMP || isGlobalLocked ? 'disabled svg-icon' : 'svg-icon'}`}
          onClick={() => enclosure.target_temperature < MAX_TEMP && handleIncrement(enclosure.id)} 
        />
      </div>
    </div>

  //edit show/hide logic
  if (showEdit) {
    content = <EditEnclosure onSubmit={handleSubmit} enclosure={enclosure}/>
  }

  return (
    <div className="show-enclosures">
      <div>{content}</div>
      <div className="actions">
        <PencilIcon 
          className={`${isGlobalLocked ? 'disabled svg-icon' : 'svg-icon'}`}
          onClick={isGlobalLocked ? null : handleEdit}
        />
        <TrashIcon 
          className={`${isGlobalLocked ? 'disabled svg-icon' : 'svg-icon'}`} 
          onClick={isGlobalLocked ? null : handleDelete}
        />
      </div> 
    </div>
  )
}

export default Enclosure