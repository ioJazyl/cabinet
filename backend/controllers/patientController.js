import Patient from "../models/patientModel.js";

async function addPatient(req, res) {
  const patient = new Patient(req.body);
  try {
    const response = await patient.save();
    res.json(response);
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
    const patient = await Patient.findById(req.params.id).populate("name");
    res.json(patient);
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
    res.json({ message: "Patient Removed" });
  } else {
    res.status(404);
    throw new Error("Patient Unfound");
  }

  // const patient = await Patient.findById(id);
  // if (patient) {
  //   await Patient.deleteOne({ _id: patient._id });
  //   res.json({ message: "Patient Removed" });
  // } else {
  //   res.status(404);
  //   throw new Error("Product Unfound");
  // }
}

export {
  addPatient,
  getPatients,
  getPatientById,
  deletePatientById,
  deletePatientByBody,
};
