import { useContext } from "react";
import EnclosuresContext from "../context/enclosures";

export default function useEnclosuresContext() {
  return useContext(EnclosuresContext)
}