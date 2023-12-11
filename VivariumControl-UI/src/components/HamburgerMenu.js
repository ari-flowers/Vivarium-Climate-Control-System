import { useState } from "react"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import useEnclosuresContext from "../hooks/use-enclosures-context";
import "../hamburger.css"
import CreateEnclosure from "./CreateEnclosure";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }


  return (
    <div className="hamburger-menu">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <MenuIcon className="svg-icon" />
      </div>
      {isOpen && (
        <div className="menu-options">
          <CreateEnclosure />
        </div>
      )}
    
    </div>
  )
}

export default HamburgerMenu