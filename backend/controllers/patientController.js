import Patient from "../models/patientModel.js";
import Visit from "../models/visitsModel.js";

async function addPatient(req, res) {
  const newPatient = new Patient(req.body);
  // TODO :
  // add visit on first patient created
  try {
    const resPatient = await newPatient.save();
    const { _id: patient, observation } = resPatient;
    const visit = new Visit({ patient, observation });
    const resVisit = await visit.save();

    res.json({ resPatient, resVisit });
    //TODO :
    //grab the ID of the createdPatient and create the visit with the observation and the id.
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}
async function addPatientVisit(req, res) {
  const { patient, observation } = req.body;
  try {
    const visit = new Visit({ patient, observation });
    const resVisit = await visit.save();
    res.json(resVisit);
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}

async function getPatients(req, res) {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    console.log(error);
  }
}
async function getPatientById(req, res) {
  try {
    const patient = await Patient.findById(req.params.id);
    const visit = await Visit.find({ patient: req.params.id });
    // TODO : Fetch the visits also
    res.json({ patient, visit });
  } catch (error) {
    console.log(error);
  }
}
async function deletePatientById(req, res) {
  const { id } = req.params;

  const patient = await Patient.findById(id);
  if (patient) {
    await Patient.deleteOne({ _id: patient._id });

    res.json({ message: "Patient Removed" });
  } else {
    res.status(404);
    throw new Error("Patient Unfound");
  }
}

async function deletePatientByBody(req, res) {
  const { id } = req.body;

  const patient = await Patient.findById(id);

  if (patient) {
    await Patient.deleteOne({ _id: patient._id });
    await Visit.deleteMany({ patient: patient._id });

    res.json({ message: "Patient Removed" });
  } else {
    res.status(404);
    throw new Error("Patient Unfound");
  }
}

export {
  addPatient,
  getPatients,
  getPatientById,
  deletePatientById,
  deletePatientByBody,
  addPatientVisit,
};
