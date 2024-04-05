import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetVisits(date, currentPage) {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    async function getAllVisits() {
      const response = await axios.get(
        `http://localhost:8000/visits?date=${date}&page=${currentPage}`,
      );
      setVisits(response.data);
    }
    getAllVisits();
  }, [date, currentPage]);
  return { visits };
}
