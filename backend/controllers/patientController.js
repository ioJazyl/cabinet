import Patient from "../models/patientModel.js";
import Visit from "../models/visitsModel.js";

async function addPatient(req, res) {
  const newPatient = new Patient(req.body);
  // TODO :
  // add visit on first patient created
  try {
    const resPatient = await newPatient.save();
    const { _id: patient, observation, payment, name, firstName } = resPatient;
    const visit = new Visit({ patient, observation, payment, name, firstName });
    const resVisit = await visit.save();

    res.json({ resPatient, resVisit });
    //TODO :
    //grab the ID of the createdPatient and create the visit with the observation and the id.
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}
async function addPatientVisit(req, res) {
  const { patient, observation, payment, name, firstName } = req.body;
  try {
    const visit = new Visit({ patient, observation, payment, name, firstName });
    const resVisit = await visit.save();
    res.json(resVisit);
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}

const PATIENTS_PER_PAGE = 4;
async function getPatients(req, res) {
  const sortCriteria = { createdAt: -1 };

  const page = req.query.page || 0;
  const query = req.query.query || "";

  try {
    const skip = page * PATIENTS_PER_PAGE;

    // Recherche les patients dont le nom ou le prénom contient la chaîne de requête
    const patients = await Patient.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } }, // Recherche insensible à la casse dans le nom
        { firstName: { $regex: new RegExp(query, "i") } }, // Recherche insensible à la casse dans le prénom
      ],
    })
      .sort(sortCriteria)
      .limit(PATIENTS_PER_PAGE)
      .skip(skip);

    // Compte total des patients pour la pagination
    const count = await Patient.countDocuments({
      $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { firstName: { $regex: new RegExp(query, "i") } },
      ],
    });
    const pageCount = Math.ceil(count / PATIENTS_PER_PAGE);

    res.json({ patients, pagination: { page, pageCount } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find({});

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const VISITS_PER_PAGE = 2;
async function getPatientById(req, res) {
  const page = req.query.page || 0;
  const sortCriteria = { createdAt: -1 };

  try {
    const skip = page * VISITS_PER_PAGE;
    const patient = await Patient.findById(req.params.id);
    const visit = await Visit.find({ patient: req.params.id })
      .sort(sortCriteria)
      .limit(VISITS_PER_PAGE)
      .skip(skip);

    // TODO : Fetch the visits also
    res.json({ patient, visit, pagination: { page } });
  } catch (error) {
    console.log(error);
  }
}

async function getVisitsCount(req, res) {
  try {
    const count = await Visit.countDocuments({ patient: req.params.id });
    const pageCount = count / VISITS_PER_PAGE;
    res.json(count);
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
  getVisitsCount,
  getAllPatients,
};
