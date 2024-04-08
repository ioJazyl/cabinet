import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

export default function usePatients(page, query) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/patients?page=${page}&query=${query}`,
        );
        setPatients(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const debouncedFetchPatients = debounce(fetchPatients, 500); // Debounce with a delay of 300 milliseconds

    debouncedFetchPatients(); // Call the debounced function

    return () => {
      debouncedFetchPatients.cancel(); // Cancel any pending debounce on component unmount
    };
  }, [page, query]);

  return { patients, isLoading };
}
