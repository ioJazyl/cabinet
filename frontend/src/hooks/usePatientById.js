import axios from "axios";
import { useEffect, useState } from "react";

export default function usePatientById(id) {
  const [patientInfo, setPatientInfo] = useState({});
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getPatient() {
      setIsLoading((s) => (s = true));

      const patient = await axios(`http://localhost:8000/patients/${id}`);
      setPatientInfo((p) => (p = patient.data.patient));
      setVisits((p) => (p = patient.data.visit));

      setIsLoading((s) => (s = false));
    }
    getPatient();
  }, [id]);

  return { patientInfo, isLoading, visits };
}
