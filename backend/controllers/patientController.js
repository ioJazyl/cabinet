import Patient from "../models/patientModel.js";
import Visit from "../models/visitsModel.js";

async function addPatient(req, res) {
  const newPatient = new Patient(req.body);
  // TODO :
  // add visit on first patient created
  try {
    const resPatient = await newPatient.save();
    const { _id: patient, observation, payment } = resPatient;
    const visit = new Visit({ patient, observation, payment });
    const resVisit = await visit.save();

    res.json({ resPatient, resVisit });
    //TODO :
    //grab the ID of the createdPatient and create the visit with the observation and the id.
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}
async function addPatientVisit(req, res) {
  const { patient, observation, payment } = req.body;
  try {
    const visit = new Visit({ patient, observation, payment });
    const resVisit = await visit.save();
    res.json(resVisit);
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}
const PATIENTS_PER_PAGE = 4;
async function getPatients(req, res) {
  const page = req.query.page || 0;
  try {
    const skip = page * PATIENTS_PER_PAGE;
    const count = await Patient.countDocuments({});

    const patients = await Patient.find({}).limit(PATIENTS_PER_PAGE).skip(skip);
    const pageCount = count / PATIENTS_PER_PAGE;

    res.json({ patients, pagination: { page, pageCount } });
  } catch (error) {
    console.log(error);
  }
}
const VISITS_PER_PAGE = 2;
async function getPatientById(req, res) {
  const page = req.query.page || 0;

  try {
    const skip = page * VISITS_PER_PAGE;
    const count = await Visit.countDocuments({});
    const patient = await Patient.findById(req.params.id);
    const visit = await Visit.find({ patient: req.params.id })
      .limit(VISITS_PER_PAGE)
      .skip(skip);
    const pageCount = count / VISITS_PER_PAGE;

    // TODO : Fetch the visits also
    res.json({ patient, visit, pagination: { page, pageCount } });
  } catch (error) {
    console.log(error);
  }
}

async function getPatientByFullName(req, res) {
  try {
    const query = req.body.query;
    const patients = await Patient.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search for name
        { firstName: { $regex: query, $options: "i" } }, // Case-insensitive regex search for firstName
      ],
    });
    res.json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
  getPatientByFullName,
};
