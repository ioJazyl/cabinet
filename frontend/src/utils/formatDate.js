export default function formatDate(createdAt) {
  if (!createdAt || createdAt === "/") return "S/O";

  const date = new Date(createdAt);

  // Extract day, month, and year components from the date
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Check if any of the components are NaN
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "pas mentioné";
  }

  // Return the formatted date string
  return `${day}-${month}-${year}`;
}
