import Visit from "../models/visitsModel.js";
async function deleteVisitById(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing ID in request body" });
  }

  try {
    // Find the visit by its ID and delete it
    const visit = await Visit.findByIdAndDelete(id);

    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Visit with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting visit:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateVisit(req, res) {
  try {
    const { id, observation, payment } = req.body;

    // Find the visit by its ID and update its observation and payment fields
    const updatedVisit = await Visit.findByIdAndUpdate(
      id,
      { observation, payment },
      { new: true } // Return the updated document
    );

    if (!updatedVisit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    return res.status(200).json(updatedVisit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const pageSize = 4; // Number of visits per page

async function getVisits(req, res) {
  try {
    // Get the date parameter from the request query
    const dateString = req.query.date;

    // Split the date string into day, month, and year components
    const [day, month, year] = dateString.split("-");

    // Create a JavaScript Date object from the components
    const searchDate = new Date(`${year}-${month}-${day}`);

    // Set the start and end of the search date (midnight to midnight)
    const startDate = new Date(
      searchDate.getFullYear(),
      searchDate.getMonth(),
      searchDate.getDate()
    );
    const endDate = new Date(
      searchDate.getFullYear(),
      searchDate.getMonth(),
      searchDate.getDate() + 1
    );

    // Pagination parameters
    const page = parseInt(req.query.page) || 0; // Current page number
    const skip = page * pageSize; // Number of visits to skip

    // Find visits created on the specified date, sorted in descending order of createdAt
    const visits = await Visit.find({
      createdAt: { $gte: startDate, $lt: endDate }, // Find visits between startDate (inclusive) and endDate (exclusive)
    })
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .skip(skip)
      .limit(pageSize);

    // Find all visits for the given date, without pagination
    const visitsAll = await Visit.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    const totalVisits = await Visit.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    const pageCount = Math.ceil(totalVisits / pageSize);

    return res.json({ visits, pageCount, visitsAll });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMonthlyPayment(req, res) {
  try {
    const dateString = req.query.date;
    const [day, month, year] = dateString.split("-"); // Adjusted order of components
    const searchDate = new Date(`${year}-${month}-${day}`);
    const startDate = new Date(
      searchDate.getFullYear(),
      searchDate.getMonth(),
      1
    );
    const endDate = new Date(
      searchDate.getFullYear(),
      searchDate.getMonth() + 1,
      0
    );
    const visits = await Visit.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Calculate the totalPayment by summing up the payment values from visits
    const totalPayment = visits.reduce(
      (total, visit) => total + parseInt(visit.payment),
      0
    );

    return res.json({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      totalPayment, // Now it correctly sums up the payment values
      visits,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { deleteVisitById, getVisits, updateVisit, getMonthlyPayment };
