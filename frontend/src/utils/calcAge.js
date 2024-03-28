// export default function calcAge(age) {
//   const date = new Date(age);
// }

export default function calcAge(age) {
  // Calculate age
  const today = new Date();
  const birthDateObj = new Date(age);
  const ageDiff = today - birthDateObj;
  const ageDate = new Date(ageDiff);
  const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return calculatedAge;
}
