import axios from "axios";
import { useEffect, useState } from "react";

export default function usePatientById(id, page) {
  const [patientInfo, setPatientInfo] = useState({});
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    async function getPatient() {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `http://localhost:8000/patients/${id}?page=${page}`,
        );
        const { patient, visit, pagination } = response.data;

        setPatientInfo(patient);
        setVisits(visit);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Optionally handle errors here, e.g., set error state
      } finally {
        setIsLoading(false);
      }
    }

    getPatient();
  }, [id, page]);

  return { patientInfo, isLoading, visits, pagination };
}
