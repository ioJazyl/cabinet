import Visit from "../models/visitsModel.js";

export default async function deleteVisitById(req, res) {
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

    return res
      .status(200)
      .json({
        success: true,
        message: `Visit with ID ${id} deleted successfully`,
      });
  } catch (error) {
    console.error("Error deleting visit:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
