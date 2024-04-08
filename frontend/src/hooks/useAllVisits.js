import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetVisits(date, currentPage) {
  const [visits, setVisits] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (!date) return;

      try {
        const visitsResponse = await axios.get(
          `http://localhost:8000/visits?date=${date}&page=${currentPage}`,
        );
        setVisits(visitsResponse.data);

        const monthlyPaymentResponse = await axios.get(
          `http://localhost:8000/visits/monthly?date=${date}`,
        );
        setMonthlyPayment(monthlyPaymentResponse.data.totalPayment);
      } catch (error) {
        console.error(error);
        // Handle errors here, e.g., show a notification or fallback behavior
      }
    }

    fetchData();
  }, [date, currentPage]);

  return { visits, monthlyPayment };
}
