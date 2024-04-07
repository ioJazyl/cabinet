export default function formatDate(createdAt) {
  if (createdAt === "/") return "S/O";

  const date = new Date(createdAt);
  const day = parseInt(date.getDate().toString(), 10)
    .toString()
    .padStart(2, "0");
  const month = parseInt((date.getMonth() + 1).toString(), 10)
    .toString()
    .padStart(2, "0");
  const year = parseInt(date.getFullYear().toString(), 10).toString();

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "pas mentioné";
  }

  return `${day}-${month}-${year}`;
}
