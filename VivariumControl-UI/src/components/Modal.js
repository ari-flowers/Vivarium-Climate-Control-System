import '../modal.css'
import { ReactComponent as RightArrowIcon } from '../assets/arrow-right.svg'

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        {children}
      </div>
      <div className='modal-backdrop' onClick={onClose}/>
    </div>
  )
}

export default Modal;