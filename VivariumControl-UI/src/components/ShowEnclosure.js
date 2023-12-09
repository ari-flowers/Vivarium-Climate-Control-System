import { useState } from "react"
import EditEnclosure from './EditEnclosure'
import useEnclosuresContext from "../hooks/use-enclosures-context"

function Enclosure({ enclosure }) {
  const { deleteEnclosure } = useEnclosuresContext()
  const [showEdit, setShowEdit] = useState(false) 

  const handleDelete = () => {
    deleteEnclosure(enclosure.id)
  }
  const handleEdit = () => {
    setShowEdit(!showEdit)
  }
  const handleSubmit = () => {
    setShowEdit(false)
  }
  let content = <h3>{enclosure.name}</h3>
  if (showEdit) {
    content = <EditEnclosure onSubmit={handleSubmit} enclosure={enclosure}/>
  }

  return (
    <div className="show-enclosures">
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div> 
    </div>
  )
}

export default Enclosure