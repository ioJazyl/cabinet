import { useState, useEffect } from "react";
import axios from "axios";

export default function usePatients(page) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/patients?page=${page}`,
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [page]);

  return { patients };
}
