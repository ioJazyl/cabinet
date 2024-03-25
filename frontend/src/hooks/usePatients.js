import { useState, useEffect } from "react";
import axios from "axios";
export default function usePatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getPatients() {
      const patients = await axios("http://localhost:8000/patients");
      setPatients(patients.data);
    }
    getPatients();
  }, []);

  return { patients };
}
