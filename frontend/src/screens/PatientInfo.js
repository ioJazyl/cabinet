import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function PatientInfo() {
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getPatient() {
      setIsLoading((s) => (s = true));

      const patient = await axios(`http://localhost:8000/patients/${id}`);

      setPatientInfo((p) => (p = patient.data));
      setIsLoading((s) => (s = false));
    }
    getPatient();
  }, [id]);

  // eslint-disable-next-line no-unused-vars
  const { name, firstName, age, diagnostic } = patientInfo;
  console.log(isLoading);
  return <>{!isLoading && <Box>Hello</Box>}</>;
}

export default PatientInfo;
