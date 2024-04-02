import axios from "axios";
import { useEffect, useState } from "react";

export default function usePatientById(id) {
  const [patientInfo, setPatientInfo] = useState({});
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getPatient() {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `http://localhost:8000/patients/${id}`,
        );
        const { patient, visit } = response.data;

        setPatientInfo(patient);
        setVisits(visit);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Optionally handle errors here, e.g., set error state
      } finally {
        setIsLoading(false);
      }
    }

    getPatient();
  }, [id]);

  return { patientInfo, isLoading, visits };
}
