import ShowEnclosure from "./ShowEnclosure";
import useEnclosuresContext from "../hooks/use-enclosures-context";

function EnclosureList() {
  const { enclosures } = useEnclosuresContext()

  const renderedEnclosures = enclosures.map((enclosure) => {
    return (
      <ShowEnclosure key={enclosure.id} enclosure={enclosure} />
    )
  })

  return (
    <div>
      <h1>Enclosure List</h1>
      {renderedEnclosures}
    </div>
  );
}

export default EnclosureList;