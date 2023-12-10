import useEnclosuresContext from "../hooks/use-enclosures-context"
import { ReactComponent as LockedIcon } from "../assets/lock-solid.svg"
import { ReactComponent as UnlockedIcon } from "../assets/lock-open-solid.svg"

function Lock() {
  const { isGlobalLocked, toggleGlobalLock } = useEnclosuresContext()

  return (
    <div className="lock-icon">
      {isGlobalLocked ? (
        <LockedIcon onClick={toggleGlobalLock} />
      ) : (
        <UnlockedIcon onClick={toggleGlobalLock} />
      )}
    </div>
  )
}

export default Lock;