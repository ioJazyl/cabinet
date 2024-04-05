import axios from "axios";
import { useEffect, useState } from "react";

export default function useVisitsCount(patientID) {
  const [countPage, setCountPage] = useState(0);

  useEffect(() => {
    async function getVisitsCount() {
      const count = await axios.get(
        `http://localhost:8000/patients/${patientID}/count`,
      );
      setCountPage((c) => (c = count.data / 2));
    }
    getVisitsCount();
  }, [patientID]);
  return { countPage };
}
