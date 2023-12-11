import { useState } from "react"
import EditEnclosure from './EditEnclosure'
import Modal from "./Modal"
import useEnclosuresContext from "../hooks/use-enclosures-context"
import { ReactComponent as PencilIcon } from '../assets/pencil.svg'
import { ReactComponent as TrashIcon } from '../assets/trash.svg'
import { ReactComponent as CaretRightIcon } from '../assets/caret-right.svg'
import { ReactComponent as CaretLeftIcon } from '../assets/caret-left.svg'
import { ReactComponent as RightArrowIcon } from '../assets/arrow-right.svg'
import { ReactComponent as CloseIcon } from '../assets/close-circle.svg'
import '../enclosures.css'

function ShowEnclosure({ enclosure }) {
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
  //delete confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setDeleteError('')
  }

  //edit and delete handlers
  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }
  const confirmDelete = (userInput) => {
    if (userInput === enclosure.name) {
      deleteEnclosure(enclosure.id)
      handleCloseModal()
    } else {
      setDeleteError("What you typed didn't match. Please try again.")
    }
  }
  const handleEdit = () => {
    setShowEdit(!showEdit)
  }
  const handleSubmit = () => {
    setShowEdit(false)
  }
  
  // let content = 
  //   <div className="enclosure-wrapper">
     
  //   </div>

  //edit show/hide logic
  // if (showEdit) {
  //   content = <EditEnclosure onSubmit={handleSubmit} enclosure={enclosure}/>
  // }
  //Delete Modal content
  let modalContent = (
    <div>
      <p>Please type "{enclosure.name}" to confirm and delete: </p>
      {deleteError && <p className='error-message'>{deleteError}</p>}
      <div className="modal-wrapper">
      <CloseIcon className="svg-icon" onClick={handleCloseModal} />
      <input type="text" id='confirmDeleteInput'/>
      <RightArrowIcon className='svg-icon close-button' onClick={() => confirmDelete(document.getElementById('confirmDeleteInput').value)}/>
      </div>
    </div>
  )
  return (
    <div className="show-enclosures">
      <div className="enclosure-wrapper">
        {showEdit ? (
          <EditEnclosure onSubmit={handleSubmit} enclosure={enclosure} />
        ) : (
          <div className="enclosure-name"><strong>{enclosure.name}</strong></div>
        )}
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
      <div className="actions">
        <PencilIcon
          className={`${isGlobalLocked ? 'disabled svg-icon' : 'svg-icon'}`}
          onClick={isGlobalLocked ? null : handleEdit}
        />
        <TrashIcon
          className={`${isGlobalLocked ? 'disabled svg-icon' : 'svg-icon'}`}
          onClick={isGlobalLocked ? null : handleDeleteClick}
        />
      </div>
    </div>
  );
}

export default ShowEnclosure