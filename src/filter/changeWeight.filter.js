export default function weightFilter(change) {
  if (change > 0) {
    return change = `+${change} kg`
  } 
  else if (change < 0) {
    return change = `${change} kg`
  } else {
    return change = `-`
  }
}