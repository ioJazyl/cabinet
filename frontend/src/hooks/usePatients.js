import { useState, useEffect } from "react";
import axios from "axios";

export default function usePatients() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.post("http://localhost:8000/patients/", {
          query,
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [query]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  return { patients, handleQueryChange };
}
